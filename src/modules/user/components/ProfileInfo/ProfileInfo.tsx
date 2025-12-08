import React, { useState, useEffect } from 'react';
import './ProfileInfo.css';
import FormChangePassword from '../Form/FormChangePassword/FormChangePassword';
import axios from 'axios';
import { logUserAction } from "../../../../hooks/logUserAction";
import { showNotification } from "../../../../utils/notification";

interface UserData {
    customer_id: string;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    birthday: string | null;
    gender: string;
    avatar: string;
}

interface OrderStats {
    pending: number;
    waiting: number;
    shipping: number;
    completed: number;
    cancelled: number;
}

const ProfileInfo: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [changePasswordStatus, setChangePasswordStatus] = useState(false);

    const [userData, setUserData] = useState<UserData>({
        customer_id: '',
        fullname: '',
        email: '',
        phone_number: '',
        address: '',
        birthday: '',
        gender: '',
        avatar: ''
    });

    const [orderStats, setOrderStats] = useState<OrderStats>({
        pending: 0,
        waiting: 0,
        shipping: 0,
        completed: 0,
        cancelled: 0
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const username = localStorage.getItem('username_user');
            if (username) {
                try {
                    const res = await axios.post('http://localhost:5000/api/customer/get', {
                        customer_id: username
                    });
                    if (res.data) {
                        setUserData({
                            ...res.data,
                            birthday: res.data.birthday ? new Date(res.data.birthday).toISOString().split('T')[0] : '',
                            gender: res.data.gender || ''
                        });
                    }

                    const orderRes = await axios.post('http://localhost:5000/api/order/search', {
                        customer_id: username
                    });
                    if (orderRes.data) {
                        const orders = orderRes.data;
                        setOrderStats({
                            pending: orders.filter((o: any) => o.status === 'Đang chờ xác nhận').length,
                            waiting: orders.filter((o: any) => o.status === 'Chờ lấy hàng').length,
                            shipping: orders.filter((o: any) => o.status === 'Đang giao hàng').length,
                            completed: orders.filter((o: any) => o.status === 'Đã giao hàng' || o.status === 'Hoàn tất').length,
                            cancelled: orders.filter((o: any) => o.status === 'Đã hủy').length
                        });
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setUserData(prev => ({ ...prev, customer_id: username }));
                }
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:5000/api/customer/fix', {
                ...userData,
                birthday: userData.birthday === '' ? null : userData.birthday,
                idOld: userData.customer_id
            });
            logUserAction("Sửa thông tin cá nhân");
            setIsEditing(false);
            showNotification("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Error saving user data:", error);
            showNotification("Lỗi khi cập nhật thông tin!");
        }
    };

    const changeAvatar = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setUserData({ ...userData, avatar: imageUrl });
    };

    const handleChangePassword = async (oldPass: string, newPass: string, confirmPass: string) => {
        if (newPass !== confirmPass) {
            showNotification("Mật khẩu xác nhận không khớp!", false);
            return;
        }
        try {
            const username = localStorage.getItem('username_user');
            const res = await axios.post("http://localhost:5000/api/user/change_password", {
                username: username,
                passwordChange: newPass
            });
            if (res.data.status) {
                showNotification("Đổi mật khẩu thành công!");
                setChangePasswordStatus(false);
                logUserAction("Đổi mật khẩu");

                let passStar = ''
                for (let i = 0; i < newPass.length; i++) {
                    passStar += "*"
                }
                localStorage.setItem("password_user", passStar);
            } else {
                showNotification("Đổi mật khẩu thất bại!", true);
            }
        } catch (error) {
            console.error("Error changing password:", error);
            showNotification("Lỗi kết nối server!", false);
        }
    };

    return (
        <div className="profile-info-container">
            <div className="row mb-4">
                <div className="col-12 text-end">
                    <button
                        className="btn btn-lg shadow-sm edit-profile-btn"
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                        <i className={`bi ${isEditing ? 'bi-check-circle' : 'bi-pencil-square'} me-2`}></i>
                        {isEditing ? 'Lưu thông tin' : 'Chỉnh sửa thông tin'}
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="avatar-card">
                        <div className="avatar-header"></div>

                        <div className="avatar-body">
                            <div className="avatar-wrapper">
                                <div className="avatar-circle">
                                    {userData.avatar ? (
                                        <img src={userData.avatar} alt="Avatar" />
                                    ) : (
                                        <i className="bi bi-person-fill"></i>
                                    )}
                                </div>
                                <label htmlFor="avatarUpload" className="avatar-edit-btn">
                                    <i className="bi bi-camera"></i>
                                </label>
                                <input
                                    id="avatarUpload"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files[0]) {
                                            changeAvatar(files[0]);
                                        }
                                    }}
                                />
                            </div>

                            <h3 className="user-name">{userData.fullname || userData.customer_id}</h3>
                            <p className="user-role">Khách hàng</p>
                            <p className="user-status">
                                <span className="status-dot"></span>
                                Đang hoạt động
                            </p>

                            <div className="stats-row mb-4">
                                <div className="stat-box">
                                    <i className="bi bi-hourglass-split text-warning"></i>
                                    <p className="stat-label">Chờ xác nhận</p>
                                    <p className="stat-value">{orderStats.pending}</p>
                                </div>
                                <div className="stat-box">
                                    <i className="bi bi-box-seam text-info"></i>
                                    <p className="stat-label">Chờ lấy hàng</p>
                                    <p className="stat-value">{orderStats.waiting}</p>
                                </div>
                                <div className="stat-box">
                                    <i className="bi bi-truck text-primary"></i>
                                    <p className="stat-label">Đang giao</p>
                                    <p className="stat-value">{orderStats.shipping}</p>
                                </div>
                                <div className="stat-box">
                                    <i className="bi bi-check-circle text-success"></i>
                                    <p className="stat-label">Hoàn thành</p>
                                    <p className="stat-value">{orderStats.completed}</p>
                                </div>
                            </div>

                            <div className="stat-box cancelled-box mb-4">
                                <i className="bi bi-x-circle text-danger"></i>
                                <p className="stat-label">Đã hủy</p>
                                <p className="stat-value">{orderStats.cancelled}</p>
                            </div>

                            <button
                                className="btn btn-danger w-100 change-password-btn"
                                onClick={() => setChangePasswordStatus(true)}
                            >
                                <i className="bi bi-lock me-2"></i>
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="info-card">
                        <div className="info-card-body">
                            <h4 className="info-title">
                                <i className="bi bi-person-lines-fill text-primary me-2"></i>
                                Thông tin chi tiết
                            </h4>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="bi bi-person"></i>
                                        </div>
                                        <div className="info-content">
                                            <small>Họ và tên</small>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={userData.fullname || ''}
                                                    onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
                                                    className="form-control form-control-sm"
                                                />
                                            ) : (
                                                <strong>{userData.fullname || 'Chưa cập nhật'}</strong>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="bi bi-gender-ambiguous"></i>
                                        </div>
                                        <div className="info-content">
                                            <small>Giới tính</small>
                                            {isEditing ? (
                                                <select
                                                    value={userData.gender || ''}
                                                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                                    className="form-select form-select-sm"
                                                >
                                                    <option value="">Chưa cập nhật</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
                                                </select>
                                            ) : (
                                                <strong>{userData.gender || 'Chưa cập nhật'}</strong>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="bi bi-calendar"></i>
                                        </div>
                                        <div className="info-content">
                                            <small>Ngày sinh</small>
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    value={userData.birthday || ''}
                                                    onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                                                    className="form-control form-control-sm"
                                                />
                                            ) : (
                                                <strong>{userData.birthday ? new Date(userData.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</strong>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="bi bi-telephone"></i>
                                        </div>
                                        <div className="info-content">
                                            <small>Số điện thoại</small>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={userData.phone_number || ''}
                                                    onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
                                                    className="form-control form-control-sm"
                                                />
                                            ) : (
                                                <strong>{userData.phone_number || 'Chưa cập nhật'}</strong>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="bi bi-envelope"></i>
                                        </div>
                                        <div className="info-content">
                                            <small>Email</small>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={userData.email || ''}
                                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    className="form-control form-control-sm"
                                                />
                                            ) : (
                                                <strong>{userData.email || 'Chưa cập nhật'}</strong>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="bi bi-geo-alt"></i>
                                        </div>
                                        <div className="info-content">
                                            <small>Địa chỉ</small>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={userData.address || ''}
                                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                                    className="form-control form-control-sm"
                                                />
                                            ) : (
                                                <strong>{userData.address || 'Chưa cập nhật'}</strong>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {changePasswordStatus && (
                <FormChangePassword
                    closeForm={() => setChangePasswordStatus(false)}
                    handleChangePassword={handleChangePassword}
                />
            )}

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
        </div>
    );
};

export default ProfileInfo;

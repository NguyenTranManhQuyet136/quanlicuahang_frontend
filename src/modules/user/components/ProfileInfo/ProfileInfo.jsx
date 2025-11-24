import React, { useState, useEffect } from 'react';
import './ProfileInfo.css';
import FormChangePassword from '../Form/FormChangePassword/FormChangePassword';
import axios from 'axios';

const ProfileInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [changePasswordStatus, setChangePasswordStatus] = useState(false);

    // User data state
    const [userData, setUserData] = useState({
        customer_id: '',
        fullname: '',
        email: '',
        phone_number: '',
        address: '',
        birthday: '',
        gender: 'Nam',
        avatar: ''
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
                            birthday: res.data.birthday ? new Date(res.data.birthday).toISOString().split('T')[0] : ''
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // If not found in customers table, might want to initialize with defaults or fetch from users_detail if needed
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
                idOld: userData.customer_id
            });
            setIsEditing(false);
            alert("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Error saving user data:", error);
            alert("Lỗi khi cập nhật thông tin!");
        }
    };

    const changeAvatar = (file) => {
        const imageUrl = URL.createObjectURL(file);
        setUserData({ ...userData, avatar: imageUrl });
    };

    const handleChangePassword = (password, passwordChange, confirmPasswordChange) => {
        // Mock validation and API call
        if (passwordChange !== confirmPasswordChange) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        console.log("Changing password:", { password, passwordChange });
        alert("Đổi mật khẩu thành công!");
        setChangePasswordStatus(false);
    };

    return (
        <div className="profile-info-container">
            {/* Edit Button */}
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
                {/* Left Column - Avatar Card */}
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
                                    <i className="bi bi-box-seam"></i>
                                    <p className="stat-label">Đơn hàng</p>
                                    <p className="stat-value">0</p>
                                </div>
                                <div className="stat-box">
                                    <i className="bi bi-heart"></i>
                                    <p className="stat-label">Yêu thích</p>
                                    <p className="stat-value">0</p>
                                </div>
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

                {/* Right Column - Info Details */}
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
                                                    value={userData.gender || 'Nam'}
                                                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                                    className="form-select form-select-sm"
                                                >
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

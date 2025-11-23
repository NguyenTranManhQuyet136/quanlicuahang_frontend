import React, { useState } from 'react';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser } from 'react-icons/fi';
import './ProfileInfo.css';

const ProfileInfo = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Sample user data
    const [userData, setUserData] = useState({
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@email.com',
        phone: '0123 456 789',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        birthday: '15/03/1995',
        gender: 'Nam',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=0d6efd&color=fff&size=200'
    });

    return (
        <div className="profile-info-wrapper">
            {/* Avatar Section */}
            <div className="profile-avatar-section">
                <div className="avatar-container">
                    <img src={userData.avatar} alt={userData.name} className="profile-avatar" />
                    <button className="avatar-edit-btn">
                        <FiEdit2 />
                    </button>
                </div>
                <h3 className="profile-name">{userData.name}</h3>
                <p className="profile-member-since">Thành viên từ 2024</p>
            </div>

            {/* Info Section */}
            <div className="profile-info-section">
                <div className="info-header">
                    <h4>Thông Tin Chi Tiết</h4>
                    <button
                        className="edit-btn"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <FiEdit2 /> {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                    </button>
                </div>

                <div className="info-list">
                    <div className="info-item">
                        <div className="info-icon">
                            <FiMail />
                        </div>
                        <div className="info-content">
                            <label>Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="info-input"
                                />
                            ) : (
                                <p>{userData.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <FiPhone />
                        </div>
                        <div className="info-content">
                            <label>Số điện thoại</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    className="info-input"
                                />
                            ) : (
                                <p>{userData.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <FiMapPin />
                        </div>
                        <div className="info-content">
                            <label>Địa chỉ</label>
                            {isEditing ? (
                                <textarea
                                    value={userData.address}
                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                    className="info-input"
                                    rows="2"
                                />
                            ) : (
                                <p>{userData.address}</p>
                            )}
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <FiCalendar />
                        </div>
                        <div className="info-content">
                            <label>Ngày sinh</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={userData.birthday}
                                    onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                                    className="info-input"
                                />
                            ) : (
                                <p>{userData.birthday}</p>
                            )}
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <FiUser />
                        </div>
                        <div className="info-content">
                            <label>Giới tính</label>
                            {isEditing ? (
                                <select
                                    value={userData.gender}
                                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                    className="info-input"
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            ) : (
                                <p>{userData.gender}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="profile-stats">
                <div className="stat-item">
                    <h4>12</h4>
                    <p>Đơn hàng</p>
                </div>
                <div className="stat-item">
                    <h4>5</h4>
                    <p>Yêu thích</p>
                </div>
                <div className="stat-item">
                    <h4>3</h4>
                    <p>Đánh giá</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;

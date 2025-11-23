import React from 'react';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-page">
            <Header />

            {/* Page Title */}
            <div className="profile-header">
                <div className="container">
                    <h1 className="profile-title">Thông Tin Cá Nhân</h1>
                    <p className="profile-subtitle">Quản lý thông tin tài khoản của bạn</p>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container profile-container">
                <div className="row justify-content-center">
                    {/* Profile Info - Centered */}
                    <div className="col-lg-6 col-md-8">
                        <ProfileInfo />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

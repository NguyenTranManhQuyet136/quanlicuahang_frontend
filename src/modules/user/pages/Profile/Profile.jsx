import React from 'react';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import './Profile.css';
import { checkLogin } from "../../../../hooks/checkLogin";

const Profile = () => {
    checkLogin("user");
    return (
        <div className="profile-page">
            <Header />

            <div className="profile-header">
                <div className="container">
                    <h1 className="profile-title">Thông Tin Cá Nhân</h1>
                    <p className="profile-subtitle">Quản lý thông tin tài khoản của bạn</p>
                </div>
            </div>

            <div className="container profile-container">
                <ProfileInfo />
            </div>
        </div>
    );
};

export default Profile;

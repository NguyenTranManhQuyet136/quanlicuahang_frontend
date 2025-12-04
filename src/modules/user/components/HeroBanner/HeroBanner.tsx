import React from 'react';
import './HeroBanner.css';

const HeroBanner: React.FC = () => {
    return (
        <div className="hero-banner">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">
                    Công Nghệ Tiên Tiến<br />
                    <span className="hero-subtitle">Giá Tốt Nhất</span>
                </h1>
                <p className="hero-description">
                    Khám phá bộ sưu tập sản phẩm công nghệ cao cấp tại Aero Tech.<br />
                    Giao hàng nhanh chóng, bảo hành chính hãng.
                </p>
                <div className="hero-buttons">
                    <button className="btn-primary-hero">Mua Ngay</button>
                    <button className="btn-secondary-hero">Xem Thêm</button>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;

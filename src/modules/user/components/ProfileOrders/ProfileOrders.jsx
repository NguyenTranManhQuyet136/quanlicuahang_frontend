import React, { useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import './ProfileOrders.css';

const ProfileOrders = () => {
    const [activeTab, setActiveTab] = useState('all');

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <FiCheckCircle className="status-icon delivered" />;
            case 'shipping':
                return <FiTruck className="status-icon shipping" />;
            case 'processing':
                return <FiClock className="status-icon processing" />;
            case 'cancelled':
                return <FiXCircle className="status-icon cancelled" />;
            default:
                return <FiPackage className="status-icon" />;
        }
    };

    const getStatusClass = (status) => {
        return `order-status ${status}`;
    };

    return (
        <div className="profile-orders-wrapper">
            <div className="orders-header">
                <h3>Đơn Hàng Của Tôi</h3>
                <div className="orders-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
                        onClick={() => setActiveTab('processing')}
                    >
                        Đang xử lý
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shipping')}
                    >
                        Đang giao
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
                        onClick={() => setActiveTab('delivered')}
                    >
                        Đã giao
                    </button>
                </div>
            </div>

            <div className="orders-list">
                {orders
                    .filter(order => activeTab === 'all' || order.status === activeTab)
                    .map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h4>Đơn hàng #{order.id}</h4>
                                    <p className="order-date">{order.date}</p>
                                </div>
                                <div className={getStatusClass(order.status)}>
                                    {getStatusIcon(order.status)}
                                    <span>{order.statusText}</span>
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h5>{item.name}</h5>
                                            <p>Số lượng: {item.quantity}</p>
                                        </div>
                                        <div className="item-price">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span>Tổng cộng:</span>
                                    <strong>{order.total.toLocaleString('vi-VN')}₫</strong>
                                </div>
                                <div className="order-actions">
                                    <button className="btn-view">Xem chi tiết</button>
                                    {order.status === 'delivered' && (
                                        <button className="btn-review">Đánh giá</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProfileOrders;

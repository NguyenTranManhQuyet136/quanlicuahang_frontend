import React, { useState } from 'react';
import { FiPackage as FiPackageBase, FiTruck as FiTruckBase, FiCheckCircle as FiCheckCircleBase, FiXCircle as FiXCircleBase, FiClock as FiClockBase } from 'react-icons/fi';

import './ProfileOrders.css';

const FiPackage = FiPackageBase as any;
const FiTruck = FiTruckBase as any;
const FiCheckCircle = FiCheckCircleBase as any;
const FiXCircle = FiXCircleBase as any;
const FiClock = FiClockBase as any;

interface OrderItem {
    name: string;
    image: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    date: string;
    status: string;
    statusText: string;
    total: number;
    items: OrderItem[];
}

const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        date: '20/10/2023',
        status: 'delivered',
        statusText: 'Đã giao',
        total: 2500000,
        items: [
            { name: 'Tai nghe Bluetooth', image: 'https://via.placeholder.com/150', quantity: 1, price: 2500000 }
        ]
    },
    {
        id: 'ORD-002',
        date: '22/10/2023',
        status: 'shipping',
        statusText: 'Đang giao',
        total: 1200000,
        items: [
            { name: 'Chuột Gaming', image: 'https://via.placeholder.com/150', quantity: 1, price: 1200000 }
        ]
    }
];

const ProfileOrders: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const orders = mockOrders;

    const getStatusIcon = (status: string) => {
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

    const getStatusClass = (status: string) => {
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

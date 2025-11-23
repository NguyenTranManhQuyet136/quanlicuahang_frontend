import React, { useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import './OrderHistory.css';

const OrderHistory = () => {
    const [activeTab, setActiveTab] = useState('all');

    // Sample orders data
    const orders = [
        {
            id: 'DH001',
            date: '20/11/2024',
            status: 'delivered',
            statusText: 'Đã giao',
            total: 45990000,
            items: [
                {
                    name: 'MacBook Pro 14" M3',
                    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
                    quantity: 1,
                    price: 45990000
                }
            ]
        },
        {
            id: 'DH002',
            date: '18/11/2024',
            status: 'shipping',
            statusText: 'Đang giao',
            total: 56980000,
            items: [
                {
                    name: 'iPhone 15 Pro',
                    image: 'https://images.unsplash.com/photo-1696446702183-cbd50c5f8e58?w=400&q=80',
                    quantity: 1,
                    price: 27990000
                },
                {
                    name: 'Samsung Galaxy S24 Ultra',
                    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
                    quantity: 1,
                    price: 28990000
                }
            ]
        },
        {
            id: 'DH003',
            date: '15/11/2024',
            status: 'processing',
            statusText: 'Đang xử lý',
            total: 42990000,
            items: [
                {
                    name: 'ASUS ROG Strix G16',
                    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
                    quantity: 1,
                    price: 42990000
                }
            ]
        },
        {
            id: 'DH004',
            date: '12/11/2024',
            status: 'delivered',
            statusText: 'Đã giao',
            total: 38990000,
            items: [
                {
                    name: 'Lenovo ThinkPad X1',
                    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80',
                    quantity: 1,
                    price: 38990000
                }
            ]
        },
        {
            id: 'DH005',
            date: '10/11/2024',
            status: 'delivered',
            statusText: 'Đã giao',
            total: 18990000,
            items: [
                {
                    name: 'Xiaomi 14 Pro',
                    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
                    quantity: 1,
                    price: 18990000
                }
            ]
        }
    ];

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

    const filteredOrders = orders.filter(order =>
        activeTab === 'all' || order.status === activeTab
    );

    return (
        <div className="order-history-wrapper">
            {/* Filter Tabs */}
            <div className="history-filters">
                <h3 className="filter-title">Lọc đơn hàng</h3>
                <div className="filter-tabs">
                    <button
                        className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        <FiPackage /> Tất cả ({orders.length})
                    </button>
                    <button
                        className={`filter-btn ${activeTab === 'processing' ? 'active' : ''}`}
                        onClick={() => setActiveTab('processing')}
                    >
                        <FiClock /> Đang xử lý
                    </button>
                    <button
                        className={`filter-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shipping')}
                    >
                        <FiTruck /> Đang giao
                    </button>
                    <button
                        className={`filter-btn ${activeTab === 'delivered' ? 'active' : ''}`}
                        onClick={() => setActiveTab('delivered')}
                    >
                        <FiCheckCircle /> Đã giao
                    </button>
                </div>
            </div>

            {/* Orders List */}
            <div className="orders-grid">
                {filteredOrders.length === 0 ? (
                    <div className="empty-orders">
                        <FiPackage size={64} />
                        <h3>Không có đơn hàng nào</h3>
                        <p>Bạn chưa có đơn hàng nào trong danh mục này</p>
                    </div>
                ) : (
                    filteredOrders.map(order => (
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
                                    {order.status === 'delivered' && (
                                        <button className="btn-reorder">Mua lại</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistory;

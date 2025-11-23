import React from 'react';
import { FiPackage, FiCheckCircle } from 'react-icons/fi';
import './OrderHistory.css';

const OrderHistory = () => {
    // Sample orders data - only delivered orders
    const orders = [
        {
            id: 'DH001',
            date: '20/11/2024',
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

    return (
        <div className="order-history-wrapper">
            {/* Orders Grid */}
            <div className="orders-grid">
                {orders.length === 0 ? (
                    <div className="empty-orders">
                        <FiPackage size={64} />
                        <h3>Chưa có đơn hàng nào</h3>
                        <p>Bạn chưa có đơn hàng nào</p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h4>Đơn hàng #{order.id}</h4>
                                    <p className="order-date">{order.date}</p>
                                </div>
                                <div className="order-status delivered">
                                    <FiCheckCircle className="status-icon" />
                                    <span>Đã giao</span>
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
                                    <button className="btn-review">Đánh giá</button>
                                    <button className="btn-reorder">Mua lại</button>
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

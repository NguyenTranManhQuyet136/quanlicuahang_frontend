import React, { useState, useEffect } from 'react';
import { FiPackage, FiCheckCircle } from 'react-icons/fi';
import './OrderHistory.css';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const username = localStorage.getItem('username_user');
            if (!username) return;

            try {
                // 1. Fetch all orders for user
                const res = await axios.post('http://localhost:5000/api/order/search', {
                    customer_id: username
                });

                const orderList = res.data;
                const fullOrders = [];

                // 2. Fetch details for each order
                for (const order of orderList) {
                    const detailRes = await axios.post('http://localhost:5000/api/order/detail', {
                        id: order.order_id
                    });

                    // detailRes.data contains rows joining order, customer, order_detail, product
                    // We need to group items
                    const items = detailRes.data.map(row => ({
                        name: row.name,
                        image: row.image,
                        quantity: row.unit_quantity,
                        price: row.unit_price
                    }));

                    fullOrders.push({
                        id: order.order_id,
                        date: new Date(order.order_date).toLocaleDateString('vi-VN'),
                        total: order.total_price,
                        items: items
                    });
                }

                // Sort by newest first
                fullOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(fullOrders);

            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

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
                                {/* <div className="order-status delivered">
                                    <FiCheckCircle className="status-icon" />
                                    <span>Đã giao</span>
                                </div> */}
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
                                {/* <div className="order-actions">
                                    <button className="btn-view">Xem chi tiết</button>
                                    <button className="btn-review">Đánh giá</button>
                                    <button className="btn-reorder">Mua lại</button>
                                </div> */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistory;

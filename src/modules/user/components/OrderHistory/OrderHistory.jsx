import React, { useState, useEffect } from 'react';
import { FiPackage, FiCheckCircle, FiClock, FiTruck, FiLoader } from 'react-icons/fi';
import './OrderHistory.css';
import axios from 'axios';
import { logUserAction } from "../../../../hooks/logUserAction";
import { showNotification } from "../../../../utils/notification";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const username = localStorage.getItem('username_user');
            if (!username) return;

            try {
                const res = await axios.post('http://localhost:5000/api/order/search', {
                    customer_id: username
                });

                const orderList = res.data;
                const fullOrders = [];

                for (const order of orderList) {
                    const detailRes = await axios.post('http://localhost:5000/api/order/detail', {
                        id: order.order_id
                    });

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
                        status: order.status,
                        items: items
                    });
                }

                fullOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(fullOrders);

            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
            try {
                await axios.post('http://localhost:5000/api/order/update_status', {
                    order_id: orderId,
                    status: 'Đã hủy'
                });
                logUserAction("Hủy đơn hàng " + orderId);
                showNotification("Hủy đơn hàng thành công!");

                // Refresh orders
                setOrders(prevOrders => prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: 'Đã hủy' } : order
                ));
            } catch (error) {
                console.error("Error cancelling order:", error);
                showNotification("Lỗi khi hủy đơn hàng");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Hoàn tất":
            case "Đã giao hàng":
                return { backgroundColor: "#d1e7dd", color: "#0f5132", border: "1px solid #badbcc" };
            case "Đang giao hàng":
                return { backgroundColor: "#cfe2ff", color: "#084298", border: "1px solid #b6d4fe" };
            case "Chờ lấy hàng":
                return { backgroundColor: "#fff3cd", color: "#664d03", border: "1px solid #ffecb5" };
            case "Đã hủy":
                return { backgroundColor: "#f8d7da", color: "#842029", border: "1px solid #f5c2c7" };
            case "Đang chờ xác nhận":
            default:
                return { backgroundColor: "#e2e3e5", color: "#41464b", border: "1px solid #d3d6d8" };
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Hoàn tất":
            case "Đã giao hàng":
                return <FiCheckCircle className="status-icon" />;
            case "Đang giao hàng":
                return <FiTruck className="status-icon" />;
            case "Chờ lấy hàng":
                return <FiLoader className="status-icon" />;
            case "Đã hủy":
                return <FiCheckCircle className="status-icon" style={{ transform: "rotate(45deg)" }} />;
            case "Đang chờ xác nhận":
            default:
                return <FiClock className="status-icon" />;
        }
    };

    return (
        <div className="order-history-wrapper">
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
                                <div className="order-status" style={{
                                    ...getStatusStyle(order.status || "Đang chờ xác nhận"),
                                    padding: "4px 12px",
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                    fontSize: "0.85rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                }}>
                                    {getStatusIcon(order.status || "Đang chờ xác nhận")}
                                    <span>{order.status || "Đang chờ xác nhận"}</span>
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
                                    {(order.status === "Đang chờ xác nhận" || order.status === "Chờ lấy hàng") && (
                                        <button
                                            className="btn-cancel"
                                            onClick={() => handleCancelOrder(order.id)}
                                            style={{
                                                padding: "8px 16px",
                                                backgroundColor: "#dc3545",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontWeight: "500"
                                            }}
                                        >
                                            Hủy đơn hàng
                                        </button>
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

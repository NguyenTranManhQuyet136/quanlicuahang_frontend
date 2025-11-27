import React from 'react';
import Header from '../../components/Header/Header';
import OrderHistory from '../../components/OrderHistory/OrderHistory';
import './History.css';
import { checkLogin } from "../../../../hooks/checkLogin";

const History = () => {
    checkLogin("user");
    return (
        <div className="history-page">
            <Header />

            {/* Page Title */}
            <div className="history-header">
                <div className="container">
                    <h1 className="history-title">Lịch Sử Mua Hàng</h1>
                    <p className="history-subtitle">Theo dõi và quản lý đơn hàng của bạn</p>
                </div>
            </div>

            {/* History Content */}
            <div className="container history-container">
                <OrderHistory />
            </div>
        </div>
    );
};

export default History;

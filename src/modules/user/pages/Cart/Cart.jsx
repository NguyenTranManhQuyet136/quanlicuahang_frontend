import React from 'react';
import Header from '../../components/Header/Header';
import CartItems from '../../components/CartItems/CartItems';
import CartSummary from '../../components/CartSummary/CartSummary';
import './Cart.css';

const Cart = () => {
    return (
        <div className="cart-page">
            <Header />

            {/* Page Title */}
            <div className="cart-header">
                <div className="container">
                    <h1 className="cart-title">Giỏ Hàng Của Bạn</h1>
                    <p className="cart-subtitle">Quản lý sản phẩm và hoàn tất đơn hàng</p>
                </div>
            </div>

            {/* Cart Content */}
            <div className="container cart-container">
                <div className="row g-4">
                    {/* Cart Items - Left Side */}
                    <div className="col-lg-8">
                        <CartItems />
                    </div>

                    {/* Cart Summary - Right Side */}
                    <div className="col-lg-4">
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

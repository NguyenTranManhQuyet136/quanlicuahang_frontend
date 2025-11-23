import React from 'react';
import { FiTag, FiTruck } from 'react-icons/fi';
import './CartSummary.css';

const CartSummary = () => {
    // Sample data - in real app, this would come from cart state
    const subtotal = 102970000;
    const shipping = 0;
    const discount = 5000000;
    const total = subtotal + shipping - discount;

    return (
        <div className="cart-summary-wrapper">
            <h3 className="summary-title">Tổng Đơn Hàng</h3>

            <div className="summary-details">
                <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span className="amount">{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>

                <div className="summary-row">
                    <span>
                        <FiTruck className="icon" /> Phí vận chuyển:
                    </span>
                    <span className="amount free">Miễn phí</span>
                </div>

                <div className="summary-row discount">
                    <span>
                        <FiTag className="icon" /> Giảm giá:
                    </span>
                    <span className="amount">-{discount.toLocaleString('vi-VN')}₫</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span className="amount">{total.toLocaleString('vi-VN')}₫</span>
                </div>
            </div>

            {/* Promo Code */}
            <div className="promo-section">
                <input
                    type="text"
                    className="promo-input"
                    placeholder="Nhập mã giảm giá"
                />
                <button className="promo-btn">Áp dụng</button>
            </div>

            {/* Checkout Button */}
            <button className="checkout-btn">
                Thanh Toán
            </button>

            {/* Additional Info */}
            <div className="additional-info">
                <p>✓ Miễn phí vận chuyển cho đơn hàng trên 500.000₫</p>
                <p>✓ Đổi trả trong vòng 7 ngày</p>
                <p>✓ Bảo hành chính hãng</p>
            </div>
        </div>
    );
};

export default CartSummary;

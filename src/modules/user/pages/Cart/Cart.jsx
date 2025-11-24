import React, { useState, useEffect } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiTruck } from 'react-icons/fi';
import Header from '../../components/Header/Header';
import './Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    // Cart State
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    // Helper to get cart from localStorage
    const getCart = () => {
        try {
            const cart = localStorage.getItem('shopping_cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error reading cart:', error);
            return [];
        }
    };

    // Helper to save cart to localStorage
    const saveCart = (items) => {
        try {
            localStorage.setItem('shopping_cart', JSON.stringify(items));
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    // Load cart and calculate total
    useEffect(() => {
        const updateCartState = () => {
            const cart = getCart();
            setCartItems(cart);
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setSubtotal(total);
        };

        updateCartState();

        // Listen for cart updates
        window.addEventListener('cartUpdated', updateCartState);
        window.addEventListener('storage', updateCartState);

        return () => {
            window.removeEventListener('cartUpdated', updateCartState);
            window.removeEventListener('storage', updateCartState);
        };
    }, []);

    // Cart Logic
    const updateQuantity = (productId, delta) => {
        const cart = getCart();
        const updatedCart = cart.map(item =>
            item.product_id === productId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        saveCart(updatedCart);
    };

    const removeItem = (productId) => {
        const cart = getCart();
        const updatedCart = cart.filter(item => item.product_id !== productId);
        saveCart(updatedCart);
    };

    // Summary Logic
    const shipping = 0;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        const username = localStorage.getItem('username_user');
        if (!username) {
            alert("Vui lòng đăng nhập để thanh toán!");
            navigate('/Login');
            return;
        }

        if (cartItems.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }

        try {
            // Validate user info
            const userRes = await axios.post('http://localhost:5000/api/customer/get', {
                customer_id: username
            });

            const userData = userRes.data;
            // Check if any required field is missing
            if (!userData || !userData.fullname || !userData.email || !userData.phone_number || !userData.address || !userData.birthday || !userData.gender) {
                alert("Vui lòng cập nhật đầy đủ thông tin cá nhân (Họ tên, Email, SĐT, Địa chỉ, Ngày sinh, Giới tính) trước khi thanh toán!");
                navigate('/Profile');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/checkout', {
                customer_id: username,
                total_price: total,
                cart_items: cartItems,
                note: '' // Optional: Add note field input later if needed
            });

            if (response.data.status) {
                alert("Đặt hàng thành công! Mã đơn hàng: " + response.data.order_id);
                localStorage.removeItem('shopping_cart');
                window.dispatchEvent(new Event('cartUpdated'));
                navigate('/History');
            } else {
                alert("Đặt hàng thất bại: " + response.data.message);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Lỗi khi thanh toán. Vui lòng thử lại sau.");
        }
    };

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
                        <div className="cart-items-wrapper">
                            <div className="cart-items-header">
                                <h3 className="items-count">Sản phẩm ({cartItems.length})</h3>
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Giỏ hàng của bạn đang trống</p>
                                    <button className="btn btn-primary" onClick={() => navigate('/Store')}>Tiếp tục mua sắm</button>
                                </div>
                            ) : (
                                <div className="cart-items-list">
                                    {cartItems.map(item => (
                                        <div key={item.product_id} className="cart-item">
                                            <div className="item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>

                                            <div className="item-details">
                                                <h4 className="item-name">{item.name}</h4>
                                                <p className="item-stock">
                                                    {item.inStock ? (
                                                        <span className="in-stock">✓ Còn hàng</span>
                                                    ) : (
                                                        <span className="out-of-stock">Hết hàng</span>
                                                    )}
                                                </p>
                                                <p className="item-price">{item.price.toLocaleString('vi-VN')}₫</p>
                                            </div>

                                            <div className="item-actions">
                                                <div className="quantity-control">
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.product_id, -1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FiMinus />
                                                    </button>
                                                    <span className="quantity">{item.quantity}</span>
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.product_id, 1)}
                                                    >
                                                        <FiPlus />
                                                    </button>
                                                </div>

                                                <p className="item-total">
                                                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                                </p>

                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeItem(item.product_id)}
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cart Summary - Right Side */}
                    <div className="col-lg-4">
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

                                <div className="summary-divider"></div>

                                <div className="summary-row total">
                                    <span>Tổng cộng:</span>
                                    <span className="amount">{total.toLocaleString('vi-VN')}₫</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button className="checkout-btn" onClick={handleCheckout}>
                                Thanh Toán
                            </button>

                            {/* Additional Info */}
                            <div className="additional-info">
                                <p>✓ Miễn phí vận chuyển cho đơn hàng trên 500.000₫</p>
                                <p>✓ Đổi trả trong vòng 7 ngày</p>
                                <p>✓ Bảo hành chính hãng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

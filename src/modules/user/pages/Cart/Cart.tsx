import React, { useState, useEffect } from 'react';
import { FiTrash2 as FiTrash2Base, FiPlus as FiPlusBase, FiMinus as FiMinusBase, FiTruck as FiTruckBase } from 'react-icons/fi';

import Header from '../../components/Header/Header';
import './Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from "../../../../hooks/checkLogin";
import { logUserAction } from "../../../../hooks/logUserAction";
import { showNotification } from "../../../../utils/notification";

const FiTrash2 = FiTrash2Base as any;
const FiPlus = FiPlusBase as any;
const FiMinus = FiMinusBase as any;
const FiTruck = FiTruckBase as any;

interface CartItem {
    product_id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    inStock: boolean;
}

const Cart: React.FC = () => {
    checkLogin("user");
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);

    const getCart = () => {
        try {
            const cart = localStorage.getItem('shopping_cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error reading cart:', error);
            return [];
        }
    };

    const saveCart = (items: CartItem[]) => {
        try {
            localStorage.setItem('shopping_cart', JSON.stringify(items));
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    useEffect(() => {
        const updateCartState = () => {
            const cart = getCart();
            setCartItems(cart);
            const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
            setSubtotal(total);
        };

        updateCartState();

        window.addEventListener('cartUpdated', updateCartState);
        window.addEventListener('storage', updateCartState);

        return () => {
            window.removeEventListener('cartUpdated', updateCartState);
            window.removeEventListener('storage', updateCartState);
        };
    }, []);

    const updateQuantity = (productId: string, delta: number) => {
        const cart = getCart();
        const updatedCart = cart.map((item: CartItem) =>
            item.product_id === productId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        saveCart(updatedCart);
    };

    const removeItem = (productId: string) => {
        const cart = getCart();
        const updatedCart = cart.filter((item: CartItem) => item.product_id !== productId);
        saveCart(updatedCart);
    };

    const shipping = 0;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        const username = localStorage.getItem('username_user');
        if (!username) {
            showNotification("Vui lòng đăng nhập để thanh toán!", true);
            navigate('/Login');
            return;
        }

        if (cartItems.length === 0) {
            showNotification("Giỏ hàng trống!");
            return;
        }

        try {
            const userRes = await axios.post('http://localhost:5000/api/customer/get', {
                customer_id: username
            });

            const userData = userRes.data;
            if (!userData || !userData.fullname || !userData.email || !userData.phone_number || !userData.address || !userData.birthday || !userData.gender) {
                showNotification("Vui lòng cập nhật đầy đủ thông tin cá nhân (Họ tên, Email, SĐT, Địa chỉ, Ngày sinh, Giới tính) trước khi thanh toán!",false);
                navigate('/Profile');
                return;
            }

            const idRes = await axios.get('http://localhost:5000/api/order/generate-id');
            const orderId = idRes.data.id;

            const response = await axios.post('http://localhost:5000/api/checkout', {
                customer_id: username,
                total_price: total,
                cart_items: cartItems,
                note: '',
                order_id: orderId
            });

            if (response.data.status) {
                logUserAction("Đặt hàng thành công");
                showNotification("Đặt hàng thành công! Mã đơn hàng: " + response.data.order_id, true);
                localStorage.removeItem('shopping_cart');
                window.dispatchEvent(new Event('cartUpdated'));
                navigate('/History');
            } else {
                showNotification("Đặt hàng thất bại: " + response.data.message, true);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            window.dispatchEvent(new CustomEvent('paymentError', { detail: { message: "Lỗi khi thanh toán. Vui lòng thử lại sau." } }));
        }
    };

    return (
        <div className="cart-page">
            <Header />

            <div className="cart-header">
                <div className="container">
                    <h1 className="cart-title">Giỏ Hàng Của Bạn</h1>
                    <p className="cart-subtitle">Quản lý sản phẩm và hoàn tất đơn hàng</p>
                </div>
            </div>

            <div className="container cart-container">
                <div className="row g-4">
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
                                    {cartItems.map((item: CartItem) => (
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

                            <button className="checkout-btn" onClick={handleCheckout} disabled={cartItems.length === 0}>
                                Thanh Toán
                            </button>

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

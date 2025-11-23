import React, { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import './CartItems.css';

const CartItems = () => {
    // Sample cart data
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'iPhone 15 Pro',
            image: 'https://images.unsplash.com/photo-1696446702183-cbd50c5f8e58?w=400&q=80',
            price: 27990000,
            quantity: 1,
            inStock: true
        },
        {
            id: 2,
            name: 'MacBook Pro 14" M3',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
            price: 45990000,
            quantity: 1,
            inStock: true
        },
        {
            id: 3,
            name: 'Samsung Galaxy S24 Ultra',
            image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
            price: 28990000,
            quantity: 2,
            inStock: true
        }
    ]);

    const updateQuantity = (id, delta) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    return (
        <div className="cart-items-wrapper">
            <div className="cart-items-header">
                <h3 className="items-count">Sản phẩm ({cartItems.length})</h3>
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Giỏ hàng của bạn đang trống</p>
                    <button className="btn btn-primary">Tiếp tục mua sắm</button>
                </div>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
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
                                        onClick={() => updateQuantity(item.id, -1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>

                                <p className="item-total">
                                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                </p>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartItems;

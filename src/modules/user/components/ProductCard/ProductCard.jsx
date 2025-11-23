import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { name, image, price, originalPrice, rating, reviews, discount, isHot } = product;

    return (
        <div className="product-card">
            {/* Badge */}
            {discount && (
                <div className="product-badge discount-badge">
                    Giảm {discount}%
                </div>
            )}
            {isHot && (
                <div className="product-badge hot-badge">
                    Hot 🔥
                </div>
            )}

            {/* Favorite Icon */}
            <button className="favorite-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>

            {/* Product Image */}
            <div className="product-image">
                <img src={image} alt={name} />
            </div>

            {/* Product Info */}
            <div className="product-info">
                <h3 className="product-name">{name}</h3>

                {/* Rating */}
                <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className={index < rating ? 'star filled' : 'star'}>
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="reviews">({reviews})</span>
                </div>

                {/* Price */}
                <div className="product-price">
                    <span className="current-price">{price.toLocaleString('vi-VN')}₫</span>
                    {originalPrice && (
                        <span className="original-price">{originalPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button className="add-to-cart-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Thêm Vào Giỏ
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

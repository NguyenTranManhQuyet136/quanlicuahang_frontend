import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, showAddToCart = true }) => {
    const { name, image, price, price_sell, originalPrice, discount, isHot } = product;

    const handleAddToCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('shopping_cart')) || [];

            const existingItemIndex = cart.findIndex(item => item.product_id === (product.product_id || product.id));

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                    product_id: product.product_id || product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price_sell || product.price,
                    quantity: 1,
                    inStock: true
                });
            }

            localStorage.setItem('shopping_cart', JSON.stringify(cart));

            window.dispatchEvent(new CustomEvent('addToCart', { detail: { name: name, type: product.type } }));
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    };

    return (
        <div className="product-card">

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




            <div className="product-image">
                <img src={image} alt={name} />
            </div>

            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-description">{product.description}</p>



                <div className="product-price">
                    <span className="current-price">{Number(price_sell || price).toLocaleString('vi-VN')}₫</span>
                    {originalPrice && (
                        <span className="original-price">{originalPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
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

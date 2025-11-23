import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = () => {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'iPhone 15 Pro',
            image: 'https://images.unsplash.com/photo-1696446702183-cbd50c5f8e58?w=400&q=80',
            price: 27990000,
            originalPrice: 32990000,
            rating: 5,
            reviews: 128,
            discount: 15,
            isHot: false
        },
        {
            id: 2,
            name: 'Samsung Galaxy S24 Ultra',
            image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
            price: 28990000,
            originalPrice: 33990000,
            rating: 5,
            reviews: 95,
            discount: 15,
            isHot: true
        },
        {
            id: 3,
            name: 'Xiaomi 14 Pro',
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
            price: 18990000,
            originalPrice: null,
            rating: 4,
            reviews: 67,
            discount: null,
            isHot: false
        },
        {
            id: 4,
            name: 'OPPO Find X7 Pro',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
            price: 22990000,
            originalPrice: 25990000,
            rating: 4,
            reviews: 43,
            discount: 12,
            isHot: false
        },
        {
            id: 5,
            name: 'MacBook Pro 14" M3',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
            price: 45990000,
            originalPrice: null,
            rating: 5,
            reviews: 156,
            discount: null,
            isHot: true
        },
        {
            id: 6,
            name: 'Dell XPS 15',
            image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80',
            price: 35990000,
            originalPrice: 39990000,
            rating: 5,
            reviews: 89,
            discount: 10,
            isHot: true
        },
        {
            id: 7,
            name: 'ASUS ROG Strix G16',
            image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
            price: 42990000,
            originalPrice: null,
            rating: 5,
            reviews: 112,
            discount: null,
            isHot: false
        },
        {
            id: 8,
            name: 'Lenovo ThinkPad X1',
            image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80',
            price: 38990000,
            originalPrice: 42990000,
            rating: 4,
            reviews: 74,
            discount: 9,
            isHot: false
        }
    ];

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
                <p className="section-subtitle">Khám phá các sản phẩm công nghệ hàng đầu với giá tốt nhất</p>
            </div>

            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;

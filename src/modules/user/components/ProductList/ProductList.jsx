import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [dataProduct, setDataProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/product");
            setDataProduct(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
                <p className="section-subtitle">Khám phá các sản phẩm công nghệ hàng đầu với giá tốt nhất</p>
            </div>

            <div className="product-grid">
                {dataProduct.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;

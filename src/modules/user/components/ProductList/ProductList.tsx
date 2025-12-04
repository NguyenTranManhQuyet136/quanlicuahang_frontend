import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

import { Product } from '../ProductCard/ProductCard';

interface ProductListProps {
    selectedCategory: string;
    searchTerm: string;
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory, searchTerm, products }) => {

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isVisible = product.status == "Hiển thị";
        return matchesCategory && matchesSearch && isVisible;
    });

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
                <p className="section-subtitle">Khám phá các sản phẩm công nghệ hàng đầu với giá tốt nhất</p>
            </div>

            <div className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;

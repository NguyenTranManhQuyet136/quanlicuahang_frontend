import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from "../../components/Header/Header";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ProductList from "../../components/ProductList/ProductList";
import './Store.css';
import { checkLogin } from "../../../../hooks/checkLogin";

const Store = () => {
    checkLogin("user");
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/product");
            setProducts(res.data);
        };
        fetchData();
    }, []);

    // Extract unique categories from products
    const categories = ['all', ...new Set(products.map(p => p.type))];

    return (
        <div className="store-page">
            <Header onSearch={setSearchTerm} />
            <HeroBanner />
            <CategoryNav
                activeCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categories={categories}
            />
            <ProductList
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
                products={products}
            />
        </div>
    );
}

export default Store;
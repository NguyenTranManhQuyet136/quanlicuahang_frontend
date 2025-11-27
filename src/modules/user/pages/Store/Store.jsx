import React, { useState } from 'react';

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

    return (
        <div className="store-page">
            <Header onSearch={setSearchTerm} />
            <HeroBanner />
            <CategoryNav
                activeCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <ProductList selectedCategory={selectedCategory} searchTerm={searchTerm} />
        </div>
    );
}

export default Store;
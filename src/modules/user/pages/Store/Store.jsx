import React, { useState } from 'react';
import Header from "../../components/Header/Header";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ProductList from "../../components/ProductList/ProductList";
import './Store.css';

const Store = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="store-page">
            <Header />
            <HeroBanner />
            <CategoryNav
                activeCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <ProductList selectedCategory={selectedCategory} />
        </div>
    );
}

export default Store;
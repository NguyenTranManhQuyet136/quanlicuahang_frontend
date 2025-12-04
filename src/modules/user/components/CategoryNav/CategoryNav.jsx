import React from 'react';
import './CategoryNav.css';

const CategoryNav = ({ activeCategory, onSelectCategory, categories }) => {
  return (
    <div className="category-nav-wrapper">
      <div className="container">
        <div className="d-flex gap-3 overflow-auto hide-scrollbar pb-1">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`btn rounded-pill d-flex align-items-center gap-2 px-4 py-2 fw-medium ${activeCategory === cat ? 'btn-purple-custom' : 'btn-light-custom'}`}
              onClick={() => onSelectCategory(cat)}
            >
              <span style={{ whiteSpace: 'nowrap' }}>
                {cat === 'all' ? 'Tất Cả' : cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
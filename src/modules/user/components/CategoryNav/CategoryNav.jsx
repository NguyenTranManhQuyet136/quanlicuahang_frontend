import React from 'react';
import { MdDashboard, MdPhoneIphone, MdLaptop, MdTabletMac, MdWatch, MdHeadset } from 'react-icons/md';
import './CategoryNav.css';

const categories = [
  { id: 1, name: "Tất Cả", icon: <MdDashboard /> },
  { id: 2, name: "Điện Thoại", icon: <MdPhoneIphone /> },
  { id: 3, name: "Laptop", icon: <MdLaptop /> },
  { id: 4, name: "Máy Tính Bảng", icon: <MdTabletMac /> },
  { id: 5, name: "Smartwatch", icon: <MdWatch /> },
  { id: 6, name: "Phụ Kiện", icon: <MdHeadset /> },
];

const CategoryNav = () => {
  return (
    <div className="category-nav-wrapper">
      <div className="container">
        <div className="d-flex gap-3 overflow-auto hide-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`btn rounded-pill d-flex align-items-center gap-2 px-4 py-2 fw-medium ${cat.active ? 'btn-purple-custom' : 'btn-light-custom'}`}
            >
              <span className="fs-5 d-flex">{cat.icon}</span>
              <span style={{ whiteSpace: 'nowrap' }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
import React from 'react';
import { MdDashboard, MdPhoneIphone, MdLaptop, MdMonitor, MdHeadset, MdKeyboard, MdMouse, MdSpeaker } from 'react-icons/md';
import './CategoryNav.css';

const categories = [
  { id: 1, name: "Tất Cả", type: "all", icon: <MdDashboard /> },
  { id: 2, name: "Laptop", type: "laptop", icon: <MdLaptop /> },
  { id: 3, name: "Điện Thoại", type: "Điện thoại", icon: <MdPhoneIphone /> },
  { id: 4, name: "Màn hình", type: "Màn hình", icon: <MdMonitor /> },
  { id: 5, name: "Tai nghe", type: "Tai nghe", icon: <MdHeadset /> },
  { id: 6, name: "Bàn phím", type: "Bàn phím", icon: <MdKeyboard /> },
  { id: 7, name: "Chuột", type: "Chuột", icon: <MdMouse /> },
  { id: 8, name: "Loa", type: "Loa", icon: <MdSpeaker /> },
];

const CategoryNav = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="category-nav-wrapper">
      <div className="container">
        <div className="d-flex gap-3 overflow-auto hide-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`btn rounded-pill d-flex align-items-center gap-2 px-4 py-2 fw-medium ${activeCategory === cat.type ? 'btn-purple-custom' : 'btn-light-custom'}`}
              onClick={() => onSelectCategory(cat.type)}
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
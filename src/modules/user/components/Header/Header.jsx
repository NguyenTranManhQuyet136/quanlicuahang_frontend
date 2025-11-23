import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiFileText } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  return (
    <header className="header-wrapper bg-white py-3 sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2 cursor-pointer">
          <div className="logo-box bg-primary rounded-3 p-2 d-flex align-items-center justify-content-center">
            <span className="fw-bold text-white">AT</span>
          </div>
          <div className="d-flex flex-column">
            <h5 className="m-0 fw-bold text-primary">Aero Tech</h5>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Tech Store</small>
          </div>
        </div>

        {/* Search Bar - Bootstrap Input Group */}
        <div className="search-wrapper d-none d-md-block flex-grow-1 mx-5">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 rounded-start-pill ps-3">
              <FiSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0 rounded-end-pill py-2"
              placeholder="Tìm kiếm sản phẩm..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-light text-dark border rounded-circle icon-btn"><FiFileText /></button>
          <button className="btn btn-outline-light text-dark border rounded-circle icon-btn"><FiHeart /></button>

          <button className="btn btn-primary rounded-circle icon-btn position-relative">
            <FiShoppingCart />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>

          <button className="btn btn-outline-light text-dark border rounded-circle icon-btn"><FiUser /></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
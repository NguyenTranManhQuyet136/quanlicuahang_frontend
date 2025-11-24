import { FiSearch, FiShoppingCart, FiUser, FiFileText, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    navigate('/Cart');
  };

  const handleLogoClick = () => {
    navigate('/Store');
  };

  const handleProfileClick = () => {
    navigate('/Profile');
  };

  const handleHistoryClick = () => {
    navigate('/History');
  };

  const handleLogout = () => {
    localStorage.removeItem('username_user');
    localStorage.removeItem('password_user');
    localStorage.removeItem('shopping_cart');
    navigate('/Login');
  };

  // Check if current path matches
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header-wrapper bg-white py-3 sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
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
          <button
            className={`btn btn-outline-light border rounded-circle icon-btn ${isActive('/Store') ? 'active' : 'text-dark'}`}
            onClick={handleLogoClick}
            title="Cửa hàng"
          >
            <FiShoppingBag />
          </button>

          <button
            className={`btn btn-outline-light border rounded-circle icon-btn position-relative ${isActive('/Cart') ? 'active' : 'text-dark'}`}
            onClick={handleCartClick}
            title="Giỏ hàng"
          >
            <FiShoppingCart />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>

          <button
            className={`btn btn-outline-light border rounded-circle icon-btn ${isActive('/History') ? 'active' : 'text-dark'}`}
            onClick={handleHistoryClick}
            title="Lịch sử đơn hàng"
          >
            <FiFileText />
          </button>

          <button
            className={`btn btn-outline-light border rounded-pill user-btn ${isActive('/Profile') ? 'active' : 'text-dark'}`}
            onClick={handleProfileClick}
            title="Tài khoản"
          >
            <FiUser />
            <span className="ms-2 fw-medium">{localStorage.getItem('username_user') || 'Tài khoản'}</span>
          </button>

          <button
            className="btn btn-outline-light border rounded-circle icon-btn logout-btn text-dark"
            onClick={handleLogout}
            title="Đăng xuất"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
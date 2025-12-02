import { FiSearch, FiShoppingCart, FiUser, FiFileText, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const btnClass = "btn btn-outline-light border rounded-circle icon-btn";
  const activeClass = (path) => location.pathname === path ? 'active' : 'text-dark';

  useEffect(() => {
    const handleAddToCart = (event) => {
      setNotificationMsg(`Đã thêm ${event.detail.type || 'sản phẩm'} ${event.detail.name} vào giỏ hàng thành công`);
      setIsError(false);
      setTimeout(() => setNotificationMsg(''), 3000);
    };

    const handlePaymentError = (event) => {
      setNotificationMsg(event.detail.message);
      setIsError(true);
      setTimeout(() => setNotificationMsg(''), 3000);
    };

    window.addEventListener('addToCart', handleAddToCart);
    window.addEventListener('paymentError', handlePaymentError);

    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
      window.removeEventListener('paymentError', handlePaymentError);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username_user');
    localStorage.removeItem('password_user');
    localStorage.removeItem('shopping_cart');
    navigate('/Login');
  };

  return (
    <header className="header-wrapper bg-white py-3 sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => navigate('/Store')}>
          <div className="logo-box bg-primary rounded-3 p-2 d-flex align-items-center justify-content-center">
            <span className="fw-bold text-white">AT</span>
          </div>
          <div className="d-flex flex-column">
            <h5 className="m-0 fw-bold text-primary">Aero Tech</h5>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Tech Store</small>
          </div>
        </div>

        <div className="search-wrapper d-none d-md-block flex-grow-1 mx-5">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 rounded-start-pill ps-3"><FiSearch className="text-muted" /></span>
            <input type="text" className="form-control bg-light border-start-0 rounded-end-pill py-2" placeholder="Tìm kiếm..." onChange={(e) => onSearch && onSearch(e.target.value)} />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className={`${btnClass} ${activeClass('/Store')}`} onClick={() => navigate('/Store')} title="Cửa hàng"><FiShoppingBag /></button>

          <button className={`${btnClass} position-relative ${activeClass('/Cart')}`} onClick={() => navigate('/Cart')} title="Giỏ hàng">
            <FiShoppingCart />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
          </button>

          <button className={`${btnClass} ${activeClass('/History')}`} onClick={() => navigate('/History')} title="Lịch sử"><FiFileText /></button>

          <button className={`btn btn-outline-light border rounded-pill user-btn ${activeClass('/Profile')}`} onClick={() => navigate('/Profile')} title="Tài khoản">
            <FiUser />
            <span className="ms-2 fw-medium">{localStorage.getItem('username_user') || 'Tài khoản'}</span>
          </button>

          <button className={`${btnClass} logout-btn text-dark`} onClick={handleLogout} title="Đăng xuất"><FiLogOut /></button>
        </div>
      </div>

      {notificationMsg && <div className={`notification ${isError ? 'error' : ''}`}>{notificationMsg}</div>}
    </header>
  );
};

export default Header;
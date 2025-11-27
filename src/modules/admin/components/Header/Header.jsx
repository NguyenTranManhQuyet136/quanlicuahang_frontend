import { useState, useRef, useEffect, useContext } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import "./Header.css";

const Header = (props) => {
    const [openStatus, setOpenStatus] = useState(false);
    const [showNoti, setShowNoti] = useState(false);
    const dropdownRef = useRef(null);
    const themeContext = useContext(ThemeContext);

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const updateNotifications = () => {
        const stored = JSON.parse(localStorage.getItem("admin_notifications") || "[]");
        const count = parseInt(localStorage.getItem("admin_unread_count") || "0");
        setNotifications(stored);
        setUnreadCount(count);
    };

    useEffect(() => {
        updateNotifications();

        const handleGlobalClick = (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            let message = "";
            if (target.classList.contains('form-add-btn-submit')) {
                message = "Đã thêm mới thành công";
            } else if (target.classList.contains('form-fix-btn-submit')) {
                message = "Đã cập nhật thành công";
            } else if (target.classList.contains('form-remove-btn-submit')) {
                const modalBody = target.closest('.form-remove-body');
                const nameElement = modalBody ? modalBody.querySelector('.form-remove-highlight') : null;
                const name = nameElement ? nameElement.innerText : "";
                message = `Đã xóa ${name}`;
            }

            if (message) {
                const currentNotifications = JSON.parse(localStorage.getItem("admin_notifications") || "[]");
                currentNotifications.unshift(message);
                localStorage.setItem("admin_notifications", JSON.stringify(currentNotifications));

                const currentUnread = parseInt(localStorage.getItem("admin_unread_count") || "0");
                localStorage.setItem("admin_unread_count", (currentUnread + 1).toString());

                updateNotifications();
            }
        };

        window.addEventListener("click", handleGlobalClick, true);
        return () => window.removeEventListener("click", handleGlobalClick, true);
    }, []);

    const handleBellClick = () => {
        if (!showNoti) {
            // Nếu đang mở (tức là trước đó đóng), thì reset số lượng chưa đọc
            localStorage.setItem("admin_unread_count", "0");
            setUnreadCount(0);
            window.dispatchEvent(new Event("notificationUpdated"));
        }
        setShowNoti(!showNoti);
    };

    const sizeIcon = 24;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenStatus(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="header-wrapper">
            <div className="header-container">
                <div className="header-title">
                    <h4 className="header-name">{props.name}</h4>
                </div>

                <div className="header-actions">
                    <div className="header-notification">
                        <div onClick={handleBellClick}>
                            <FaBell
                                size={sizeIcon}
                                className="header-icon notification-icon"
                            />
                            {/* Chỉ hiện số khi có thông báo chưa đọc */}
                            {unreadCount > 0 && <span className="header-badge">{unreadCount}</span>}
                        </div>
                        {showNoti && (
                            <div className="notification-box">
                                <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Thông báo mới</p>
                                {notifications.length === 0 ? (
                                    <p>Không có thông báo</p>
                                ) : (
                                    notifications.map((note, index) => (
                                        <div key={index} className="notification-item">
                                            <span className="notification-dot"></span>
                                            <span>{note}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="header-user" ref={dropdownRef}>
                        <button
                            className="header-user-btn"
                            onClick={() => setOpenStatus(!openStatus)}
                        >
                            <FaUserCircle
                                size={sizeIcon}
                                className="header-icon user-icon"
                            />
                            <span className="header-username">{localStorage.getItem("username_admin")}</span>
                        </button>

                        {openStatus && (
                            <div className="header-dropdown">
                                <a className="header-dropdown-item" href="/User">
                                    Hồ sơ
                                </a>
                                <a
                                    className="header-dropdown-item logout"
                                    onClick={() => {
                                        localStorage.removeItem("username_admin");
                                        localStorage.removeItem("password_admin");
                                    }}
                                    href="/Login"
                                >
                                    Đăng xuất
                                </a>
                            </div>
                        )}
                    </div>
                </div >
            </div >
        </header >
    );
};

export default Header;

import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import "./Header.css";

const Header = (props) => {
    const [openStatus, setOpenStatus] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

    const sizeIcon = 24;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenStatus(false);
            }
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Khởi tạo 3 thông báo mẫu
    useEffect(() => {
        const initialNotifications = [
            {
                id: 1,
                time: new Date().toLocaleTimeString("vi-VN"),
                content: "Thêm đơn hàng #12345 thành công",
                type: "add"
            },
            {
                id: 2,
                time: new Date(Date.now() - 60000).toLocaleTimeString("vi-VN"),
                content: "Xóa sản phẩm 'Laptop Dell XPS 13' thành công",
                type: "delete"
            },
            {
                id: 3,
                time: new Date(Date.now() - 120000).toLocaleTimeString("vi-VN"),
                content: "Cập nhật thông tin khách hàng 'Nguyễn Văn A'",
                type: "update"
            }
        ];
        setNotifications(initialNotifications);
        setUnreadCount(initialNotifications.length);
    }, []);

    // Lắng nghe sự kiện từ window
    useEffect(() => {
        const handleNotification = (event) => {
            const { type, message } = event.detail;
            const newNotif = {
                id: Date.now(),
                time: new Date().toLocaleTimeString("vi-VN"),
                content: message,
                type: type // 'add', 'delete', 'update'
            };
            
            setNotifications(prev => [newNotif, ...prev]);
            setUnreadCount(prev => prev + 1);
        };

        window.addEventListener("addNotification", handleNotification);
        return () => window.removeEventListener("addNotification", handleNotification);
    }, []);

    const handleNotificationClick = () => {
        setNotifOpen(!notifOpen);
        if (!notifOpen) {
            setUnreadCount(0); // Xóa badge khi mở thông báo
        }
    };

    return (
        <>
            <header className="header-wrapper">
                <div className="header-container">
                    <div className="header-title">
                        <h4 className="header-name">{props.name}</h4>
                    </div>

                    <div className="header-actions">
                        <div className="header-notification" ref={notificationRef}>
                            <button
                                className="header-notification-btn"
                                onClick={handleNotificationClick}
                                aria-expanded={notifOpen}
                                aria-label="Thông báo"
                            >
                                <FaBell
                                    size={sizeIcon}
                                    className="header-icon notification-icon"
                                />
                                {unreadCount > 0 && (
                                    <span className="notification-count">{unreadCount > 99 ? "99+" : unreadCount}</span>
                                )}
                            </button>
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
                                <span className="header-username">{localStorage.getItem("username")}</span>
                            </button>

                            {openStatus && (
                                <div className="header-dropdown">
                                    <a className="header-dropdown-item" href="/User">
                                        Hồ sơ
                                    </a>
                                    <a
                                        className="header-dropdown-item logout"
                                        onClick={() => {
                                            localStorage.removeItem("username");
                                            localStorage.removeItem("password");
                                            localStorage.setItem("theme", "");
                                        }}
                                        href="/Login"
                                    >
                                        Đăng xuất
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {notifOpen && (
                <div className="notification-panel-standalone">
                    <div className="notification-panel-header">
                        <h3>Thông báo</h3>
                        <button 
                            className="notification-close-btn"
                            onClick={() => setNotifOpen(false)}
                        >
                            ×
                        </button>
                    </div>
                    {notifications.length > 0 ? (
                        <div className="notification-list">
                            {notifications.map((notif) => (
                                <div key={notif.id} className={`notification-item notification-${notif.type}`}>
                                    <div className="notification-content">
                                        <p className="notification-message">{notif.content}</p>
                                        <span className="notification-time">{notif.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="notification-empty">
                            <p>Không có thông báo mới</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Header;
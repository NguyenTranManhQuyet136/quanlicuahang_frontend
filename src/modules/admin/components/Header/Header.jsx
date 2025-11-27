import { useState, useRef, useEffect, useContext } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import "./Header.css";

const Header = (props) => {
    const [openStatus, setOpenStatus] = useState(false);
    const [showNoti, setShowNoti] = useState(false);
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);
    const themeContext = useContext(ThemeContext);

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [toast, setToast] = useState(null);

    const updateNotifications = () => {
        const stored = JSON.parse(localStorage.getItem("admin_notifications") || "[]");
        const count = parseInt(localStorage.getItem("admin_unread_count") || "0");
        setNotifications(stored);
        setUnreadCount(count);
    };

    const changedFields = useRef(new Set());

    useEffect(() => {
        // Clear notifications on mount as requested to "refresh"
        localStorage.removeItem("admin_notifications");
        localStorage.removeItem("admin_unread_count");
        updateNotifications();

        const handleChange = (e) => {
            const target = e.target;
            const formBody = target.closest('.form-fix-body');
            if (formBody) {
                const group = target.closest('.form-fix-group');
                const label = group?.querySelector('label')?.innerText || "";
                if (label) {
                    changedFields.current.add(label);
                }
            }
        };

        const handleGlobalClick = (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            let message = "";
            let shortMessage = "";

            if (target.classList.contains('form-add-btn-submit')) {
                const modal = target.closest('.form-add-modal');
                const title = modal?.querySelector('.form-add-header-title h4')?.innerText || "";
                let type = title.replace('Thêm ', '').toLowerCase();
                if (type === 'nhập kho') type = 'phiếu nhập kho';

                const formBody = target.closest('.form-add-body');
                let name = "mới";
                if (formBody) {
                    const groups = formBody.querySelectorAll('.form-add-group');
                    for (let group of groups) {
                        const label = group.querySelector('label')?.innerText?.toLowerCase() || "";
                        if (label.includes('tên') || label.includes('name')) {
                            const input = group.querySelector('input, select');
                            if (input) name = input.value;
                            break;
                        }
                    }
                }
                message = `Đã thêm ${type} ${name} thành công`;
                shortMessage = "Đã thêm thành công";
            } else if (target.classList.contains('form-fix-btn-submit')) {
                const modal = target.closest('.form-fix-modal');
                const title = modal?.querySelector('.form-fix-header-title h4')?.innerText || "";
                let type = title.replace('Sửa ', '').toLowerCase();
                if (type === 'nhập kho') type = 'phiếu nhập kho';

                const formBody = target.closest('.form-fix-body');
                let name = "đã chọn";
                if (formBody) {
                    const groups = formBody.querySelectorAll('.form-fix-group');
                    for (let group of groups) {
                        const label = group.querySelector('label')?.innerText?.toLowerCase() || "";
                        if (label.includes('tên') || label.includes('name')) {
                            const input = group.querySelector('input, select');
                            if (input) name = input.value;
                            break;
                        }
                    }
                }

                let fields = Array.from(changedFields.current).map(f => `phần ${f}`).join(', ');
                if (!fields) fields = "thông tin";
                message = `Đã sửa ${type} ${name} ${fields} thành công`;
                shortMessage = "Đã sửa thành công";
                changedFields.current.clear();
            } else if (target.classList.contains('form-remove-btn-submit')) {
                const modalBody = target.closest('.form-remove-body');
                const nameElement = modalBody ? modalBody.querySelector('.form-remove-highlight') : null;
                const name = nameElement ? nameElement.innerText : "";
                message = `Đã xóa ${name} thành công`;
                shortMessage = "Đã xóa thành công";
            }

            if (message) {
                const time = new Date().toLocaleString('vi-VN');
                message = `${message} vào lúc ${time}`;

                const currentNotifications = JSON.parse(localStorage.getItem("admin_notifications") || "[]");
                currentNotifications.unshift(message);
                localStorage.setItem("admin_notifications", JSON.stringify(currentNotifications));

                const currentUnread = parseInt(localStorage.getItem("admin_unread_count") || "0");
                localStorage.setItem("admin_unread_count", (currentUnread + 1).toString());

                updateNotifications();

                setToast(shortMessage);
                setTimeout(() => setToast(null), 3000);
            }
        };

        window.addEventListener("click", handleGlobalClick, true);
        window.addEventListener("change", handleChange, true);
        return () => {
            window.removeEventListener("click", handleGlobalClick, true);
            window.removeEventListener("change", handleChange, true);
        };
    }, []);

    const handleBellClick = () => {
        if (!showNoti) {
            localStorage.setItem("admin_unread_count", "0");
            setUnreadCount(0);
            window.dispatchEvent(new Event("notificationUpdated"));
        }
        setShowNoti(!showNoti);
    };

    const sizeIcon = 24;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenStatus(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNoti(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationClick = (note) => {
        const cleanNote = note.split(" vào lúc")[0];
        let name = "";

        if (cleanNote.includes("Đã thêm") || cleanNote.includes("Đã sửa")) {
            name = cleanNote;
        }

        localStorage.setItem("highlight_name", name);

        if (note.toLowerCase().includes("sản phẩm")) window.location.href = "/Product";
        else if (note.toLowerCase().includes("khách hàng")) window.location.href = "/Customer";
        else if (note.toLowerCase().includes("đơn hàng")) window.location.href = "/Order";
        else if (note.toLowerCase().includes("kho")) window.location.href = "/Warehouse";
    };

    return (
        <header className="header-wrapper">
            {toast && (
                <div className="header-toast">
                    {toast}
                </div>
            )}
            <div className="header-container">
                <div className="header-title">
                    <h4 className="header-name">{props.name}</h4>
                </div>

                <div className="header-actions">
                    <div className="header-notification" ref={notificationRef}>
                        <div onClick={handleBellClick}>
                            <FaBell
                                size={sizeIcon}
                                className="header-icon notification-icon"
                            />
                            {unreadCount > 0 && <span className="header-badge">{unreadCount}</span>}
                        </div>
                        {showNoti && (
                            <div className="notification-box">
                                <p className="notification-header">Thông báo mới</p>
                                {notifications.length === 0 ? (
                                    <p className="notification-empty">Không có thông báo</p>
                                ) : (
                                    notifications.map((note, index) => (
                                        <div key={index} className="notification-item" onClick={() => handleNotificationClick(note)} style={{ cursor: 'pointer' }}>
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

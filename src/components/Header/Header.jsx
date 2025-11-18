import { useState, useRef, useEffect, useContext } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeProvider";
import "./Header.css";

const Header = (props) => {
    const [openStatus, setOpenStatus] = useState(false);
    const dropdownRef = useRef(null);
    const themeContext = useContext(ThemeContext);

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
                        <FaBell 
                            size={sizeIcon}
                            className="header-icon notification-icon"
                        />
                        <span className="header-badge">3</span>
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
    );
};

export default Header;

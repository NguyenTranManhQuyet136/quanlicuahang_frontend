import { useState, useRef, useEffect, useContext } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeProvider";

const Header = (props) => {
    const [openStatus, setOpenStatus] = useState(false);
    const dropdownRef = useRef(null);
    const themeContext = useContext(ThemeContext);

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

    console.log(themeContext.theme);

    return (
        <nav
            className={`p-3 navbar bg-white px-4 d-flex justify-content-between align-items-center ${themeContext.theme}`}

            style={{boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"}}
        >
            <h4 className="text-primary m-0">{props.name}</h4>

            <button
                style={{ right: "0", marginRight: "220px", backgroundColor: "rgba(var(--bs-primary-rgb)", border: "none", borderRadius: "8px", color: "white", padding: "8px 16px 8px 16px"}}
                className="position-absolute"
                onClick={themeContext.toggleTheme}
            >
                {themeContext.theme == "" ? "☀️ Sáng" : "🌙 Tối"}
            </button>

            <div className="position-absolute" style={{ marginRight: "155px", right: "0"}}>
                <FaBell 
                    size={30}
                    className="text-primary cursor-pointer"
                />
            </div>

            <div className="position-relative cursor-pointer" ref={dropdownRef} onClick={() => setOpenStatus(!openStatus)} >
                <div className="d-flex align-items-center">
                    <FaUserCircle 
                        size={35}
                        className="text-primary cursor-pointer"

                    />
                    <span className="fw-semibold text-capitalize cursor-pointer m-1">quyet...</span>
                </div>  

                

                {openStatus && (
                    <ul
                        className="dropdown-menu show position-absolute end-0 mt-2 shadow"
                        style={{ minWidth: "140px" }}
                    >
                        <li>
                            <a className="dropdown-item" href="/User">
                                Hồ sơ
                            </a>
                        </li>
                        <li>
                            <a
                                className="dropdown-item text-danger"
                                onClick={() => {
                                    localStorage.removeItem("username");
                                    localStorage.removeItem("password");
                                    localStorage.setItem("theme", "");
                                }}
                                href="/Login"
                            >
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Header;

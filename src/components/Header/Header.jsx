import { useState, useRef, useEffect, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeProvider";

const Header = (props) => {
    const [openStatus, setOpenStatus] = useState(false);
    const dropdownRef = useRef(null);
    const themeContext = useContext(ThemeContext)

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

    console.log(themeContext.theme)

    return (
        <nav className={`navbar bg-white shadow-sm px-4 d-flex justify-content-between align-items-center ${themeContext.theme}`}>
            <h4 className="text-primary m-0">{props.name}</h4>

            <button style={{width: "70px", right: "0", marginRight: "75px"}} className="btn btn-primary position-absolute" onClick={themeContext.toggleTheme}>{themeContext.theme == "" ? "sáng" : "tối"}</button>

            <div className="position-relative" ref={dropdownRef}>
                <FaUserCircle
                    size={32}
                    className="text-primary cursor-pointer"
                    onClick={() => setOpenStatus(!openStatus)}
                />

                

                {openStatus && (
                    <ul
                        className="dropdown-menu show position-absolute end-0 mt-2 shadow"
                        style={{ minWidth: "180px" }}
                    >
                        <li>
                            <a className="dropdown-item" href="/User">
                                Quản lí thông tin
                            </a>
                        </li>
                        <li>
                            <a
                                className="dropdown-item text-danger"
                                onClick={() => {
                                    localStorage.removeItem("username")
                                    localStorage.removeItem("password")
                                    localStorage.setItem("theme","")
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

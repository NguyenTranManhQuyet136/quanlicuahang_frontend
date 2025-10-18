import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = (props) => {
    const [openStatus, setOpenStatus] = useState(false);
    const dropdownRef = useRef(null);

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
        <nav className="navbar bg-white shadow-sm px-4 d-flex justify-content-between align-items-center">
            <h4 className="text-primary m-0">{props.name}</h4>

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

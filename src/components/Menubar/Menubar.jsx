import {
    FaHome,
    FaBox,
    FaUsers,
    FaShoppingCart,
    FaWarehouse,
} from "react-icons/fa";
import "./Menubar.css";

const Menubar = (props) => {
    const menu = [
        { icon: <FaHome />, label: "Trang chủ", ref: "/Dashboard" },
        { icon: <FaBox />, label: "Sản phẩm", ref: "/Product" },
        { icon: <FaUsers />, label: "Khách hàng", ref: "/Customer" },
        { icon: <FaShoppingCart />, label: "Đơn hàng", ref: "/Order" },
        { icon: <FaWarehouse />, label: "Nhập kho", ref: "/Warehouse" },
    ];

    return (
        <div className="bg-primary text-white p-3" style={{ minWidth: "250px" }}>
            <h4 className="text-center fw-bold mb-4">
                Quản Lý
                <br />
                Cửa Hàng
            </h4>
            <ul className="nav flex-column">
                {menu.map((item, id) => (
                    <li
                        key={id}
                        className={`product-items nav-item mb-2 ${item.ref == props.focus ? "gray" : ""}`}
                    >
                        <a
                            href={item.ref}
                            className="nav-link text-white d-flex align-items-center gap-2 hover-gray"
                        >
                            {item.icon} <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menubar;

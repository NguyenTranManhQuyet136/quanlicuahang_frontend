import {
    FaHome,
    FaBox,
    FaUsers,
    FaShoppingCart,
    FaWarehouse,
    FaCog,
    FaSignOutAlt,
    FaPlus,
    FaClock,
} from "react-icons/fa";
import "./Menubar.css";
import FormSetting from "../Form/FormSetting/FormSetting";
import { useState } from "react";

const Menubar = (props: any) => {
    const [settingStatus, setSettingStatus] = useState({ status: false })

    const role = localStorage.getItem("role");

    const menu = [
        { icon: (FaHome as any)({}), label: "Trang chủ", ref: "/Dashboard" },
        { icon: (FaBox as any)({}), label: "Sản phẩm", ref: "/Product" },
        { icon: (FaShoppingCart as any)({}), label: "Đơn hàng", ref: "/Order" },
        { icon: (FaUsers as any)({}), label: "Khách hàng", ref: "/Customer" },
        { icon: (FaWarehouse as any)({}), label: "Nhập kho", ref: "/Warehouse" },
    ];

    if (role === "superadmin") {
        menu.push(
            { icon: (FaUsers as any)({}), label: "Quản lý tài khoản", ref: "/AccountManager" },
            { icon: (FaClock as any)({}), label: "Lịch sử hệ thống", ref: "/HistoryManager" }
        );
    }

    const target_color = "linear-gradient(90deg, #5a9bff 0%, #337aff 100%)"

    return (
        <div
            className="bg-primary text-white p-3 menubar"
            style={{ minWidth: "250px", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: "0", overflowY: "auto", zIndex: 1000 }}
        >
            <div>
                <h4 className="text-center fw-bold mb-4">
                    Quản Lý
                    <br />
                    Aero Tech
                </h4>

                { }
                <div className="mb-3">
                    <a
                        className="nav-link text-dark d-flex align-items-center justify-content-center gap-2 create-invoice-btn"
                        style={{
                            background: "#ffffff",
                            borderRadius: "8px",
                            padding: "10px 15px",
                            fontWeight: "500",
                            textDecoration: "none",
                            transition: "0.3s",
                        }}
                        href="/Create-invoice"
                    >
                        {(FaPlus as any)({ size: 18 })} <span>Tạo Hóa Đơn</span>
                    </a>
                </div>
                <hr className="divider-line" style={{ borderColor: "rgba(255, 255, 255, 0.3)", margin: "0 0 15px 0" }} />

                <ul className="nav flex-column">
                    {menu.map((item, id) => (
                        <li
                            key={id}
                            className={`product-items nav-item mb-2`}
                            style={{
                                borderRadius: "8px", background: item.ref == props.focus ? "linear-gradient(90deg, #5a9bff 0%, #337aff 100%)" :
                                    "none"
                            }}
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

            {settingStatus.status && (
                <FormSetting
                    closeForm={() => { setSettingStatus({ status: false }) }}
                />
            )}

            { }
            <ul className="nav flex-column mt-auto gap-2">
                <li className="nav-item">
                    <a
                        className="nav-link text-white d-flex align-items-center justify-content-center gap-2 settings-btn"
                        style={{
                            background: "linear-gradient(90deg, #95a5a6 0%, #7f8c8d 100%)",
                            borderRadius: "8px",
                            padding: "10px 15px",
                            fontWeight: "500",
                            textDecoration: "none",
                            transition: "0.3s",
                        }}
                        onClick={() => setSettingStatus({ status: true })}
                    >
                        {(FaCog as any)({ size: 18 })} <span>Cài đặt</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        href="/Login"
                        className="nav-link text-white d-flex align-items-center justify-content-center gap-2 logout-btn"
                        style={{
                            background: "#dc3545",
                            borderRadius: "8px",
                            padding: "10px 15px",
                            fontWeight: "500",
                            textDecoration: "none",
                            transition: "0.3s",
                        }}
                        onClick={() => {
                            localStorage.removeItem("username");
                            localStorage.removeItem("password");


                        }}


                    >
                        {(FaSignOutAlt as any)({ size: 18 })} <span>Đăng Xuất</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Menubar; 

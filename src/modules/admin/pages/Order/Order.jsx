import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormRemove from "../../components/Form/FormRemove/FormRemove";
import FormAdd from "../../components/Form/FormAdd/FormAdd";
import FormFix from "../../components/Form/FormFix/FormFix";
import FormSearch from "../../components/Form/FormSearch/FormSearch";
import FormDetail from "../../components/Form/FormDetail/FormDetail";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { checkLogin } from "../../../../hooks/checkLogin";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiEye } from "react-icons/fi";

const labelPage = "đơn hàng";

const colInfo = [
    { key: "order_id", label: "ID", type: "text" },
    { key: "customer_id", label: "ID khách hàng", type: "number" },
    { key: "order_date", label: "Ngày đặt hàng", type: "date" },
    { key: "total_price", label: "Tổng giá trị", type: "number" },
    {
        key: "status",
        label: "Trạng thái",
        type: "select",
        options: [
            { value: 1, label: "Hoàn tất" },
            { value: 0, label: "Đang xử lý" },
        ],
    },
];

const colInfoSearch = [
    { key: "order_id", label: "ID", type: "text" },
    { key: "customer_id", label: "ID khách hàng", type: "number" },
];

const Order = () => {
    checkLogin()

    const themeContext = useContext(ThemeContext);
    const [dataOrder, setDataOrder] = useState([]);
    const [removeStatus, setRemoveStatus] = useState({ status: false, order_id: "", customer_id: "" });
    const [fixStatus, setFixStatus] = useState({ statusSwitch: false, dataFix: {} });
    const [addStatus, setAddStatus] = useState({ status: false });
    const [searchStatus, setSearchStatus] = useState({ status: false, });
    const [detailStatus, setDetailStatus] = useState({ status: false });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/order");
            setDataOrder(res.data);
        };
        fetchData();
    }, []);

    async function resetData() {
        const res = await axios.get("http://localhost:5000/api/order");
        setDataOrder(res.data);
    }

    const closeForm = (type) => {
        switch (type) {
            case "remove":
                setRemoveStatus({ status: false });
                break;
            case "fix":
                setFixStatus({ statusSwitch: false });
                break;
            case "add":
                setAddStatus({ status: false });
                break;
            case "search":
                setSearchStatus({ status: false });
                break;
            case "detail":
                setDetailStatus({ status: false });
                break;
        }
    };

    const handleRemove = async (order_id) => {
        await axios.post("http://localhost:5000/api/order/remove", { order_id: order_id });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/order/fix", {
            order_id: dataFix.order_id,
            customer_id: dataFix.customer_id,
            order_date: dataFix.order_date,
            total_price: dataFix.total_price,
            status: dataFix.status,
            idOld: idOld,
        });
        closeForm("fix");
        resetData();
    };

    const handleAdd = async (dataAdd) => {
        await axios.post("http://localhost:5000/api/order/add", {
            order_id: dataAdd.order_id,
            customer_id: dataAdd.customer_id,
            order_date: dataAdd.order_date,
            total_price: dataAdd.total_price,
            status: dataAdd.status,
        });
        closeForm("add");
        resetData();
    };

    const handleSearch = async (dataSearch) => {
        const res = await axios.post("http://localhost:5000/api/order/search", {
            order_id: dataSearch.order_id,
            customer_id: dataSearch.customer_id,
        });
        console.log(res.data)
        if (res.data.length === 0) {
            resetData();
        } else {
            setDataOrder(res.data);
        }
        closeForm("search");
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/Order"} />
            <div className={`flex-grow-1 ${themeContext.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Quản lí đơn hàng"} />
                <div className="p-4">
                    <div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setSearchStatus({ status: true })}><FiSearch size={18} />Tìm kiếm</button>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setAddStatus({ status: true })}><FiPlus size={18} />Thêm đơn</button>
                        </div>

                        {removeStatus.status && (
                            <FormRemove
                                id={removeStatus.order_id}
                                typeData={labelPage}
                                name={removeStatus.customer_id}
                                closeForm={() => closeForm("remove")}
                                handleRemove={() =>
                                    handleRemove(removeStatus.order_id)
                                }
                            />
                        )}

                        {addStatus.status && (
                            <FormAdd
                                typeData={labelPage}
                                colInfo={colInfo}
                                closeForm={() => closeForm("add")}
                                handleAdd={handleAdd}
                            />
                        )}

                        {fixStatus.statusSwitch && (
                            <FormFix
                                typeData={labelPage}
                                dataFix={fixStatus.dataFix}
                                colInfo={colInfo}
                                closeForm={() => closeForm("fix")}
                                handleFix={handleFix}
                            />
                        )}

                        {searchStatus.status && (
                            <FormSearch
                                typeData={labelPage}
                                colInfo={colInfoSearch}
                                closeForm={() => closeForm("search")}
                                handleSearch={handleSearch}
                            />
                        )}

                        {detailStatus.status && (
                            <FormDetail
                                typeData={labelPage}
                                type_target={"order"}
                                id_target={detailStatus.id_target}
                                closeForm={() => {closeForm("detail")}}
                            />
                        )}

                        <div className="bg-white rounded-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                            {dataOrder.length === 0 ? (
                                <div className="d-flex flex-column align-items-center justify-content-center p-5" style={{ minHeight: "400px" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.5 }}>🛒</div>
                                    <h5 className="text-muted">Chưa có đơn hàng nào</h5>
                                    <p className="text-muted">Hãy thêm đơn hàng đầu tiên</p>
                                </div>
                            ) : (
                                <div style={{ overflowX: "auto" }}>
                                    <table className="table table-hover align-middle mb-0" style={{ minWidth: "100%" }}>
                                        <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 10 }}>
                                            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #e9ecef" }}>
                                                <th className="ps-4" style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    ID
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    ID khách hàng
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Ngày đặt hàng
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Tổng giá trị
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Trạng thái
                                                </th>
                                                <th className="text-center pe-4" style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataOrder.map((order) => {
                                                return (
                                                    <tr
                                                        key={order.order_id}
                                                        style={{
                                                            borderBottom: "1px solid #e9ecef",
                                                        }}
                                                    >
                                                        <td className="ps-4" style={{ color: "#495057" }}>
                                                            <span
                                                                style={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    width: "32px",
                                                                    height: "32px",
                                                                    backgroundColor: "#e7f1ff",
                                                                    color: "#0d6efd",
                                                                    borderRadius: "6px",
                                                                    fontWeight: "600",
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                {order.order_id}
                                                            </span>
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {order.customer_id}
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {new Date(order.order_date).toLocaleDateString("vi-VN")}
                                                        </td>
                                                        <td style={{ color: "#0d6efd", fontWeight: "600" }}>
                                                            {Number(order.total_price).toLocaleString("vi-VN")} ₫
                                                        </td>
                                                        <td>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    padding: "4px 12px",
                                                                    backgroundColor: order.status === 1 ? "#cfe2ff" : "#e2e3e5",
                                                                    color: order.status === 1 ? "#084298" : "#383d41",
                                                                    borderRadius: "6px",
                                                                    fontWeight: "500",
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                {order.status === 1 ? "Hoàn tất" : "Đang xử lý"}
                                                            </span>
                                                        </td>
                                                        <td className="text-center pe-4">
                                                            <div className="d-flex gap-2 justify-content-center">
                                                                <button
                                                                    style={{
                                                                        padding: "6px 10px",
                                                                        backgroundColor: "#cfe2ff",
                                                                        color: "#0d6efd",
                                                                        border: "none",
                                                                        borderRadius: "6px",
                                                                        fontWeight: "500",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "4px",
                                                                    }}
                                                                    onClick={() =>
                                                                        setFixStatus({
                                                                            statusSwitch: true,
                                                                            dataFix: {
                                                                                order_id: order.order_id,
                                                                                customer_id: order.customer_id,
                                                                                order_date: order.order_date,
                                                                                total_price: order.total_price,
                                                                                status: order.status,
                                                                            },
                                                                        })
                                                                    }
                                                                >
                                                                    <FiEdit2 size={16} />
                                                                    Sửa
                                                                </button>
                                                                <button
                                                                    style={{
                                                                        padding: "6px 10px",
                                                                        backgroundColor: "#cfe2ff",
                                                                        color: "#0d6efd",
                                                                        border: "none",
                                                                        borderRadius: "6px",
                                                                        fontWeight: "500",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "4px",
                                                                        transition: "all 0.3s ease",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() =>
                                                                        setDetailStatus({status: true, id_target: order.order_id})
                                                                    }
                                                                >
                                                                    <FiEye size={16} />
                                                                    Xem chi tiết
                                                                </button>
                                                                <button
                                                                    style={{
                                                                        padding: "6px 10px",
                                                                        backgroundColor: "#f8d7da",
                                                                        color: "#842029",
                                                                        border: "none",
                                                                        borderRadius: "6px",
                                                                        fontWeight: "500",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "4px",
                                                                    }}
                                                                    onClick={() =>
                                                                        setRemoveStatus({
                                                                            status: true,
                                                                            order_id: order.order_id,
                                                                            customer_id: order.customer_id,
                                                                        })
                                                                    }
                                                                >
                                                                    <FiTrash2 size={16} />
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                            )}
                        </div>

                        {dataOrder.length > 0 && (
                            <div className="mt-3 d-flex justify-content-between align-items-center px-3" style={{ color: "#6c757d" }}>
                                <small>
                                    <strong>Tổng cộng:</strong> {dataOrder.length} đơn
                                </small>
                                <small>
                                    <strong>Giá trị:</strong> {dataOrder.reduce((sum, o) => sum + (Number(o.total_price)), 0).toLocaleString("vi-VN")} ₫
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};  

export default Order;

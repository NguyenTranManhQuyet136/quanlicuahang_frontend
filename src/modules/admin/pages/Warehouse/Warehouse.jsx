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
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiEye, FiRefreshCw } from "react-icons/fi";

const labelPage = "phiếu nhập kho";

const colInfo = [
    { key: "warehouse_id", label: "ID", type: "text" },
    { key: "supplier_name", label: "Tên nhà cung cấp", type: "text" },
    { key: "import_date", label: "Ngày nhập hàng", type: "date" },
    { key: "total_value", label: "Tổng giá trị", type: "number" },
    {
        key: "status",
        label: "Trạng thái",
        type: "select",
        options: [
            { value: "Đang vận chuyển", label: "Đang vận chuyển" },
            { value: "Đã giao", label: "Đã giao" },
            { value: "Đang xử lý", label: "Đang xử lý" },
        ],
    },
];

const colInfoSearch = [
    { key: "warehouse_id", label: "ID", type: "text" },
    { key: "supplier_name", label: "Tên nhà cung cấp", type: "text" },
];

const getStatusColor = (status) => {
    switch (status) {
        case "Đang xử lý":
            return { bg: "#cfe2ff", text: "#084298" };
        case "Đang vận chuyển":
            return { bg: "#fff3cd", text: "#856404" };
        case "Đã giao":
            return { bg: "#d1e7dd", text: "#0f5132" };
        default:
            return { bg: "#e2e3e5", text: "#383d41" };
    }
};

const Warehouse = () => {
    checkLogin()

    const themeContext = useContext(ThemeContext);
    const [dataWarehouse, setDataWarehouse] = useState([]);
    const [removeStatus, setRemoveStatus] = useState({ status: false, warehouse_id: "", supplier_name: "" });
    const [fixStatus, setFixStatus] = useState({ statusSwitch: false, dataFix: {} });
    const [addStatus, setAddStatus] = useState({ status: false });
    const [searchStatus, setSearchStatus] = useState({ status: false });
    const [detailStatus, setDetailStatus] = useState({ status: false })

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/warehouse");
            setDataWarehouse(res.data);
        };
        fetchData();
    }, []);

    async function resetData() {
        const res = await axios.get("http://localhost:5000/api/warehouse");
        setDataWarehouse(res.data);
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
        }
    };

    const handleRemove = async (warehouse_id) => {
        await axios.post("http://localhost:5000/api/warehouse/remove", { warehouse_id: warehouse_id });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/warehouse/fix", {
            warehouse_id: dataFix.warehouse_id,
            supplier_name: dataFix.supplier_name,
            import_date: dataFix.import_date.slice(0, 10),
            total_value: dataFix.total_value,
            status: dataFix.status,
            idOld: idOld,
        });
        closeForm("fix");
        resetData();
    };

    const handleAdd = async (dataAdd) => {
        await axios.post("http://localhost:5000/api/warehouse/add", {
            warehouse_id: dataAdd.warehouse_id,
            supplier_name: dataAdd.supplier_name,
            import_date: dataAdd.import_date,
            total_value: dataAdd.total_value,
            status: dataAdd.status,
        });
        closeForm("add");
        resetData();
    };

    const handleSearch = async (dataSearch) => {
        const res = await axios.post("http://localhost:5000/api/warehouse/search", {
            warehouse_id: dataSearch.warehouse_id,
            supplier_name: dataSearch.supplier_name,
        });
        if (res.data.length === 0) {
            resetData();
        } else {
            setDataWarehouse(res.data);
        }
        closeForm("search");
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/Warehouse"} />
            <div className={`flex-grow-1 ${themeContext.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Quản lí nguồn cung"} />
                <div className="p-4">
                    <div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setSearchStatus({ status: true })}><FiSearch size={18} />Tìm kiếm</button>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setAddStatus({ status: true })}><FiPlus size={18} />Thêm phiếu</button>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#198754", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => window.location.reload()}><FiRefreshCw size={18} />Tải lại</button>
                        </div>

                        {removeStatus.status && (
                            <FormRemove
                                id={removeStatus.warehouse_id}
                                typeData={labelPage}
                                name={removeStatus.supplier_name}
                                closeForm={() => closeForm("remove")}
                                handleRemove={() =>
                                    handleRemove(removeStatus.warehouse_id)
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
                                type_target={"warehouse"}
                                id_target={detailStatus.id_target}
                                closeForm={() => { closeForm("detail") }}
                            />
                        )}

                        <div className="bg-white rounded-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                            {dataWarehouse.length === 0 ? (
                                <div className="d-flex flex-column align-items-center justify-content-center p-5" style={{ minHeight: "400px" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.5 }}>📦</div>
                                    <h5 className="text-muted">Chưa có phiếu nhập nào</h5>
                                    <p className="text-muted">Hãy thêm phiếu nhập đầu tiên</p>
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
                                                    Tên nhà cung cấp
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Ngày nhập
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
                                            {dataWarehouse.map((warehouse) => {
                                                return (
                                                    <tr
                                                        key={warehouse.warehouse_id}
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
                                                                {warehouse.warehouse_id}
                                                            </span>
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {warehouse.supplier_name}
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {new Date(warehouse.import_date).toLocaleDateString("vi-VN")}
                                                        </td>
                                                        <td style={{ color: "#0d6efd", fontWeight: "600" }}>
                                                            {Number(warehouse.total_value).toLocaleString("vi-VN")} ₫
                                                        </td>
                                                        <td>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    padding: "4px 12px",
                                                                    backgroundColor: getStatusColor(warehouse.status).bg,
                                                                    color: getStatusColor(warehouse.status).text,
                                                                    borderRadius: "6px",
                                                                    fontWeight: "500",
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                {warehouse.status}
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
                                                                                warehouse_id: warehouse.warehouse_id,
                                                                                supplier_name: warehouse.supplier_name,
                                                                                import_date: warehouse.import_date,
                                                                                total_value: warehouse.total_value,
                                                                                status: warehouse.status,
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
                                                                        setDetailStatus({ status: true, id_target: warehouse.warehouse_id })
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
                                                                            warehouse_id: warehouse.warehouse_id,
                                                                            supplier_name: warehouse.supplier_name,
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

                        {dataWarehouse.length > 0 && (
                            <div className="mt-3 d-flex justify-content-between align-items-center px-3" style={{ color: "#6c757d" }}>
                                <small>
                                    <strong>Tổng cộng:</strong> {dataWarehouse.length} phiếu
                                </small>
                                <small>
                                    <strong>Giá trị:</strong> {dataWarehouse.reduce((sum, w) => sum + (Number(w.total_value)), 0).toLocaleString("vi-VN")} ₫
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Warehouse;

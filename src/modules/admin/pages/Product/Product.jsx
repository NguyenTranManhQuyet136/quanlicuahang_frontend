import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormRemove from "../../components/Form/FormRemove/FormRemove";
import FormAdd from "../../components/Form/FormAdd/FormAdd";
import FormFix from "../../components/Form/FormFix/FormFix";
import FormSearch from "../../components/Form/FormSearch/FormSearch";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { logAdminAction } from "../../../../hooks/logAdminAction";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiRefreshCw } from "react-icons/fi";

const labelPage = "sản phẩm";

const colInfo = [
    { key: "product_id", label: "ID", type: "text" },
    { key: "name", label: "Tên sản phẩm", type: "text" },
    { key: "price", label: "Giá nhập", type: "number" },
    { key: "price_sell", label: "Giá bán", type: "number" },
    { key: "description", label: "Mô tả", type: "text" },
    {
        key: "type",
        label: "Loại",
        type: "select",
        options: [
            { value: "Laptop", label: "Laptop" },
            { value: "Điện thoại", label: "Điện thoại" },
            { value: "Màn hình", label: "Màn hình" },
            { value: "Tai nghe", label: "Tai nghe" },
            { value: "Bàn phím", label: "Bàn phím" },
            { value: "Chuột", label: "Chuột" },
            { value: "Loa", label: "Loa" },
        ],
    },
    { key: "image", label: "Hình ảnh", type: "text" },
    { key: "quantity", label: "Số lượng", type: "number" },
    { key: "warehouse_id", label: "Mã kho", type: "text" },
    {
        key: "status",
        label: "Trạng thái",
        type: "select",
        options: [
            { value: "Hiển thị", label: "Hiển thị" },
            { value: "Ẩn", label: "Ẩn" },
        ],
    },
];

const colInfoSearch = [
    { key: "product_id", label: "ID", type: "text" },
    { key: "name", label: "Tên sản phẩm", type: "text" },
];

const Product = () => {
    const themeContext = useContext(ThemeContext);

    const [dataProduct, setDataProduct] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const [removeStatus, setRemoveStatus] = useState({
        status: false,
        product_id: "",
        name: "",
    });

    const [fixStatus, setFixStatus] = useState({
        statusSwitch: false,
        dataFix: {},
    });

    const [addStatus, setAddStatus] = useState({
        status: false,
    });

    const [searchStatus, setSearchStatus] = useState({
        status: false,
        product_id: "",
        name: "",
    });

    const [filterType, setFilterType] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/product");
            setDataProduct(res.data);
            const resWarehouse = await axios.get("http://localhost:5000/api/warehouse");
            setWarehouses(resWarehouse.data);
        };
        fetchData();
    }, []);

    // Update colInfo with warehouse options
    const dynamicColInfo = colInfo.map(col => {
        if (col.key === "warehouse_id") {
            return {
                ...col,
                type: "select",
                options: warehouses.map(warehouse => ({ value: warehouse.warehouse_id, label: warehouse.warehouse_id }))
            };
        }
        return col;
    });

    async function resetData() {
        const res = await axios.get("http://localhost:5000/api/product");
        setDataProduct(res.data);
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
            default:
                break;
        }
    };

    const handleRemove = async (product_id) => {
        await axios.post("http://localhost:5000/api/product/remove", { product_id: product_id });
        logAdminAction(`Xóa sản phẩm: ${removeStatus.name}`);
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        if (Number(dataFix.price_sell) <= Number(dataFix.price)) {
            alert("Giá bán phải cao hơn giá gốc");
            return;
        }
        await axios.post("http://localhost:5000/api/product/fix", {
            product_id: dataFix.product_id,
            name: dataFix.name,
            price: dataFix.price,
            price_sell: dataFix.price_sell,
            description: dataFix.description,
            type: dataFix.type,
            image: dataFix.image,
            quantity: dataFix.quantity,
            warehouse_id: dataFix.warehouse_id,
            status: dataFix.status,
            idOld: idOld,
        });
        logAdminAction(`Sửa sản phẩm: ${dataFix.name}`);
        closeForm("fix");
        resetData();
    };

    const handleAdd = async (dataAdd) => {
        if (Number(dataAdd.price_sell) <= Number(dataAdd.price)) {
            alert("Giá bán phải cao hơn giá gốc");
            return;
        }
        await axios.post("http://localhost:5000/api/product/add", {
            product_id: dataAdd.product_id,
            name: dataAdd.name,
            price: dataAdd.price,
            price_sell: dataAdd.price_sell,
            description: dataAdd.description,
            type: dataAdd.type,
            image: dataAdd.image,
            quantity: dataAdd.quantity,
            warehouse_id: dataAdd.warehouse_id,
            status: dataAdd.status,
        });
        logAdminAction(`Thêm sản phẩm: ${dataAdd.name}`);
        closeForm("add");
        resetData();
    };

    const handleSearch = async (dataSearch) => {
        const res = await axios.post("http://localhost:5000/api/product/search", {
            product_id: dataSearch.product_id,
            name: dataSearch.name,
        });
        if (res.data.length === 0) {
            resetData();
        } else {
            setDataProduct(res.data);
        }
        closeForm("search");
    };

    const uniqueTypes = [...new Set(dataProduct.map((item) => item.type))];
    const filteredProducts = filterType ? dataProduct.filter((item) => item.type === filterType) : dataProduct;

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/Product"} />
            <div className={`flex-grow-1 ${themeContext.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Quản lý sản phẩm"} />
                <div className="p-4">
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <select
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                                onChange={(e) => setFilterType(e.target.value)}
                                value={filterType}
                            >
                                <option value="">Tất cả loại</option>
                                {uniqueTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setSearchStatus({ status: true })}><FiSearch size={18} />Tìm kiếm</button>
                                <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setAddStatus({ status: true })}><FiPlus size={18} />Thêm sản phẩm</button>
                                <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#198754", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => window.location.reload()}><FiRefreshCw size={18} />Tải lại</button>
                            </div>
                        </div>

                        {removeStatus.status && (
                            <FormRemove
                                id={removeStatus.product_id}
                                typeData={labelPage}
                                name={removeStatus.name}
                                closeForm={() => closeForm("remove")}
                                handleRemove={() =>
                                    handleRemove(removeStatus.product_id)
                                }
                            />
                        )}

                        {addStatus.status && (
                            <FormAdd
                                typeData={labelPage}
                                colInfo={dynamicColInfo}
                                closeForm={() => closeForm("add")}
                                handleAdd={handleAdd}
                            />
                        )}

                        {fixStatus.statusSwitch && (
                            <FormFix
                                typeData={labelPage}
                                dataFix={fixStatus.dataFix}
                                colInfo={dynamicColInfo}
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

                        <div className="bg-white rounded-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                            {filteredProducts.length === 0 ? (
                                <div className="d-flex flex-column align-items-center justify-content-center p-5" style={{ minHeight: "400px" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.5 }}>📦</div>
                                    <h5 className="text-muted">Chưa có sản phẩm nào</h5>
                                    <p className="text-muted">Hãy thêm sản phẩm đầu tiên</p>
                                </div>
                            ) : (
                                <div style={{ overflowX: "auto" }}>
                                    <table className="table table-hover align-middle mb-0" style={{ minWidth: "100%" }}>
                                        <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 10 }}>
                                            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #e9ecef" }}>
                                                {colInfo.map(col => (
                                                    <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                        {col.label}
                                                    </th>
                                                ))}
                                                <th className="text-center pe-4" style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((product, index) => {
                                                return (
                                                    <tr
                                                        key={product.product_id}
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
                                                                {product.product_id}
                                                            </span>
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {product.name}
                                                        </td>
                                                        <td style={{ color: "#0d6efd", fontWeight: "600" }}>
                                                            {Number(product.price).toLocaleString("vi-VN")} ₫
                                                        </td>
                                                        <td style={{ color: "#198754", fontWeight: "600" }}>
                                                            {Number(product.price_sell).toLocaleString("vi-VN")} ₫
                                                        </td>
                                                        <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={product.description}>
                                                            {product.description}
                                                        </td>
                                                        <td>{product.type}</td>
                                                        <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={product.image}>
                                                            {product.image}
                                                        </td>
                                                        <td>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    padding: "4px 12px",
                                                                    backgroundColor: product.quantity > 0 ? "#d4edda" : "#f8d7da",
                                                                    color: product.quantity > 0 ? "#155724" : "#856404",
                                                                    borderRadius: "6px",
                                                                    fontWeight: "500",
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                {product.quantity} {product.quantity > 0 ? "cái" : "hết"}
                                                            </span>
                                                        </td>
                                                        <td>{product.warehouse_id}</td>
                                                        <td>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    padding: "4px 12px",
                                                                    backgroundColor: product.status === "Hiển thị" ? "#cfe2ff" : "#e2e3e5",
                                                                    color: product.status === "Hiển thị" ? "#084298" : "#383d41",
                                                                    borderRadius: "6px",
                                                                    fontWeight: "500",
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                {product.status}
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
                                                                                product_id: product.product_id,
                                                                                name: product.name,
                                                                                price: product.price,
                                                                                price_sell: product.price_sell,
                                                                                description: product.description,
                                                                                type: product.type,
                                                                                image: product.image,
                                                                                quantity:
                                                                                    product.quantity,
                                                                                warehouse_id: product.warehouse_id,
                                                                                status: product.status,
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
                                                                            product_id: product.product_id,
                                                                            name: product.name,
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

                        {filteredProducts.length > 0 && (
                            <div className="mt-3 d-flex justify-content-between align-items-center px-3" style={{ color: "#6c757d" }}>
                                <small>
                                    <strong>Tổng cộng:</strong> {filteredProducts.length} sản phẩm
                                </small>
                                <small>
                                    <strong>Giá trị:</strong> {filteredProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString("vi-VN")} ₫
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;

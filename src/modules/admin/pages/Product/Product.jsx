import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormRemove from "../../components/Form/FormRemove/FormRemove";
import FormAdd from "../../components/Form/FormAdd/FormAdd";
import FormFix from "../../components/Form/FormFix/FormFix";
import FormSearch from "../../components/Form/FormSearch/FormSearch";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

const labelPage = "sản phẩm";

const colInfo = [
    { key: "product_id", label: "ID", type: "text" },
    { key: "name", label: "Tên sản phẩm", type: "text" },
    { key: "price", label: "Giá", type: "number" },
    { key: "quantity", label: "Số lượng", type: "number" },
    {
        key: "status",
        label: "Trạng thái",
        type: "select",
        options: [
            { value: 1, label: "Hiển thị" },
            { value: 0, label: "Ẩn" },
        ],
    },
];

const colInfoSearch = [
    { key: "product_id", label: "ID", type: "text" },
    { key: "name", label: "Tên sản phẩm", type: "text" },
];

const Product = () => {
    const themeContext = useContext(ThemeContext);

    console.log(themeContext.theme);
    const [dataProduct, setDataProduct] = useState([]);

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
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/product");
            setDataProduct(res.data);
        };
        fetchData();
    }, []);

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
        }
    };

    const handleRemove = async (product_id) => {
        await axios.post("http://localhost:5000/api/product/remove", {
            product_id: product_id,
        });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/product/fix", {
            product_id: dataFix.product_id,
            name: dataFix.name,
            price: dataFix.price,
            quantity: dataFix.quantity,
            status: dataFix.status,
            idOld: idOld,
        });
        closeForm("fix");
        resetData();
    };

    const handleAdd = async (dataAdd) => {
        await axios.post("http://localhost:5000/api/product/add", {
            product_id: dataAdd.product_id,
            name: dataAdd.name,
            price: dataAdd.price,
            quantity: dataAdd.quantity,
            status: dataAdd.status,
        });
        closeForm("add");
        resetData();
    };

    const handleSearch = async (dataSearch) => {
        const res = await axios.post(
            "http://localhost:5000/api/product/search",
            {
                product_id: dataSearch.product_id,
                name: dataSearch.name,
            },
        );
        if (res.data.length == 0) {
            resetData();
        } else {
            setDataProduct(res.data);
        }
        closeForm("search");
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/Product"} />
            <div className={`flex-grow-1 ${themeContext.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Quản lý sản phẩm"} />
                <div className="p-4">
                    <div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setSearchStatus({ status: true })}><FiSearch size={18} />Tìm kiếm</button>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setAddStatus({ status: true })}><FiPlus size={18} />Thêm sản phẩm</button>
                        </div>

                        {/* Forms */}
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

                        {/* Table Section */}
                        <div className="bg-white rounded-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                            {dataProduct.length === 0 ? (
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
                                                <th className="ps-4" style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    ID
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Tên sản phẩm
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Giá
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Tồn kho
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
                                            {dataProduct.map((product, index) => {
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
                                                            {product.price.toLocaleString("vi-VN")} ₫
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
                                                        <td>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    padding: "4px 12px",
                                                                    backgroundColor: product.status === 1 ? "#cfe2ff" : "#e2e3e5",
                                                                    color: product.status === 1 ? "#084298" : "#383d41",
                                                                    borderRadius: "6px",
                                                                    fontWeight: "500",
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                {product.status === 1 ? "Hiển thị" : "Ẩn"}
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
                                                                                quantity:
                                                                                    product.quantity,
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
                                                                            id: product.id,
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

                        {/* Stats Footer */}
                        {dataProduct.length > 0 && (
                            <div className="mt-3 d-flex justify-content-between align-items-center px-3" style={{ color: "#6c757d" }}>
                                <small>
                                    <strong>Tổng cộng:</strong> {dataProduct.length} sản phẩm
                                </small>
                                <small>
                                    <strong>Giá trị:</strong> {dataProduct.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString("vi-VN")} ₫
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

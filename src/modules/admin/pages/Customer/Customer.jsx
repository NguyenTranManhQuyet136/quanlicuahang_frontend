import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormRemove from "../../components/Form/FormRemove/FormRemove";
import FormAdd from "../../components/Form/FormAdd/FormAdd";
import FormFix from "../../components/Form/FormFix/FormFix";
import FormSearch from "../../components/Form/FormSearch/FormSearch";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { checkLogin } from "../../../../hooks/checkLogin";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiRefreshCw } from "react-icons/fi";

const labelPage = "khách hàng";

const colInfo = [
    { key: "customer_id", label: "ID", type: "text" },
    { key: "fullname", label: "Tên khách hàng", type: "text" },
    { key: "birthday", label: "Ngày sinh", type: "date" },
    {
        key: "gender",
        label: "Giới tính",
        type: "select",
        options: [
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
            { value: "Khác", label: "Khác" },
        ],
    },
    { key: "address", label: "Địa chỉ", type: "text" },
    { key: "phone_number", label: "Số điện thoại", type: "text" },
    { key: "email", label: "Email", type: "email" },

];

const colInfoSearch = [
    { key: "customer_id", label: "ID", type: "text" },
    { key: "fullname", label: "Tên khách hàng", type: "text" },
];

const Customer = () => {
    checkLogin()

    const themeContext = useContext(ThemeContext);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [removeStatus, setRemoveStatus] = useState({ status: false, customer_id: "", fullname: "" });
    const [fixStatus, setFixStatus] = useState({ statusSwitch: false, dataFix: {} });
    const [addStatus, setAddStatus] = useState({ status: false });
    const [searchStatus, setSearchStatus] = useState({ status: false });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/customer");
            setDataCustomer(res.data);
        };
        fetchData();
    }, []);

    async function resetData() {
        const res = await axios.get("http://localhost:5000/api/customer");
        setDataCustomer(res.data);
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

    const handleRemove = async (customer_id) => {
        await axios.post("http://localhost:5000/api/customer/remove", { customer_id: customer_id });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/customer/fix", {
            customer_id: dataFix.customer_id,
            fullname: dataFix.fullname,
            birthday: dataFix.birthday.slice(0, 10),
            gender: dataFix.gender,
            address: dataFix.address,
            phone_number: dataFix.phone_number,
            email: dataFix.email,
            idOld: idOld,
        });
        closeForm("fix");
        resetData();
    };

    const handleAdd = async (dataAdd) => {
        await axios.post("http://localhost:5000/api/customer/add", {
            customer_id: dataAdd.customer_id,
            fullname: dataAdd.fullname,
            birthday: dataAdd.birthday,
            gender: dataAdd.gender,
            address: dataAdd.address,
            phone_number: dataAdd.phone_number,
            email: dataAdd.email,
        });
        closeForm("add");
        resetData();
    };

    const handleSearch = async (dataSearch) => {
        const res = await axios.post("http://localhost:5000/api/customer/search", {
            customer_id: dataSearch.customer_id,
            fullname: dataSearch.fullname,
        });
        if (res.data.length === 0) {
            resetData();
        } else {
            setDataCustomer(res.data);
        }
        closeForm("search");
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/Customer"} />
            <div className={`flex-grow-1 ${themeContext.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Quản lí khách hàng"} />
                <div className="p-4">
                    <div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setSearchStatus({ status: true })}><FiSearch size={18} />Tìm kiếm</button>
                            {/* <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setAddStatus({ status: true })}><FiPlus size={18} />Thêm KH</button> */}
                            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#198754", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => window.location.reload()}><FiRefreshCw size={18} />Tải lại</button>
                        </div>

                        {removeStatus.status && (
                            <FormRemove
                                id={removeStatus.customer_id}
                                typeData={labelPage}
                                name={removeStatus.fullname}
                                closeForm={() => closeForm("remove")}
                                handleRemove={() =>
                                    handleRemove(removeStatus.customer_id)
                                }
                            />
                        )}

                        {/* {addStatus.status && (
                            <FormAdd
                                typeData={labelPage}
                                colInfo={colInfo}
                                closeForm={() => closeForm("add")}
                                handleAdd={handleAdd}
                            />
                        )} */}

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

                        <div className="bg-white rounded-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                            {dataCustomer.length === 0 ? (
                                <div className="d-flex flex-column align-items-center justify-content-center p-5" style={{ minHeight: "400px" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.5 }}>👤</div>
                                    <h5 className="text-muted">Chưa có khách hàng nào</h5>
                                    <p className="text-muted">Hãy thêm khách hàng đầu tiên</p>
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
                                                    Tên khách hàng
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Ngày sinh
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Giới tính
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Địa chỉ
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    SĐT
                                                </th>
                                                <th style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Email
                                                </th>
                                                <th className="text-center pe-4" style={{ color: "#495057", fontWeight: "600", fontSize: "0.95rem" }}>
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataCustomer.map((customer) => {
                                                return (
                                                    <tr
                                                        key={customer.customer_id}
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
                                                                {customer.customer_id}
                                                            </span>
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {customer.fullname}
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {new Date(customer.birthday).toLocaleDateString('vi-VN')}
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {customer.gender}
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {customer.address}
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {customer.phone_number}
                                                        </td>
                                                        <td style={{ color: "#212529", fontWeight: "500" }}>
                                                            {customer.email}
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
                                                                                customer_id: customer.customer_id,
                                                                                fullname: customer.fullname,
                                                                                birthday: customer.birthday,
                                                                                gender: customer.gender,
                                                                                address: customer.address,
                                                                                phone_number: customer.phone_number,
                                                                                email: customer.email,
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
                                                                            customer_id: customer.customer_id,
                                                                            fullname: customer.fullname,
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

                        {dataCustomer.length > 0 && (
                            <div className="mt-3 d-flex justify-content-between align-items-center px-3" style={{ color: "#6c757d" }}>
                                <small>
                                    <strong>Tổng cộng:</strong> {dataCustomer.length} khách hàng
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;

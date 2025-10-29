import axios from "axios";
import { useEffect, useState , useContext } from "react";
import FormRemove from "../Form/FormRemove";
import FormAdd from "../Form/FormAdd";
import FormFix from "../Form/FormFix";
import FormSearch from "../Form/FormSearch";
import { ThemeContext } from "../../contexts/ThemeProvider";

const labelPage = "khách hàng";

const colInfo = [
    { key: "id", label: "ID", type: "number" },
    { key: "fullname", label: "Họ tên khách hàng", type: "text" },
    { key: "birthyear", label: "Năm sinh", type: "number" },
    { key: "address", label: "Địa chỉ", type: "text" },
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
    { key: "id", label: "ID", type: "number" },
    { key: "fullname", label: "Họ tên khách hàng", type: "text" },
];

const CustomerList = () => {
    const themeContext = useContext(ThemeContext)

    const [dataCustomer, setDataCustomer] = useState([]);

    const [removeStatus, setRemoveStatus] = useState({
        status: false,
        id: "",
        fullname: "",
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

    const handleRemove = async (id) => {
        await axios.post("http://localhost:5000/api/customer/remove", {
            id: id,
        });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/customer/fix", {
            id: dataFix.id,
            fullname: dataFix.fullname,
            birthyear: dataFix.birthyear,
            address: dataFix.address,
            status: dataFix.status,
            idOld: idOld,
        });
        closeForm("fix");
        resetData();
    };

    const handleAdd = async (dataAdd) => {
        await axios.post("http://localhost:5000/api/customer/add", {
            id: dataAdd.id,
            fullname: dataAdd.fullname,
            birthyear: dataAdd.birthyear,
            address: dataAdd.address,
            status: dataAdd.status,
        });
        closeForm("add");
        resetData();
    };

    const handleSearch = async (dataSearch) => {
        const res = await axios.post(
            "http://localhost:5000/api/customer/search",
            {
                id: dataSearch.id,
                fullname: dataSearch.fullname,
            },
        );
        if (res.data.length == 0) {
            resetData();
        } else {
            setDataCustomer(res.data);
        }
        closeForm("search");
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div>
                <div>
                    <button
                        className="btn btn-primary px-4 "
                        style={{ width: "220px", marginRight: "5px" }}
                        onClick={() =>
                            setSearchStatus({
                                status: true,
                            })
                        }
                    >
                        Tìm kiếm khách hàng
                    </button>

                    <button
                        className="btn btn-primary px-4 "
                        style={{ width: "200px" }}
                        onClick={() =>
                            setAddStatus({
                                status: true,
                            })
                        }
                    >
                        Thêm khách hàng
                    </button>
                </div>
            </div>

            {removeStatus.status && (
                <FormRemove
                    id={removeStatus.id}
                    typeData={labelPage}
                    fullname={removeStatus.fullname}
                    closeForm={() => closeForm("remove")}
                    handleRemove={() => handleRemove(removeStatus.id)}
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

            <div
                className="table-responsive shadow-sm rounded bg-white"
                style={{ maxHeight: "800px", overflowY: "auto" }}
            >
                <table className="table table-hover align-middle mb-0">
                    <thead
                        className="table-primary"
                        style={{ position: "sticky", top: 0, zIndex: 2 }}
                    >
                        <tr>
                            <th className={`thead ${themeContext.theme}`} scope="col">ID</th>
                            <th className={`thead ${themeContext.theme}`} scope="col">Họ và tên khách hàng</th>
                            <th className={`thead ${themeContext.theme}`} scope="col">Năm sinh</th>
                            <th className={`thead ${themeContext.theme}`} scope="col">Địa chỉ</th>
                            <th className={`thead ${themeContext.theme}`} scope="col">Trạng thái</th>
                            <th className={`thead ${themeContext.theme} text-center`} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCustomer.map((customer) => {
                            return (
                                <tr key={customer.id}>
                                    <td className={`${themeContext.theme}`}>{customer.id}</td>
                                    <td className={`${themeContext.theme}`}>{customer.fullname}</td>
                                    <td className={`${themeContext.theme}`}>{customer.birthyear}</td>
                                    <td className={`${themeContext.theme}`}>{customer.address}</td>
                                    <td className={`${themeContext.theme}`}>
                                            {customer.status === 1
                                                ? "Hiển thị"
                                                : "Ẩn"}
                                       
                                    </td>
                                    <td className={`text-center ${themeContext.theme}`}>
                                        <button
                                            className="btn btn-sm btn-outline-primary "
                                                
                                            onClick={() =>
                                                setFixStatus({
                                                    statusSwitch: true,
                                                    dataFix: {
                                                        id: customer.id,
                                                        fullname:
                                                            customer.fullname,
                                                        birthyear:
                                                            customer.birthyear,
                                                        address:
                                                            customer.address,
                                                        status: customer.status,
                                                    },
                                                })
                                            }
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                setRemoveStatus({
                                                    status: true,
                                                    id: customer.id,
                                                    fullname: customer.fullname,
                                                })
                                            }
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;

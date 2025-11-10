import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormRemove from "../../components/Form/FormRemove";
import FormAdd from "../../components/Form/FormAdd";
import FormFix from "../../components/Form/FormFix";
import FormSearch from "../../components/Form/FormSearch";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { checkLogin } from "../../hooks/checkLogin";

const labelPage = "đơn hàng";

const colInfo = [
    { key: "id", label: "ID", type: "number" },
    { key: "customer_id", label: "Mã khách hàng", type: "number" },
    { key: "order_date", label: "Ngày đặt hàng", type: "date" },
    { key: "total_price", label: "Tổng tiền", type: "number" },
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
    { key: "id", label: "ID", type: "number" },
    { key: "customer_id", label: "Mã khách hàng", type: "number" },
];

const Order = () => {
    checkLogin()

    const themeContext = useContext(ThemeContext);

    const [dataOrder, setDataOrder] = useState([]);

    const [removeStatus, setRemoveStatus] = useState({
        status: false,
        id: "",
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
        }
    };

    const handleRemove = async (id) => {
        await axios.post("http://localhost:5000/api/order/remove", { id: id });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/order/fix", {
            id: dataFix.id,
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
            id: dataAdd.id,
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
            id: dataSearch.id,
            customer_id: dataSearch.customer_id,
        });
        if (res.data.length == 0) {
            resetData();
        } else {
            setDataOrder(res.data);
        }
        closeForm("search");
    };

    console.log(dataOrder[0]);
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Order"} />
            <div className={`flex-grow-1 bg-light ${themeContext.theme}`}>
                <Header name={"Quản lí đơn hàng"} />
                <div className="p-4">
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div></div>
                            <div>
                                <button
                                    className="btn btn-primary px-4"
                                    style={{
                                        width: "220px",
                                        marginRight: "5px",
                                    }}
                                    onClick={() =>
                                        setSearchStatus({
                                            status: true,
                                        })
                                    }
                                >
                                    Tìm kiếm đơn hàng
                                </button>

                                <button
                                    className="btn btn-primary px-4"
                                    style={{ width: "200px" }}
                                    onClick={() =>
                                        setAddStatus({
                                            status: true,
                                        })
                                    }
                                >
                                    Thêm đơn hàng
                                </button>
                            </div>
                        </div>

                        {removeStatus.status && (
                            <FormRemove
                                id={removeStatus.id}
                                typeData={labelPage}
                                closeForm={() => closeForm("remove")}
                                handleRemove={() =>
                                    handleRemove(removeStatus.id)
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

                        <div
                            className="table-responsive shadow-sm rounded bg-white"
                            style={{ maxHeight: "800px", overflowY: "auto" }}
                        >
                            <table className="table table-hover align-middle mb-0">
                                <thead
                                    className="table-primary"
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 2,
                                    }}
                                >
                                    <tr>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            ID
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            Mã khách hàng
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            Ngày đặt hàng
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            Tổng tiền
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            Trạng thái
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme} center`}
                                            scope="col"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataOrder.map((order) => {
                                        return (
                                            <tr key={order.id}>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {order.id}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {order.customer_id}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {order.order_date}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {order.total_price.toLocaleString(
                                                        "vi-VN",
                                                    ) + " VND"}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    <span>
                                                        {order.status == 1
                                                            ? "Hoàn tất"
                                                            : "Đang xử lý"}
                                                    </span>
                                                </td>
                                                <td
                                                    className={`${themeContext.theme} text-center`}
                                                >
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            setFixStatus({
                                                                statusSwitch: true,
                                                                dataFix: {
                                                                    id: order.id,
                                                                    customer_id:
                                                                        order.customer_id,
                                                                    order_date:
                                                                        order.order_date,
                                                                    total_price:
                                                                        order.total_price,
                                                                    status: order.status,
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
                                                                id: order.id,
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
                </div>
            </div>
        </div>
    );
};

export default Order;

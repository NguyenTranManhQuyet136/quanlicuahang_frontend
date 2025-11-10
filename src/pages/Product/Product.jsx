import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormRemove from "../../components/Form/FormRemove";
import FormAdd from "../../components/Form/FormAdd";
import FormFix from "../../components/Form/FormFix";
import FormSearch from "../../components/Form/FormSearch";
import { ThemeContext } from "../../contexts/ThemeProvider";

const labelPage = "sản phẩm";

const colInfo = [
    { key: "id", label: "ID", type: "number" },
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
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "Tên sản phẩm", type: "text" },
];

const Product = () => {
    const themeContext = useContext(ThemeContext);

    console.log(themeContext.theme);
    const [dataProduct, setDataProduct] = useState([]);

    const [removeStatus, setRemoveStatus] = useState({
        status: false,
        id: "",
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

    const handleRemove = async (id) => {
        await axios.post("http://localhost:5000/api/product/remove", {
            id: id,
        });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/product/fix", {
            id: dataFix.id,
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
            id: dataAdd.id,
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
                id: dataSearch.id,
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
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Product"} />
            <div className={`flex-grow-1 bg-light ${themeContext.theme}`}>
                <Header name={"Quản lí sản phẩm"} />
                <div className="p-4">
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div></div>
                            <div>
                                <button
                                    className="btn btn-primary px-4 "
                                    style={{
                                        width: "200px",
                                        marginRight: "5px",
                                    }}
                                    onClick={() =>
                                        setSearchStatus({
                                            status: true,
                                        })
                                    }
                                >
                                    Tìm kiếm sản phẩm
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
                                    Thêm sản phẩm
                                </button>
                            </div>
                        </div>

                        {removeStatus.status && (
                            <FormRemove
                                id={removeStatus.id}
                                typeData={labelPage}
                                name={removeStatus.name}
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
                                            Tên sản phẩm
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            Giá
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            Tồn kho
                                        </th>
                                        <th
                                            className={`thead ${themeContext.theme}`}
                                            scope="col"
                                        >
                                            Trạng thái
                                        </th>
                                        <th
                                            scope="col"
                                            className={`text-center thead ${themeContext.theme}`}
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataProduct.map((product) => {
                                        return (
                                            <tr key={product.id}>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {product.id}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {product.name}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {product.price.toLocaleString(
                                                        "vi-VN",
                                                    ) + " VND"}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    {product.quantity}
                                                </td>
                                                <td
                                                    className={`${themeContext.theme}`}
                                                >
                                                    <span className="">
                                                        {product.status == 1
                                                            ? "Hiển thị"
                                                            : "Ẩn"}
                                                    </span>
                                                </td>
                                                <td
                                                    className={`text-center ${themeContext.theme}`}
                                                >
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            setFixStatus({
                                                                statusSwitch: true,
                                                                dataFix: {
                                                                    id: product.id,
                                                                    name: product.name,
                                                                    price: product.price,
                                                                    quantity:
                                                                        product.quantity,
                                                                    status: product.status,
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
                                                                id: product.id,
                                                                name: product.name,
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

export default Product;

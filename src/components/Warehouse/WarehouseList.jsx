import axios from "axios";
import { useEffect, useState } from "react";
import FormRemove from "../Form/FormRemove";
import FormAdd from "../Form/FormAdd";
import FormFix from "../Form/FormFix";
import FormSearch from "../Form/FormSearch";

const labelPage = "phiếu nhập kho";

const colInfo = [
    { key: "id", label: "ID", type: "number" },
    { key: "supplier_name", label: "Tên nhà cung cấp", type: "text" },
    { key: "import_date", label: "Ngày nhập hàng", type: "date" },
    { key: "total_value", label: "Tổng giá trị", type: "number" },
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
    { key: "supplier_name", label: "Tên nhà cung cấp", type: "text" },
];

const WarehouseList = () => {
    const [dataWarehouse, setDataWarehouse] = useState([]);

    const [removeStatus, setRemoveStatus] = useState({
        status: false,
        id: "",
        supplier_name: "",
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
        }
    };

    const handleRemove = async (id) => {
        await axios.post("http://localhost:5000/api/warehouse/remove", {
            id: id,
        });
        closeForm("remove");
        resetData();
    };

    const handleFix = async (dataFix, idOld) => {
        await axios.post("http://localhost:5000/api/warehouse/fix", {
            id: dataFix.id,
            supplier_name: dataFix.supplier_name,
            import_date: dataFix.import_date,
            total_value: dataFix.total_value,
            status: dataFix.status,
            idOld: idOld,
        });
        closeForm("fix");
        resetData();
    };

    const handleAdd = async (dataAdd) => {
        await axios.post("http://localhost:5000/api/warehouse/add", {
            id: dataAdd.id,
            supplier_name: dataAdd.supplier_name,
            import_date: dataAdd.import_date,
            total_value: dataAdd.total_value,
            status: dataAdd.status,
        });
        closeForm("add");
        resetData();
    };

    const handleSearch = async (dataSearch) => {
        const res = await axios.post(
            "http://localhost:5000/api/warehouse/search",
            {
                id: dataSearch.id,
                supplier_name: dataSearch.supplier_name,
            },
        );
        if (res.data.length === 0) {
            resetData();
        } else {
            setDataWarehouse(res.data);
        }
        closeForm("search");
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div>
                <div>
                    <button
                        className="btn btn-primary px-4"
                        style={{ width: "220px", marginRight: "5px" }}
                        onClick={() => setSearchStatus({ status: true })}
                    >
                        Tìm kiếm phiếu nhập
                    </button>

                    <button
                        className="btn btn-primary px-4"
                        style={{ width: "200px" }}
                        onClick={() => setAddStatus({ status: true })}
                    >
                        Thêm phiếu nhập
                    </button>
                </div>
            </div>

            {removeStatus.status && (
                <FormRemove
                    id={removeStatus.id}
                    typeData={labelPage}
                    fullname={removeStatus.supplier_name}
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
                className="table-responsive shadow-sm rounded bg-warehouseite"
                style={{ maxHeight: "800px", overflowY: "auto" }}
            >
                <table className="table table-hover align-middle mb-0">
                    <thead
                        className="table-primary"
                        style={{ position: "sticky", top: 0, zIndex: 2 }}
                    >
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tên nhà cung cấp</th>
                            <th scope="col">Ngày nhập hàng</th>
                            <th scope="col">Tổng giá trị</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col" className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataWarehouse.map((warehouse) => (
                            <tr key={warehouse.id}>
                                <td>{warehouse.id}</td>
                                <td>{warehouse.supplier_name}</td>
                                <td>
                                    {new Date(
                                        warehouse.import_date,
                                    ).toLocaleDateString("vi-VN")}
                                </td>
                                <td>
                                    {Number(warehouse.total_value).toLocaleString(
                                        "vi-VN",
                                    )}{" "}
                                    VND
                                </td>
                                <td>
                                    {warehouse.status === 1
                                        ? "Hoàn tất"
                                        : "Đang xử lý"}
                                </td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() =>
                                            setFixStatus({
                                                statusSwitch: true,
                                                dataFix: {
                                                    id: warehouse.id,
                                                    supplier_name:
                                                        warehouse.supplier_name,
                                                    import_date: warehouse.import_date,
                                                    total_value: warehouse.total_value,
                                                    status: warehouse.status,
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
                                                id: warehouse.id,
                                                supplier_name: warehouse.supplier_name,
                                            })
                                        }
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseList;

import { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import axios from "axios";
import "./FormDetail.css";

const FormDetail = (props: any) => {
    const [dataForm, setDataForm] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [bonusInfo, setBonusInfo] = useState(false)

    const colInfo = props.type_target == "warehouse" ? [
        { key: "product_id", label: "Mã sản phẩm", type: "text" },
        { key: "name", label: "Tên sản phẩm", type: "text" },
        { key: "price", label: "Giá", type: "number" },
        { key: "quantity", label: "Số lượng", type: "number" },
    ] : [
        { key: "product_id", label: "Mã sản phẩm", type: "text" },
        { key: "name", label: "Tên sản phẩm", type: "text" },
        { key: "price_sell", label: "Giá", type: "number" },
        { key: "unit_quantity", label: "Số lượng", type: "number" },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.post(`http://localhost:5000/api/${props.type_target}/detail`, {
                    id: props.id_target
                })
                setDataForm(res.data);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();

        if (props.type_target == "order" || props.type_target == "warehouse") {
            setBonusInfo(true)
        }
    }, [])

    const getOrderStatusStyle = (status: any) => {
        switch (status) {
            case "Hoàn tất":
            case "Đã giao hàng":
                return { backgroundColor: "#d1e7dd", color: "#0f5132", border: "1px solid #badbcc" };
            case "Đang giao hàng":
                return { backgroundColor: "#cfe2ff", color: "#084298", border: "1px solid #b6d4fe" };
            case "Chờ lấy hàng":
            case "Đang chờ xác nhận":
            default:
                return { backgroundColor: "#e2e3e5", color: "#41464b", border: "1px solid #d3d6d8" };
        }
    };

    const getWarehouseStatusStyle = (status: any) => {
        switch (status) {
            case "Đang xử lý":
                return { backgroundColor: "#cfe2ff", color: "#084298", border: "1px solid #b6d4fe" };
            case "Đang vận chuyển":
                return { backgroundColor: "#fff3cd", color: "#664d03", border: "1px solid #ffecb5" };
            case "Đã giao":
                return { backgroundColor: "#d1e7dd", color: "#0f5132", border: "1px solid #badbcc" };
            default:
                return { backgroundColor: "#e2e3e5", color: "#41464b", border: "1px solid #d3d6d8" };
        }
    };

    return (
        <div className="form-detail-overlay">
            <div className="form-detail-container">
                <div className="form-detail-header">
                    <h3>Chi tiết {props.typeData}</h3>
                    <button
                        type="button"
                        className="form-detail-close-btn"
                        onClick={props.closeForm}
                    >
                        ✕
                    </button>
                </div>

                {loading ? (
                    <div className="d-flex justify-content-center align-items-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : dataForm.length === 0 ? (
                    <div className="form-detail-empty">
                        Không có dữ liệu
                    </div>
                ) : (
                    <>
                        {bonusInfo && (
                            <div className="form-detail-bonus-info">
                                {props.type_target === "order" ? (
                                    <>
                                        <div className="form-detail-info-item">
                                            <small>Mã khách hàng</small>
                                            <p>{dataForm[0].customer_id}</p>
                                        </div>
                                        <div className="form-detail-info-item">
                                            <small>Tên khách hàng</small>
                                            <p>{dataForm[0].fullname}</p>
                                        </div>
                                        <div className="form-detail-info-item">
                                            <small>Mã hóa đơn</small>
                                            <p>{dataForm[0].order_id}</p>
                                        </div>
                                        <div className="form-detail-info-item">
                                            <small>Ngày đặt hàng</small>
                                            <p>{new Date(dataForm[0].order_date.slice(0, 10)).toLocaleDateString("vi-VN")}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-detail-info-item">
                                            <small>Mã phiếu nhập</small>
                                            <p>{props.id_target}</p>
                                        </div>
                                        <div className="form-detail-info-item">
                                            <small>Nhà cung cấp</small>
                                            <p>{dataForm[0].supplier_name}</p>
                                        </div>
                                        <div className="form-detail-info-item">
                                            <small>Ngày nhập</small>
                                            <p>{new Date(dataForm[0].import_date.slice(0, 10)).toLocaleDateString("vi-VN")}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="form-detail-table-wrapper">
                            <table className="form-detail-table">
                                <thead>
                                    <tr>
                                        {colInfo.map((col: any) => (
                                            <th key={col.key}>
                                                {col.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataForm.map((row: any, idx: number) => (
                                        <tr key={idx}>
                                            {colInfo.map((col: any) => (
                                                <td key={`${idx}-${col.key}`}>
                                                    {col.type === "select" && col.options ? (
                                                        <span
                                                            className={`form-detail-badge ${row[col.key] === 1
                                                                ? "form-detail-badge-active"
                                                                : "form-detail-badge-inactive"
                                                                }`}
                                                        >
                                                            {col.options.find((opt: any) => opt.value === row[col.key])?.label || "-"}
                                                        </span>
                                                    ) : col.type === "date" ? (
                                                        new Date(row[col.key]).toLocaleDateString("vi-VN")
                                                    ) : col.type === "number" ? (
                                                        Number(row[col.key] || 0).toLocaleString("vi-VN")
                                                    ) : (
                                                        row[col.key] || "-"
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="form-detail-actions">
                            <button
                                type="button"
                                className="form-detail-btn-close"
                                onClick={props.closeForm}
                            >
                                Đóng
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FormDetail;
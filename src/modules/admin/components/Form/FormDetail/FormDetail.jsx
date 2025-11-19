import { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import axios from "axios";
import "./FormDetail.css";

const FormDetail = (props) => {
    console.log("123")

    const [dataForm, setDataForm] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bonusInfo, setBonusInfo] = useState(false)

    const colInfo = props.type_target == "warehouse" ? [
        { key: "product_id", label: "Mã sản phẩm", type: "text" },
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
    ] : [
        { key: "product_id", label: "Mã sản phẩm", type: "text" },
        { key: "name", label: "Tên sản phẩm", type: "text" },
        { key: "price", label: "Giá", type: "number" },
        { key: "unit_quantity", label: "Số lượng", type: "number" },
        {
            key: "status",
            label: "Trạng thái",
            type: "select",
            options: [
                { value: 1, label: "Hiển thị" },
                { value: 0, label: "Ẩn" },
            ],
        },
    ]
    console.log(props.id_target)

    useEffect( () => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.post(`http://localhost:5000/api/${props.type_target}/detail`,{
                    id: props.id_target
                })
                setDataForm(res.data);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();

        if (props.type_target == "order") {
            setBonusInfo(true)
        }
    },[])

    return (
        <div className="form-detail-overlay" onClick={props.closeForm}>
            <div className="form-detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-detail-header">
                    <div className="form-detail-header-content">
                        <div className="form-detail-header-left">
                            <div className="form-detail-icon-box">
                                <FiEye size={24} />
                            </div>
                            <div className="form-detail-header-title">
                                <h4>Chi tiết {props.typeData}</h4>
                                <small>Thông tin chi tiết về {props.typeData}</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-detail-close-btn"
                            onClick={props.closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="form-detail-body">
                    {loading ? (
                        <div className="form-detail-loading">
                            <div className="form-detail-loading-text">Đang tải dữ liệu...</div>
                            <div className="form-detail-loading-spinner"></div>
                        </div>
                    ) : dataForm.length === 0 ? (
                        <div className="form-detail-empty">
                            Không có dữ liệu
                        </div>
                    ) : (
                        <>
                            {bonusInfo && (
                                <div className="form-detail-bonus-info">
                                    <div className="form-detail-info-item">
                                        <small>Mã khách hàng</small>
                                        <p>{dataForm[0].customer_id}</p>
                                    </div>
                                    <div className="form-detail-info-item">
                                        <small>Tên khách hàng</small>
                                        <p>{dataForm[0].fullname}</p>
                                    </div>
                                    <div className="form-detail-info-item">
                                        <small>Năm sinh</small>
                                        <p>{dataForm[0].birthyear}</p>
                                    </div>
                                    <div className="form-detail-info-item">
                                        <small>Ngày đặt hàng</small>
                                        <p>{new Date(dataForm[0].order_date.slice(0,10)).toLocaleDateString("vi-VN")}</p>
                                    </div>
                                </div>
                            )}

                            <div className="form-detail-table-wrapper">
                                <table className="form-detail-table">
                                    <thead>
                                        <tr>
                                            {colInfo.map((col) => (
                                                <th key={col.key}>
                                                    {col.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataForm.map((row, idx) => (
                                            <tr key={idx}>
                                                {colInfo.map((col) => (
                                                    <td key={`${idx}-${col.key}`}>
                                                        {col.type === "select" && col.options ? (
                                                            <span
                                                                className={`form-detail-badge ${
                                                                    row[col.key] === 1
                                                                        ? "form-detail-badge-active"
                                                                        : "form-detail-badge-inactive"
                                                                }`}
                                                            >
                                                                {col.options.find(opt => opt.value === row[col.key])?.label || "-"}
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
        </div>
    );
};

export default FormDetail;
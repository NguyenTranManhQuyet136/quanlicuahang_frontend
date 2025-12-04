import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ThemeContext } from "../../../../../contexts/ThemeProvider";
import { FiPlus } from "react-icons/fi";
import "./FormAdd.css";

const FormAdd = (props: any) => {
    const themeContext = useContext(ThemeContext);
    const [dataForm, setDataForm] = useState({ status: "Hiển thị" });

    useEffect(() => {
        if (props.typeData === "sản phẩm") {
            axios.get("http://localhost:5000/api/product/generate-id")
                .then(res => {
                    setDataForm(prev => ({ ...prev, product_id: res.data.id }));
                })
                .catch(err => console.log(err));
        } else if (props.typeData === "phiếu nhập kho") {
            axios.get("http://localhost:5000/api/warehouse/generate-id")
                .then(res => {
                    setDataForm(prev => ({ ...prev, warehouse_id: res.data.id }));
                })
                .catch(err => console.log(err));
        }
    }, [props.typeData]);

    return (
        <div className="form-add-overlay">
            <div className="form-add-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-add-header">
                    <div className="form-add-header-content">
                        <div className="form-add-header-left">
                            <div className="form-add-icon-box">
                                {(FiPlus as any)({ size: 24 })}
                            </div>
                            <div className="form-add-header-title">
                                <h4>Thêm {props.typeData}</h4>
                                <small>Tạo {props.typeData} mới</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-add-close-btn"
                            onClick={props.closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className={`form-add-body ${themeContext.theme}`}>
                    <form>
                        {props.colInfo.map((col: any) => (
                            <div className="form-add-group" key={col.key}>
                                <label className="form-add-label">
                                    {col.label}
                                </label>
                                {col.type !== "select" ? (
                                    <input
                                        type={col.type}
                                        placeholder={"Nhập " + col.label.toLowerCase()}
                                        className="form-add-input"
                                        value={(dataForm as any)[col.key] || ''}
                                        readOnly={col.key === 'product_id'}
                                        onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                    />
                                ) : (
                                    <select
                                        className="form-add-select"
                                        value={(dataForm as any)[col.key] || ''}
                                        onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                    >
                                        <option value="">-- Chọn {col.label.toLowerCase()} --</option>
                                        {col.options?.map((option: any) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}
                    </form>
                </div>
                <div className="form-add-footer">
                    <div className="form-add-actions">
                        <button
                            type="button"
                            className="form-add-btn-cancel"
                            onClick={props.closeForm}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="button"
                            className="form-add-btn-submit"
                            onClick={() => {
                                console.log(dataForm)
                                props.handleAdd(dataForm)
                            }}
                        >
                            Thêm mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAdd;

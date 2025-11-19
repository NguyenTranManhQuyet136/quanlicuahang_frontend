import { useState, useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeProvider";
import { FiPlus } from "react-icons/fi";
import "./FormAdd.css";

const FormAdd = (props) => {
    const themeContext = useContext(ThemeContext);
    const [dataForm, setDataForm] = useState({ status: 1 });

    return (
        <div className="form-add-overlay" onClick={props.closeForm}>
            <div className="form-add-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-add-header">
                    <div className="form-add-header-content">
                        <div className="form-add-header-left">
                            <div className="form-add-icon-box">
                                <FiPlus size={24} />
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
                        {props.colInfo.map((col) => (
                            <div className="form-add-group" key={col.key}>
                                <label className="form-add-label">
                                    {col.label}
                                </label>
                                {col.type !== "select" ? (
                                    <input
                                        type={col.type}
                                        placeholder={"Nhập " + col.label.toLowerCase()}
                                        className="form-add-input"
                                        onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                    />
                                ) : (
                                    <select
                                        className="form-add-select"
                                        onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                    >
                                        <option value="">-- Chọn {col.label.toLowerCase()} --</option>
                                        {col.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}

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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormAdd;

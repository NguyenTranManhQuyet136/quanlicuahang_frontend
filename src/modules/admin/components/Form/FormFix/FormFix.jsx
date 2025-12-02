import { useContext, useState } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeProvider";
import { FiEdit2 } from "react-icons/fi";
import "./FormFix.css";

const FormFix = (props) => {
    const themeContext = useContext(ThemeContext);
    const entity = props.colInfo[0].key
    const idOld = props.dataFix[entity];
    const [dataForm, setDataForm] = useState(props.dataFix);
    return (
        <div className="form-fix-overlay" onClick={props.closeForm}>
            <div className="form-fix-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-fix-header">
                    <div className="form-fix-header-content">
                        <div className="form-fix-header-left">
                            <div className="form-fix-icon-box">
                                <FiEdit2 size={24} />
                            </div>
                            <div className="form-fix-header-title">
                                <h4>Sửa {props.typeData}</h4>
                                <small>Cập nhật thông tin {props.typeData}</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-fix-close-btn"
                            onClick={props.closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className={`form-fix-body ${themeContext.theme}`}>
                    <form>
                        {props.colInfo.map((col) => (
                            <div className="form-fix-group" key={col.key}>
                                <label className="form-fix-label">
                                    {col.label}
                                </label>
                                {col.type !== "select" ? (
                                    <input
                                        type={col.type}
                                        placeholder={"Nhập " + col.label.toLowerCase()}
                                        value={col.type == "date" ? dataForm[col.key].slice(0, 10) : dataForm[col.key]}
                                        className="form-fix-input"
                                        onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                        readOnly={col.readOnly}
                                        style={col.readOnly ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                                    />
                                ) : (
                                    <select
                                        value={dataForm[col.key]}
                                        className="form-fix-select"
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

                        <div className="form-fix-actions">
                            <button
                                type="button"
                                className="form-fix-btn-cancel"
                                onClick={props.closeForm}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="form-fix-btn-submit"
                                onClick={() => props.handleFix(dataForm, idOld)}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormFix;

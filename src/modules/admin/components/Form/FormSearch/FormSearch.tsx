import { useState, useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeProvider";
import { FiSearch } from "react-icons/fi";
import "./FormSearch.css";

const FormSearch = (props: any) => {
    const themeContext = useContext(ThemeContext);
    const [dataForm, setDataForm] = useState({});

    return (
        <div className="form-search-overlay" onClick={props.closeForm}>
            <div className="form-search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-search-header">
                    <div className="form-search-header-content">
                        <div className="form-search-header-left">
                            <div className="form-search-icon-box">
                                {(FiSearch as any)({ size: 24 })}
                            </div>
                            <div className="form-search-header-title">
                                <h4>Tìm kiếm {props.typeData}</h4>
                                <small>Tìm {props.typeData} theo tiêu chí</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-search-close-btn"
                            onClick={props.closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className={`form-search-body ${themeContext.theme}`}>
                    <form>
                        {props.colInfo.map((col: any) => (
                            <div className="form-search-group" key={col.key}>
                                <label className="form-search-label">
                                    {col.label}
                                </label>
                                {col.type !== "select" ? (
                                    <input
                                        type={col.type}
                                        placeholder={"Nhập " + col.label.toLowerCase()}
                                        className="form-search-input"
                                        onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                    />
                                ) : (
                                    <select
                                        className="form-search-select"
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

                        <div className="form-search-actions">
                            <button
                                type="button"
                                className="form-search-btn-cancel"
                                onClick={props.closeForm}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="form-search-btn-submit"
                                // onClick={() => props.handleSearch(dataForm)}
                                onClick={() => props.handleSearch(dataForm)}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormSearch;

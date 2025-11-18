import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { FiTrash2 } from "react-icons/fi";
import "./FormRemove.css";

const FormRemove = (props) => {
    const themeContext = useContext(ThemeContext);

    return (
        <div className="form-remove-overlay" onClick={props.closeForm}>
            <div className="form-remove-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-remove-header">
                    <div className="form-remove-header-content">
                        <div className="form-remove-header-left">
                            <div className="form-remove-icon-box">
                                <FiTrash2 size={24} />
                            </div>
                            <div className="form-remove-header-title">
                                <h4>Xác nhận xóa</h4>
                                <small>Thao tác này không thể hoàn tác</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-remove-close-btn"
                            onClick={props.closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className={`form-remove-body ${themeContext.theme}`}>
                    <p className="form-remove-message">
                        Bạn có chắc muốn xóa <span className="form-remove-highlight">{props.name}</span> không?
                    </p>
                    <p className="form-remove-warning">
                        Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống
                    </p>

                    <div className="form-remove-actions">
                        <button
                            type="button"
                            className="form-remove-btn-cancel"
                            onClick={props.closeForm}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="button"
                            className="form-remove-btn-submit"
                            onClick={props.handleRemove}
                        >
                            Xóa ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormRemove;

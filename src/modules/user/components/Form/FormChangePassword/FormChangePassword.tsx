import React, { useState } from "react";
import "./FormChangePassword.css";

interface FormChangePasswordProps {
    closeForm: () => void;
    handleChangePassword: (password: string, passwordChange: string, confirmPasswordChange: string) => void;
}

const FormChangePassword: React.FC<FormChangePasswordProps> = ({ closeForm, handleChangePassword }) => {
    const [password, setPassword] = useState("");
    const [passwordChange, setPasswordChange] = useState("");
    const [confirmPasswordChange, setConfirmPasswordChange] = useState("");

    return (
        <div
            className="form-change-password-overlay"
            onClick={closeForm}
        >
            <div
                className="form-change-password-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="form-change-password-header">
                    <div className="form-change-password-header-content">
                        <div className="form-change-password-header-left">
                            <div className="form-change-password-icon-box">
                                <i className="bi bi-lock"></i>
                            </div>
                            <div className="form-change-password-header-title">
                                <h4>Đổi mật khẩu</h4>
                                <small>Cập nhật mật khẩu bảo mật</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-change-password-close-btn"
                            onClick={closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="form-change-password-body">
                    <form>
                        <div className="form-change-password-group">
                            <label className="form-change-password-label">
                                <i className="bi bi-key"></i>
                                Mật khẩu hiện tại
                            </label>
                            <input
                                type="password"
                                value={password}
                                className="form-change-password-input"
                                placeholder="Nhập mật khẩu hiện tại"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-change-password-group">
                            <label className="form-change-password-label">
                                <i className="bi bi-shield-lock"></i>
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                value={passwordChange}
                                className="form-change-password-input"
                                placeholder="Nhập mật khẩu mới"
                                onChange={(e) => setPasswordChange(e.target.value)}
                            />
                        </div>

                        <div className="form-change-password-group">
                            <label className="form-change-password-label">
                                <i className="bi bi-check-circle"></i>
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                value={confirmPasswordChange}
                                className="form-change-password-input"
                                placeholder="Nhập lại mật khẩu mới"
                                onChange={(e) => setConfirmPasswordChange(e.target.value)}
                            />
                        </div>

                        <div className="form-change-password-actions">
                            <button
                                type="button"
                                className="form-change-password-btn-cancel"
                                onClick={closeForm}
                            >
                                <i className="bi bi-x-circle"></i>
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="form-change-password-btn-submit"
                                onClick={() =>
                                    handleChangePassword(
                                        password,
                                        passwordChange,
                                        confirmPasswordChange,
                                    )
                                }
                            >
                                <i className="bi bi-check-circle"></i>
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormChangePassword;

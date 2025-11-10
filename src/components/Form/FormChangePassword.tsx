import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";

interface SetVari {
    closeForm: () => void;
    handleChangePassword: (
        password: string,
        passwordChange: string,
        confirmPasswordChange: string,
    ) => void;
}

const ChangePassword: React.FC<SetVari> = (props) => {
    const themeContext = useContext(ThemeContext);

    const [password, setPassword] = useState("");
    const [passwordChange, setPasswordChange] = useState("");
    const [confirmPasswordChange, setConfirmPasswordChange] = useState("");

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
            <div className="card shadow" style={{ width: "400px" }}>
                <div className="card-header bg-primary text-white text-center">
                    <h5 className="mb-0">Đổi mật khẩu</h5>
                </div>
                <div className={`card-body ${themeContext.theme}`}>
                    <form>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    className="form-control"
                                    placeholder="Mật khẩu hiện tại"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Mật khẩu mới
                                </label>
                                <input
                                    className="form-control"
                                    placeholder="Mật khẩu mới"
                                    type="password"
                                    onChange={(e) =>
                                        setPasswordChange(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    className="form-control"
                                    placeholder="Mật khẩu xác nhận"
                                    type="password"
                                    onChange={(e) =>
                                        setConfirmPasswordChange(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={props.closeForm}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                    props.handleChangePassword(
                                        password,
                                        passwordChange,
                                        confirmPasswordChange,
                                    )
                                }
                            >
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;

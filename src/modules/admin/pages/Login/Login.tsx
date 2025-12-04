import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import "./Login.css";
import { logAdminAction } from "../../../../hooks/logAdminAction";
import { logUserAction } from "../../../../hooks/logUserAction";
import { showNotification } from "../../../../utils/notification";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const themeContext = useContext(ThemeContext);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/login", {
                username,
                password,
            });

            if (res.data) {
                if (res.data.statusCheck == true) {
                    if (res.data.role == "admin" || res.data.role == "superadmin") {
                        localStorage.setItem("username_admin", res.data.username);
                        localStorage.setItem("password_admin", res.data.password);
                        localStorage.setItem("role", res.data.role);
                        logAdminAction("Đăng nhập hệ thống");
                        navigate("/Dashboard");
                    }
                    if (res.data.role == "user") {
                        localStorage.setItem("username_user", res.data.username);
                        localStorage.setItem("password_user", res.data.password);
                        localStorage.setItem("role", res.data.role);
                        logUserAction("Người dùng đăng nhập");
                        navigate("/Store");
                    }
                } else {
                    showNotification("Sai tài khoản hoặc mật khẩu");
                }
            } else {
                showNotification("Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            showNotification("Lỗi kết nối server");
        }
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showNotification("Mật khẩu xác nhận không khớp!");
            return;
        }

        const res = await axios.post("http://localhost:5000/api/register", {
            username,
            password
        });

        if (res.data.status) {
            showNotification("Đăng ký thành công! Vui lòng đăng nhập.");
            setIsRegister(false);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        } else {
            showNotification(res.data.message || "Đăng ký thất bại");
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className={`Login ${themeContext.theme}`}>
            <div className="background-login">
                <div className="login-box">
                    <div className="navbar">{isRegister ? "Đăng Ký" : "Đăng Nhập"}</div>
                    <div className="content">
                        <h2>{isRegister ? "Tạo tài khoản mới" : "Chào mừng bạn đến với Aero Tech!"}</h2>
                        <p>{isRegister ? "Điền thông tin bên dưới" : "Vui lòng đăng nhập để tiếp tục"}</p>

                        <form>
                            <label>Tên người dùng</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Nhập tên người dùng"
                            />

                            <label>Mật khẩu</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />

                            {isRegister && (
                                <>
                                    <label>Xác nhận mật khẩu</label>
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                </>
                            )}

                            <div className="btn-group">
                                <button
                                    type="submit"
                                    onClick={isRegister ? handleRegister : handleLogin}
                                    className="btn btn-login"
                                >
                                    {isRegister ? "Đăng Ký" : "Đăng Nhập"}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-cancel"
                                    onClick={() => {
                                        setUsername("");
                                        setPassword("");
                                        setConfirmPassword("");
                                    }}
                                >
                                    Xóa
                                </button>
                            </div>

                            <div className="text-center mt-3">
                                <span
                                    className="toggle-link"
                                    onClick={toggleMode}
                                    style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}
                                >
                                    {isRegister ? "Đã có tài khoản? Đăng nhập ngay" : "Chưa có tài khoản? Đăng ký ngay"}
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

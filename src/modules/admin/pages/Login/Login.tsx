import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const themeContext = useContext(ThemeContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/api/login", {
            username,
            password,
        });

        if (res.data) {
            if (res.data.statusCheck == true) {
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("password", res.data.password);
                navigate("/Dashboard");
            } else {
                alert("sai tai khoan va mat khau");
            }
        } else {
            alert("sai tai khoan va mat khau");
        }
    };

    return (
        <div className={`Login ${themeContext.theme}`}>
            <div className="background-login">
                <div className="login-box">
                    <div className="navbar">Đăng nhập</div>
                    <div className="content">
                        <h2>Chào mừng bạn đến với Store Manager!</h2>
                        <p>Vui lòng đăng nhập để tiếp tục</p>

                        <form>
                            <label>Tên người dùng</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Nhập tên người dùng"
                            />

                            <label>Mật khẩu</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />

                            <div className="btn-group">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="btn btn-login"
                                >
                                    Đăng nhập
                                </button>
                                <button type="reset" className="btn btn-cancel">
                                    Xóa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

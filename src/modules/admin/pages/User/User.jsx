import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import { useEffect, useState, useContext } from "react";
import FormChangePassword from "../../components/Form/FormChangePassword/FormChangePassword";
import FormEditProfile from "../../components/Form/FormEditProfile/FormEditProfile";
import axios from "axios";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { checkLogin } from "../../../../hooks/checkLogin";

const User = () => {
    checkLogin();

    const themeContext = useContext(ThemeContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [position, setPosition] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const getDataAccount = async () => {
            const username = localStorage.getItem("username") || "";
            const password = localStorage.getItem("password") || "";

            const res = await axios.post(
                "http://localhost:5000/api/users_detail",
                {
                    username: username,
                }
            );
            const profile = res.data[0];
            setFullname(profile.fullname);
            setGender(profile.gender);
            setBirthday(profile.birthday.slice(0, 10));
            setPosition(profile.position);
            setPhoneNumber(profile.phone_number);
            setEmail(profile.email);

            setUsername(username);
            setPassword(password);
        };
        getDataAccount();
    }, []);

    async function resetData() {
        console.log("123");
        const username = localStorage.getItem("username") || "";
        const password = localStorage.getItem("password") || "";
        const res = await axios.post("http://localhost:5000/api/users_detail", {
            username: username,
        });
        const profile = res.data[0];
        setFullname(profile.fullname);
        setGender(profile.gender);
        setBirthday(profile.birthday.slice(0, 10));
        setPosition(profile.position);
        setPhoneNumber(profile.phone_number);
        setEmail(profile.email);

        setUsername(username);
        setPassword(password);
    }

    const [changePasswordStatus, setChangePasswordStatus] = useState(false);

    const [editProfileStatus, setEditProfileStatus] = useState(false);

    const closeForm = (type) => {
        switch (type) {
            case "pass":
                setChangePasswordStatus(false);
                break;
            case "profile":
                setEditProfileStatus(false);
                break;
        }
    };

    const handleEdit = async (
        fullname,
        gender,
        birthday,
        position,
        phoneNumber,
        email
    ) => {
        const res = await axios.post("http://localhost:5000/api/user/fix", {
            username: localStorage.getItem("username"),
            fullname: fullname,
            gender: gender,
            birthday: birthday,
            position: position,
            phoneNumber: phoneNumber,
            email: email,
        });
        closeForm("profile");
        resetData();
    };

    const handleChangePassword = async (
        password,
        passwordChange,
        confirmPasswordChange,
    ) => {
        const username = localStorage.getItem("username");
        const res = await axios.post("http://localhost:5000/api/findUser", {
            username: username,
            password: password,
        });
        if (res.data.status == false) {
            alert("sai mat khau");
            return;
        } else {
            if (passwordChange != confirmPasswordChange) {
                alert("xac nhan mat khau sai");
            } else {
                const res = await axios.post(
                    "http://localhost:5000/api/user/change_password",
                    { passwordChange: passwordChange, username: username }
                );
                if (res.data.status == true) {
                    let passStar = "";
                    for (let i = 0; i < passwordChange.length; i++) {
                        passStar += "*";
                    }
                    localStorage.setItem("password", passStar);
                    closeForm("pass");
                    resetData();
                }
            }
        }
    };

    const changeAvatar = (file) => {
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl);
        setImage(imageUrl);
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={""} />
            <div
                className={`flex-grow-1 ${themeContext.theme}`}
                style={{
                    background: "white",
                    minHeight: "100vh",
                }}
            >
                <Header name={"Hồ sơ nhân viên"} />
                <div className="p-4">
                    <div className="row mb-4 align-items-center">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6 text-md-end">
                            <button
                                className="btn btn-lg shadow-sm"
                                style={{
                                    background: "#0d6efd",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "12px",
                                    padding: "12px 30px",
                                    fontWeight: "600",
                                    transition: "all 0.3s",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 5px 20px rgba(33,150,243,0.4)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                onClick={() => setEditProfileStatus(true)}
                            >
                                <i className="bi bi-pencil-square me-2"></i>
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div
                                className="card border-0 shadow-sm"
                                style={{ borderRadius: "20px", overflow: "hidden" }}
                            >
                                <div
                                    style={{
                                        height: "150px",
                                        background: "#0d6efd",
                                    }}
                                ></div>

                                <div className="card-body text-center" style={{ marginTop: "-75px" }}>
                                    <div className="position-relative d-inline-block mb-3">
                                        <div
                                            className="border border-4 border-white shadow-lg"
                                            style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                background: "#0d6efd",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {image ? (
                                                <img
                                                    src={image}
                                                    alt="Avatar"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            ) : (
                                                <i
                                                    className="bi bi-person-fill"
                                                    style={{ fontSize: "4rem", color: "white" }}
                                                ></i>
                                            )}
                                        </div>
                                        <label
                                            htmlFor="avatarUpload"
                                            className="position-absolute border border-3 border-primary bg-white shadow"
                                            style={{
                                                bottom: "5px",
                                                right: "5px",
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                transition: "all 0.3s",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.background = "#2196F3";
                                                const icon = e.currentTarget.querySelector("i");
                                                if (icon) (icon).style.color = "white";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.background = "white";
                                                const icon = e.currentTarget.querySelector("i");
                                                if (icon) (icon).style.color = "#2196F3";
                                            }}
                                        >
                                            <i className="bi bi-camera" style={{ color: "#2196F3" }}></i>
                                        </label>
                                        <input
                                            id="avatarUpload"
                                            type="file"
                                            accept="image/*"
                                            className="d-none"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (!files) return;
                                                const file = files[0];
                                                changeAvatar(file);
                                            }}
                                        />
                                    </div>

                                    <h3 className="fw-bold mb-1">{fullname || "Chưa cập nhật"}</h3>
                                    <p className="text-primary fw-semibold mb-2">
                                        {position || "Chưa có vị trí"}
                                    </p>
                                    <p className="text-muted small mb-3">
                                        <i className="bi bi-person-badge me-1"></i>
                                        {username}
                                    </p>

                                    <div className="mb-4">
                                        <span
                                            className="d-inline-flex align-items-center gap-2 px-4 py-2 border border-2"
                                            style={{
                                                background: "#C8E6C9",
                                                borderColor: "#81C784",
                                                borderRadius: "50px",
                                                fontWeight: "600",
                                                color: "#2E7D32",
                                            }}
                                        >
                                            <span
                                                className="d-inline-block"
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    background: "#4CAF50",
                                                    borderRadius: "50%",
                                                    animation: "pulse 2s infinite",
                                                }}
                                            ></span>
                                            Đang hoạt động
                                        </span>
                                    </div>

                                    <div className="row g-3 mb-4">
                                        <div className="col-6">
                                            <div
                                                className="p-3 text-center"
                                                style={{
                                                    background: "#e7f1ff",
                                                    borderRadius: "15px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.transform = "translateY(-5px)";
                                                    e.currentTarget.style.boxShadow = "0 5px 20px rgba(33,150,243,0.3)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                <i
                                                    className="bi bi-building"
                                                    style={{ fontSize: "2rem", color: "#0d6efd" }}
                                                ></i>
                                                <p className="small text-muted mb-1 mt-2">Phòng ban</p>
                                                <p className="fw-bold mb-0">Quản lý</p>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div
                                                className="p-3 text-center"
                                                style={{
                                                    background: "#e7f1ff",
                                                    borderRadius: "15px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.transform = "translateY(-5px)";
                                                    e.currentTarget.style.boxShadow = "0 5px 20px rgba(33,150,243,0.3)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                <i
                                                    className="bi bi-shield-check"
                                                    style={{ fontSize: "2rem", color: "#2196F3" }}
                                                ></i>
                                                <p className="small text-muted mb-1 mt-2">Quyền hạn</p>
                                                <p className="fw-bold mb-0">Quản lý</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-danger w-100"
                                        style={{
                                            borderRadius: "12px",
                                            padding: "12px",
                                            fontWeight: "600",
                                        }}
                                        onClick={() => setChangePasswordStatus(true)}
                                    >
                                        <i className="bi bi-lock me-2"></i>
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div
                                className="card"
                                style={{ borderRadius: "20px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                            >
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-4">
                                        <i className="bi bi-person-lines-fill text-primary me-2"></i>
                                        Thông tin chi tiết
                                    </h4>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div
                                                className="p-3 h-100"
                                                style={{
                                                    background: "#F5F5F5",
                                                    borderRadius: "12px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#EEEEEE";
                                                    e.currentTarget.style.transform = "translateX(5px)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "#F5F5F5";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#0d6efd",
                                                            borderRadius: "12px",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i className="bi bi-person" style={{ fontSize: "1.2rem" }}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <small className="text-muted d-block mb-1">Họ và tên</small>
                                                        <strong>{fullname || "Chưa cập nhật"}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div
                                                className="p-3 h-100"
                                                style={{
                                                    background: "#F5F5F5",
                                                    borderRadius: "12px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#EEEEEE";
                                                    e.currentTarget.style.transform = "translateX(5px)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "#F5F5F5";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#0d6efd",
                                                            borderRadius: "12px",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i className="bi bi-gender-ambiguous" style={{ fontSize: "1.2rem" }}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <small className="text-muted d-block mb-1">Giới tính</small>
                                                        <strong>{gender || "Chưa cập nhật"}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div
                                                className="p-3 h-100"
                                                style={{
                                                    background: "#F5F5F5",
                                                    borderRadius: "12px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#EEEEEE";
                                                    e.currentTarget.style.transform = "translateX(5px)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "#F5F5F5";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#0d6efd",
                                                            borderRadius: "12px",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i className="bi bi-calendar" style={{ fontSize: "1.2rem" }}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <small className="text-muted d-block mb-1">Ngày sinh</small>
                                                        <strong>
                                                            {birthday
                                                                ? new Date(birthday).toLocaleDateString("vi-VN")
                                                                : "Chưa cập nhật"}
                                                        </strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div
                                                className="p-3 h-100"
                                                style={{
                                                    background: "#F5F5F5",
                                                    borderRadius: "12px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#EEEEEE";
                                                    e.currentTarget.style.transform = "translateX(5px)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "#F5F5F5";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#0d6efd",
                                                            borderRadius: "12px",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i className="bi bi-briefcase" style={{ fontSize: "1.2rem" }}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <small className="text-muted d-block mb-1">Vị trí làm việc</small>
                                                        <strong>{position || "Chưa cập nhật"}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div
                                                className="p-3 h-100"
                                                style={{
                                                    background: "#F5F5F5",
                                                    borderRadius: "12px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#EEEEEE";
                                                    e.currentTarget.style.transform = "translateX(5px)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "#F5F5F5";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#0d6efd",
                                                            borderRadius: "12px",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i className="bi bi-telephone" style={{ fontSize: "1.2rem" }}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <small className="text-muted d-block mb-1">Số điện thoại</small>
                                                        <strong>{phoneNumber || "Chưa cập nhật"}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div
                                                className="p-3 h-100"
                                                style={{
                                                    background: "#F5F5F5",
                                                    borderRadius: "12px",
                                                    transition: "all 0.3s",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = "#EEEEEE";
                                                    e.currentTarget.style.transform = "translateX(5px)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = "#F5F5F5";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#0d6efd",
                                                            borderRadius: "12px",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i className="bi bi-envelope" style={{ fontSize: "1.2rem" }}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <small className="text-muted d-block mb-1">Email</small>
                                                        <strong>{email || "Chưa cập nhật"}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Account Information Section */}
                                    <div
                                        className="mt-4 p-4"
                                        style={{
                                            background: "#e7f1ff",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <h5 className="fw-bold mb-3">
                                            <i className="bi bi-shield-lock text-primary me-2"></i>
                                            Thông tin tài khoản
                                        </h5>
                                        <div className="row">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <div>
                                                    <span className="text-muted small">Tên đăng nhập:</span>
                                                    <div className="fw-bold">{username}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div>
                                                    <span className="text-muted small">Mật khẩu:</span>
                                                    <div className="font-monospace fw-bold text-secondary">{password}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {changePasswordStatus && (
                    <FormChangePassword
                        closeForm={() => closeForm("pass")}
                        handleChangePassword={handleChangePassword}
                    />
                )}

                {editProfileStatus && (
                    <FormEditProfile
                        closeForm={() => closeForm("profile")}
                        handleEdit={handleEdit}
                        fullname={fullname}
                        gender={gender}
                        birthday={birthday}
                        position={position}
                        phoneNumber={phoneNumber}
                        email={email}
                    />
                )}
            </div>

            <style>{`
                @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default User;
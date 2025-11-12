import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";

interface SetVari {
    closeForm: () => void;
    handleEdit: (
        fullname: string,
        gender: string,
        birthday: string,
        position: string,
        phoneNumber: string,
        email: string,
    ) => void;
    fullname: string;
    gender: string;
    birthday: string;
    position: string;
    phoneNumber: string;
    email: string;
}

const FormEditProfile: React.FC<SetVari> = (props) => {
    const themeContext = useContext(ThemeContext);

    const [fullname, setFullname] = useState(props.fullname);
    const [gender, setGender] = useState(props.gender);
    const [birthday, setBirthday] = useState(props.birthday.slice(0, 10));
    const [position, setPosition] = useState(props.position);
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
    const [email, setEmail] = useState(props.email);

    return (
        <>
            <style>{`
                @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>

            <div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{
                    background: "rgba(128, 128, 128, 0.5)",
                    backdropFilter: "none",
                    zIndex: 1050,
                    animation: "fadeIn 0.3s ease-out",
                }}
                onClick={props.closeForm}
            >
                <div
                    className="card border-0"
                    style={{
                        width: "500px",
                        maxWidth: "95%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        borderRadius: "20px",
                        animation: "slideIn 0.4s ease-out",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div
                        className="card-header text-white border-0 position-relative"
                        style={{
                            background: "#0d6efd",
                            borderRadius: "20px 20px 0 0",
                            padding: "1.5rem",
                        }}
                    >
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        background: "rgba(255, 255, 255, 0.2)",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <i className="bi bi-person-gear" style={{ fontSize: "1.5rem" }}></i>
                                </div>
                                <div>
                                    <h4 className="mb-0 fw-bold">Chỉnh sửa thông tin</h4>
                                    <small style={{ opacity: 0.9 }}>Cập nhật hồ sơ cá nhân</small>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={props.closeForm}
                                style={{
                                    fontSize: "0.9rem",
                                    opacity: 0.8,
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.opacity = "1";
                                    e.currentTarget.style.transform = "scale(1.1)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.opacity = "0.8";
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            ></button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className={`card-body ${themeContext.theme}`} style={{ padding: "2rem" }}>
                        <form>
                            {/* Full Name */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    <i className="bi bi-person-circle text-primary me-2"></i>
                                    Họ và tên
                                </label>
                                <div className="position-relative">
                                    <input
                                        value={fullname}
                                        className="form-control form-control-lg border-2"
                                        placeholder="Nhập họ và tên"
                                        style={{
                                            borderRadius: "12px",
                                            paddingLeft: "1rem",
                                            transition: "all 0.3s",
                                        }}
                                        onChange={(e) => setFullname(e.target.value)}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#667eea";
                                            e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "#dee2e6";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Gender and Birthday Row */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark mb-2">
                                        <i className="bi bi-gender-ambiguous text-primary me-2"></i>
                                        Giới tính
                                    </label>
                                    <select
                                        value={gender}
                                        className="form-select form-select-lg border-2"
                                        style={{
                                            borderRadius: "12px",
                                            transition: "all 0.3s",
                                        }}
                                        onChange={(e) => setGender(e.target.value)}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#667eea";
                                            e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "#dee2e6";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <option value="">-- Chọn giới tính --</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark mb-2">
                                        <i className="bi bi-calendar-event text-primary me-2"></i>
                                        Ngày sinh
                                    </label>
                                    <input
                                        value={birthday}
                                        type="date"
                                        className="form-control form-control-lg border-2"
                                        style={{
                                            borderRadius: "12px",
                                            transition: "all 0.3s",
                                        }}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#667eea";
                                            e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "#dee2e6";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Position */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    <i className="bi bi-briefcase text-primary me-2"></i>
                                    Vị trí làm việc
                                </label>
                                <select
                                    value={position}
                                    className="form-select form-select-lg border-2"
                                    style={{
                                        borderRadius: "12px",
                                        transition: "all 0.3s",
                                    }}
                                    onChange={(e) => setPosition(e.target.value)}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#667eea";
                                        e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#dee2e6";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <option value="">-- Chọn vị trí làm việc --</option>
                                    <option value="Nhân viên thu ngân">Nhân viên thu ngân</option>
                                    <option value="Nhân viên CSKH">Nhân viên CSKH</option>
                                    <option value="Quản lí">Quản lí</option>
                                </select>
                            </div>

                            {/* Phone Number */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    <i className="bi bi-telephone text-primary me-2"></i>
                                    Số điện thoại
                                </label>
                                <div className="position-relative">
                                    <input
                                        value={phoneNumber}
                                        className="form-control form-control-lg border-2"
                                        placeholder="Nhập số điện thoại"
                                        style={{
                                            borderRadius: "12px",
                                            paddingLeft: "1rem",
                                            transition: "all 0.3s",
                                        }}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#667eea";
                                            e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "#dee2e6";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    <i className="bi bi-envelope text-primary me-2"></i>
                                    Email
                                </label>
                                <div className="position-relative">
                                    <input
                                        value={email}
                                        type="email"
                                        className="form-control form-control-lg border-2"
                                        placeholder="Nhập email"
                                        style={{
                                            borderRadius: "12px",
                                            paddingLeft: "1rem",
                                            transition: "all 0.3s",
                                        }}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#667eea";
                                            e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "#dee2e6";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Info Box */}

                            {/* Action Buttons */}                            {/* Action Buttons */}
                            <div className="d-flex gap-3 justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-lg px-4"
                                    style={{
                                        borderRadius: "12px",
                                        background: "#f8f9fa",
                                        border: "2px solid #dee2e6",
                                        color: "#6c757d",
                                        fontWeight: "600",
                                        transition: "all 0.3s",
                                    }}
                                    onClick={props.closeForm}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = "#e9ecef";
                                        e.currentTarget.style.borderColor = "#adb5bd";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = "#f8f9fa";
                                        e.currentTarget.style.borderColor = "#dee2e6";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    <i className="bi bi-x-circle me-2"></i>
                                    Hủy bỏ
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-lg px-4"
                                    style={{
                                        background: "#0d6efd",
                                        border: "none",
                                        color: "white",
                                        borderRadius: "12px",
                                        fontWeight: "600",
                                        transition: "all 0.3s",
                                    }}
                                    onClick={() =>
                                        props.handleEdit(
                                            fullname,
                                            gender,
                                            birthday,
                                            position,
                                            phoneNumber,
                                            email,
                                        )
                                    }
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 5px 20px rgba(102, 126, 234, 0.4)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <i className="bi bi-check-circle me-2"></i>
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormEditProfile;
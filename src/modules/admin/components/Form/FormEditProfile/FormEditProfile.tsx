import { useState, useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeProvider";
import "./FormEditProfile.css";

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
        <div
            className="form-edit-profile-overlay"
            onClick={props.closeForm}
        >
            <div
                className="form-edit-profile-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="form-edit-profile-header">
                    <div className="form-edit-profile-header-content">
                        <div className="form-edit-profile-header-left">
                            <div className="form-edit-profile-icon-box">
                                <i className="bi bi-person-gear"></i>
                            </div>
                            <div className="form-edit-profile-header-title">
                                <h4>Chỉnh sửa thông tin</h4>
                                <small>Cập nhật hồ sơ cá nhân</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-edit-profile-close-btn"
                            onClick={props.closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className={`form-edit-profile-body ${themeContext.theme}`}>
                    <form>
                        <div className="form-edit-profile-group">
                            <label className="form-edit-profile-label">
                                <i className="bi bi-person-circle"></i>
                                Họ và tên
                            </label>
                            <input
                                value={fullname}
                                className="form-edit-profile-input"
                                placeholder="Nhập họ và tên"
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>

                        <div className="form-edit-profile-group-row">
                            <div>
                                <label className="form-edit-profile-label">
                                    <i className="bi bi-gender-ambiguous"></i>
                                    Giới tính
                                </label>
                                <select
                                    value={gender}
                                    className="form-edit-profile-select"
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">-- Chọn giới tính --</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>

                            <div>
                                <label className="form-edit-profile-label">
                                    <i className="bi bi-calendar-event"></i>
                                    Ngày sinh
                                </label>
                                <input
                                    value={birthday}
                                    type="date"
                                    className="form-edit-profile-input"
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-edit-profile-group">
                            <label className="form-edit-profile-label">
                                <i className="bi bi-briefcase"></i>
                                Vị trí làm việc
                            </label>
                            <select
                                value={position}
                                className="form-edit-profile-select"
                                onChange={(e) => setPosition(e.target.value)}
                            >
                                <option value="">-- Chọn vị trí làm việc --</option>
                                <option value="Nhân viên thu ngân">Nhân viên thu ngân</option>
                                <option value="Nhân viên CSKH">Nhân viên CSKH</option>
                                <option value="Quản lí">Quản lí</option>
                            </select>
                        </div>

                        <div className="form-edit-profile-group">
                            <label className="form-edit-profile-label">
                                <i className="bi bi-telephone"></i>
                                Số điện thoại
                            </label>
                            <input
                                value={phoneNumber}
                                className="form-edit-profile-input"
                                placeholder="Nhập số điện thoại"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="form-edit-profile-group">
                            <label className="form-edit-profile-label">
                                <i className="bi bi-envelope"></i>
                                Email
                            </label>
                            <input
                                value={email}
                                type="email"
                                className="form-edit-profile-input"
                                placeholder="Nhập email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-edit-profile-actions">
                            <button
                                type="button"
                                className="form-edit-profile-btn-cancel"
                                onClick={props.closeForm}
                            >
                                <i className="bi bi-x-circle"></i>
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="form-edit-profile-btn-submit"
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

export default FormEditProfile;
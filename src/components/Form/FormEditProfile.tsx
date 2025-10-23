import { useState } from "react";

interface SetVari {
    closeForm: () => void;
    handleEdit: (fullname: string, gerder: string, birthday: string, position: string, phoneNumber: string, email: string) => void
    fullname: string
    gender: string
    birthday: string
    position: string
    phoneNumber: string
    email: string
}


const FormEditProfile: React.FC<SetVari> = (props) => {

    const [fullname, setFullname] = useState(props.fullname)
    const [gender, setGender] = useState(props.gender)
    const [birthday, setBirthday] = useState(props.birthday.slice(0,1))
    const [position, setPosition] = useState(props.position)
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
    const [email, setEmail] = useState(props.email)  
 
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
            <div className="card shadow" style={{ width: "400px" }}>
                <div className="card-header bg-primary text-white text-center">
                    <h5 className="mb-0">Chỉnh sửa thông tin</h5>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">Họ và tên</label>
                                <input
                                    value={fullname}
                                    className="form-control"
                                    placeholder="Nhập họ và tên"
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                                
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giới tính</label>
                                <select value={gender} name="" id="" className="form-control" onChange={(e) => setGender(e.target.value)}>
                                    <option value="">--Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày sinh</label>
                                <input
                                    value={birthday}
                                    type="date"
                                    className="form-control"
                                    placeholder="Nhập ngày sinh"
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Vị trí làm việc
                                </label>
                                <select value={position} name="" id="" className="form-control" onChange={(e) => setPosition(e.target.value)}>
                                    <option value="">--Vị trí làm việc</option>
                                    <option value="Nhân viên thu ngân">Nhân viên thu ngân</option>
                                    <option value="Nhân viên CSKH">Nhân viên CSKH</option>
                                    <option value="Quản lí">Quản lí</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số điện thoại</label>
                                <input
                                    value={phoneNumber}
                                    className="form-control"
                                    placeholder="Nhập số điện thoại"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    value={email}
                                    className="form-control"
                                    placeholder="Nhập email"
                                    onChange={(e) => setEmail(e.target.value)}
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
                            <button type="button" className="btn btn-primary" onClick={() => props.handleEdit(fullname,gender,birthday,position,phoneNumber, email)}>
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

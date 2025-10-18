interface SetVari {
    closeForm: () => void;
}


const FormEditProfile: React.FC<SetVari> = (props) => {
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
                                    className="form-control"
                                    placeholder="Nhập họ và tên"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giới tính</label>
                                <select name="" id="" className="form-control">
                                    <option value="">--Chọn giới tính</option>
                                    <option value="0">Nam</option>
                                    <option value="1">Nữ</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày sinh</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Nhập ngày sinh"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Vị trí làm việc
                                </label>
                                <select name="" id="" className="form-control">
                                    <option value="">--Vị trí làm việc</option>
                                    <option value="Nhân viên thu ngân">Nhân viên thu ngân</option>
                                    <option value="Nhân viên CSKH">Nhân viên CSKH</option>
                                    <option value="Quản lí">Quản lí</option>
                                </select>
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
                            <button type="button" className="btn btn-primary">
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormEditProfile;

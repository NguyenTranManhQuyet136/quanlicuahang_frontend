interface SetVari {
    closeForm: () => void;
}

const ChangePassword: React.FC<SetVari> = (props) => {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
            <div className="card shadow" style={{ width: "400px" }}>
                <div className="card-header bg-primary text-white text-center">
                    <h5 className="mb-0">Đổi mật khẩu</h5>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    className="form-control"
                                    placeholder="Mật khẩu hiện tại"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Mật khẩu mới
                                </label>
                                <input
                                    className="form-control"
                                    placeholder="Mật khẩu mới"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    className="form-control"
                                    placeholder="Mật khẩu xác nhận"
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

export default ChangePassword;

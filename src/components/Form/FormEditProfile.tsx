const FormEditProfile = () => {
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
                <label className="form-label">Họ và tên</label>
                <input className="form-control" placeholder="Họ và tên" />  
                </div>
                <div className="mb-3">
                <label className="form-label">Giới tính</label>
                <input className="form-control" placeholder="Giới tính"/>
                </div>
                <div className="mb-3">
                <label className="form-label">Ngày sinh</label>
                <input className="form-control" placeholder="Mật khẩu xác nhận"/>
                </div>
                <div className="mb-3">
                <label className="form-label">Vị trí làm việc</label>
                <input className="form-control" placeholder="Mật khẩu xác nhận"/>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-secondary me-2"
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
}
 
export default FormEditProfile;
const FormRemove = (props) => {
    return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h5 className="text-center text-danger mb-3 fw-bold">Xác nhận xóa</h5>
        <p className="text-center">
          Bạn có chắc muốn xóa {props.type} 
          <span className="fw-semibold text-primary"> {props.name}</span> không?
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button type="button" className="btn btn-secondary px-4" onClick={props.closeForm}>
            Hủy
          </button>
          <button type="button" className="btn btn-danger px-4" onClick={props.handleRemove}> 
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default FormRemove;
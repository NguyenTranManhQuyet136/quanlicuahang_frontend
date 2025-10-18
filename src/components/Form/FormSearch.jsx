import { useState } from "react";

const FormSearch = (props) => {
    const [dataForm, setDataForm] = useState({});

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
            <div className="card shadow" style={{ width: "400px" }}>
                <div className="card-header bg-primary text-white text-center">
                    <h5 className="mb-0">Tìm kiếm {props.typeData}</h5>
                </div>
                <div className="card-body">
                    <form>
                        {props.colInfo.map((col) => (
                            <div className="mb-3" key={col.key}>
                                <label className="form-label">
                                    {col.label}
                                </label>
                                {col.type != "select" ? (
                                    <input
                                        type={col.type}
                                        className="form-control"
                                        placeholder={
                                            "Nhập " + col.label.toLowerCase()
                                        }
                                        onChange={(e) =>
                                            setDataForm((prev) => ({
                                                ...prev,
                                                [col.key]: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <select
                                        className="form-select"
                                        onChange={(e) =>
                                            setDataForm((prev) => ({
                                                ...prev,
                                                [col.key]: e.target.value,
                                            }))
                                        }
                                    >
                                        {col.options?.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}

                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={props.closeForm}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    props.handleSearch(dataForm);
                                }}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormSearch;

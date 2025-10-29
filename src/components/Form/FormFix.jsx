import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";

const FormFix = (props) => {
    const themeContext = useContext(ThemeContext)

    const idOld = props.dataFix.id;
    const [dataForm, setDataForm] = useState(props.dataFix);

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
            <div className="card shadow" style={{ width: "400px" }}>
                <div className="card-header bg-primary text-white text-center">
                    <h5 className="mb-0">Sửa {props.typeData}</h5>
                </div>
                <div className={`card-body ${themeContext.theme}`}>
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
                                        value={dataForm[col.key]}
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
                                        value={dataForm[col.key]}
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

                        <div
                            type="button"
                            className="d-flex justify-content-end"
                        >
                            <button
                                className="btn btn-secondary me-2"
                                onClick={props.closeForm}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => props.handleFix(dataForm, idOld)}
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

export default FormFix;

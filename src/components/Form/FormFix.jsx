import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { FiEdit2 } from "react-icons/fi";

const FormFix = (props) => {
    const themeContext = useContext(ThemeContext);
    const idOld = props.dataFix.id;
    const [dataForm, setDataForm] = useState(props.dataFix);

    return (
        <>
            <style>{`
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

            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(128, 128, 128, 0.5)", backdropFilter: "none", zIndex: 1050, animation: "fadeIn 0.3s ease-out" }} onClick={props.closeForm}>
                <div style={{ width: "500px", maxWidth: "95%", maxHeight: "90vh", overflowY: "auto", borderRadius: "20px", animation: "slideIn 0.4s ease-out", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)", background: "#fff" }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ background: "#0d6efd", borderRadius: "20px 20px 0 0", padding: "1.5rem", color: "#fff", borderBottom: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "50px", height: "50px", background: "rgba(255, 255, 255, 0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FiEdit2 size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: 0, fontWeight: "bold" }}>Sửa {props.typeData}</h4>
                                    <small style={{ opacity: 0.9 }}>Cập nhật thông tin {props.typeData}</small>
                                </div>
                            </div>
                            <button type="button" style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer", opacity: 0.8, transition: "all 0.3s" }} onClick={props.closeForm} onMouseOver={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }} onMouseOut={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "scale(1)"; }}>✕</button>
                        </div>
                    </div>

                    <div className={themeContext.theme} style={{ padding: "2rem" }}>
                        <form>
                            {props.colInfo.map((col) => (
                                <div style={{ marginBottom: "1.5rem" }} key={col.key}>
                                    <label style={{ display: "block", fontWeight: "600", color: "#212529", marginBottom: "0.5rem" }}>
                                        {col.label}
                                    </label>
                                    {col.type !== "select" ? (
                                        <input
                                            type={col.type}
                                            placeholder={"Nhập " + col.label.toLowerCase()}
                                            value={dataForm[col.key]}
                                            style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #dee2e6", borderRadius: "12px", fontSize: "1rem", transition: "all 0.3s", fontFamily: "inherit" }}
                                            onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                            onFocus={(e) => { e.currentTarget.style.borderColor = "#667eea"; e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)"; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = "#dee2e6"; e.currentTarget.style.boxShadow = "none"; }}
                                        />
                                    ) : (
                                        <select
                                            value={dataForm[col.key]}
                                            style={{ width: "100%", padding: "0.75rem 1rem", border: "2px solid #dee2e6", borderRadius: "12px", fontSize: "1rem", transition: "all 0.3s", fontFamily: "inherit" }}
                                            onChange={(e) => setDataForm((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                            onFocus={(e) => { e.currentTarget.style.borderColor = "#667eea"; e.currentTarget.style.boxShadow = "0 0 0 0.2rem rgba(102, 126, 234, 0.25)"; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = "#dee2e6"; e.currentTarget.style.boxShadow = "none"; }}
                                        >
                                            <option value="">-- Chọn {col.label.toLowerCase()} --</option>
                                            {col.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}

                            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "2rem" }}>
                                <button
                                    type="button"
                                    style={{ borderRadius: "12px", background: "#f8f9fa", border: "2px solid #dee2e6", color: "#6c757d", fontWeight: "600", padding: "0.75rem 1.5rem", fontSize: "1rem", cursor: "pointer", transition: "all 0.3s" }}
                                    onClick={props.closeForm}
                                    onMouseOver={(e) => { e.currentTarget.style.background = "#e9ecef"; e.currentTarget.style.borderColor = "#adb5bd"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = "#f8f9fa"; e.currentTarget.style.borderColor = "#dee2e6"; e.currentTarget.style.transform = "translateY(0)"; }}
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="button"
                                    style={{ background: "#0d6efd", border: "none", color: "white", borderRadius: "12px", fontWeight: "600", padding: "0.75rem 1.5rem", fontSize: "1rem", cursor: "pointer", transition: "all 0.3s" }}
                                    onClick={() => props.handleFix(dataForm, idOld)}
                                    onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 5px 20px rgba(102, 126, 234, 0.4)"; }}
                                    onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                                >
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

export default FormFix;

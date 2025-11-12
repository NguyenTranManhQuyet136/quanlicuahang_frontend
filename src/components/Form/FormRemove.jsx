import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { FiTrash2 } from "react-icons/fi";

const FormRemove = (props) => {
    const themeContext = useContext(ThemeContext);

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
                    {/* Header */}
                    <div style={{ background: "#dc3545", borderRadius: "20px 20px 0 0", padding: "1.5rem", color: "#fff", borderBottom: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "50px", height: "50px", background: "rgba(255, 255, 255, 0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FiTrash2 size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: 0, fontWeight: "bold" }}>Xác nhận xóa</h4>
                                    <small style={{ opacity: 0.9 }}>Thao tác này không thể hoàn tác</small>
                                </div>
                            </div>
                            <button type="button" style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer", opacity: 0.8, transition: "all 0.3s" }} onClick={props.closeForm} onMouseOver={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }} onMouseOut={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "scale(1)"; }}>✕</button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className={themeContext.theme} style={{ padding: "2rem" }}>
                        <p style={{ fontSize: "1rem", color: "#666", marginBottom: "1.5rem", textAlign: "center" }}>
                            Bạn có chắc muốn xóa <span style={{ fontWeight: "600", color: "#dc3545" }}>{props.name}</span> không?
                        </p>
                        <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "2rem", textAlign: "center" }}>
                            Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống
                        </p>

                        {/* Action Buttons */}
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
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
                                style={{ background: "#dc3545", border: "none", color: "white", borderRadius: "12px", fontWeight: "600", padding: "0.75rem 1.5rem", fontSize: "1rem", cursor: "pointer", transition: "all 0.3s" }}
                                onClick={props.handleRemove}
                                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 5px 20px rgba(220, 53, 69, 0.4)"; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                Xóa ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormRemove;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Menubar from "../../../admin/components/Menubar/Menubar";
import Header from "../../../admin/components/Header/Header";
import { ThemeContext } from "../../../../contexts/ThemeProvider";

const HistoryManager = () => {
    const themeContext = useContext(ThemeContext);
    const [history, setHistory] = useState({ admin: [], user: [] });

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await axios.get("http://localhost:5000/api/superadmin/history/all");
            setHistory(res.data);
        };
        fetchHistory();
    }, []);

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/HistoryManager"} />
            <div className={`flex-grow-1 ${themeContext.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Lịch sử hệ thống"} />
                <div className="p-4">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bg-white rounded shadow-sm overflow-hidden">
                                <div className="p-3 bg-light border-bottom">
                                    <h5 className="mb-0">Lịch sử Admin</h5>
                                </div>
                                <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                                    <table className="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>Thời gian</th>
                                                <th>Người thực hiện</th>
                                                <th>Nội dung</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.admin.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{new Date(item.time).toLocaleString("vi-VN")}</td>
                                                    <td>{item.created_by}</td>
                                                    <td>{item.content}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-white rounded shadow-sm overflow-hidden">
                                <div className="p-3 bg-light border-bottom">
                                    <h5 className="mb-0">Lịch sử User</h5>
                                </div>
                                <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                                    <table className="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>Thời gian</th>
                                                <th>Người thực hiện</th>
                                                <th>Nội dung</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.user.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{new Date(item.time).toLocaleString("vi-VN")}</td>
                                                    <td>{item.created_by}</td>
                                                    <td>{item.content}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryManager;

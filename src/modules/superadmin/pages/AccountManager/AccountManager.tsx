import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Menubar from "../../../admin/components/Menubar/Menubar";
import Header from "../../../admin/components/Header/Header";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { FiTrash2 as FiTrash2Base, FiPlus as FiPlusBase, FiSearch as FiSearchBase, FiRefreshCw as FiRefreshCwBase } from "react-icons/fi";
import FormAdd from "../../../admin/components/Form/FormAdd/FormAdd";
import FormSearch from "../../../admin/components/Form/FormSearch/FormSearch";

const FiTrash2 = FiTrash2Base as any;
const FiPlus = FiPlusBase as any;
const FiSearch = FiSearchBase as any;
const FiRefreshCw = FiRefreshCwBase as any;

interface Account {
    username: string;
    password?: string;
    role: string;
}

interface ColInfo {
    key: string;
    label: string;
    type: string;
    options?: { value: string; label: string }[];
}

const AccountManager: React.FC = () => {
    const themeContext = useContext(ThemeContext);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [filterRole, setFilterRole] = useState<string>("");
    const [addStatus, setAddStatus] = useState<{ status: boolean }>({ status: false });
    const [searchStatus, setSearchStatus] = useState<{ status: boolean }>({ status: false });

    const colInfo: ColInfo[] = [
        { key: "username", label: "Tên đăng nhập", type: "text" },
        { key: "password", label: "Mật khẩu", type: "text" },
        {
            key: "role",
            label: "Vai trò",
            type: "select",
            options: [
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
                { value: "superadmin", label: "Superadmin" }
            ]
        }
    ];

    const colInfoSearch: ColInfo[] = [
        { key: "username", label: "Tên đăng nhập", type: "text" }
    ];

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/accounts");
            setAccounts(res.data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const handleAdd = async (dataAdd: any) => {
        if (!dataAdd.username || !dataAdd.password) return alert("Thiếu thông tin");
        try {
            await axios.post("http://localhost:5000/api/accounts/add", dataAdd);
            fetchAccounts();
            setAddStatus({ status: false });
        } catch (error) {
            console.error("Error adding account:", error);
            alert("Lỗi khi thêm tài khoản");
        }
    };

    const handleRemove = async (username: string) => {
        if (window.confirm("Xóa tài khoản này?")) {
            try {
                await axios.post("http://localhost:5000/api/accounts/remove", { username });
                fetchAccounts();
            } catch (error) {
                console.error("Error removing account:", error);
                alert("Lỗi khi xóa tài khoản");
            }
        }
    };

    const handleSearch = async (dataSearch: any) => {
        try {
            const res = await axios.post("http://localhost:5000/api/accounts/search", { username: dataSearch.username });
            setAccounts(res.data);
            setSearchStatus({ status: false });
        } catch (error) {
            console.error("Error searching accounts:", error);
        }
    };

    const filteredAccounts = filterRole ? accounts.filter(acc => acc.role === filterRole) : accounts;

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/AccountManager"} />
            <div className={`flex-grow-1 ${themeContext?.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Quản lý tài khoản"} />
                <div className="p-4">
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <select
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                                onChange={(e) => setFilterRole(e.target.value)}
                                value={filterRole}
                            >
                                <option value="">Tất cả vai trò</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Superadmin</option>
                            </select>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setSearchStatus({ status: true })}><FiSearch size={18} />Tìm kiếm</button>
                                <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={() => setAddStatus({ status: true })}><FiPlus size={18} />Thêm tài khoản</button>
                                <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#198754", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }} onClick={fetchAccounts}><FiRefreshCw size={18} />Tải lại</button>
                            </div>
                        </div>

                        {addStatus.status && (
                            <FormAdd
                                typeData="tài khoản"
                                colInfo={colInfo}
                                closeForm={() => setAddStatus({ status: false })}
                                handleAdd={handleAdd}
                            />
                        )}

                        {searchStatus.status && (
                            <FormSearch
                                typeData="tài khoản"
                                colInfo={colInfoSearch}
                                closeForm={() => setSearchStatus({ status: false })}
                                handleSearch={handleSearch}
                            />
                        )}
                    </div>

                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th>Username</th>
                                    <th>Mật khẩu</th>
                                    <th>Role</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAccounts.map(acc => (
                                    <tr key={acc.username}>
                                        <td>{acc.username}</td>
                                        <td>{acc.password}</td>
                                        <td>{acc.role}</td>
                                        <td>
                                            <button
                                                style={{
                                                    padding: "6px 10px",
                                                    backgroundColor: "#f8d7da",
                                                    color: "#842029",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    fontWeight: "500",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                }}
                                                onClick={() => handleRemove(acc.username)}
                                            >
                                                <FiTrash2 size={16} />
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountManager;

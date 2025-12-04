import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Menubar from "../../../admin/components/Menubar/Menubar";
import Header from "../../../admin/components/Header/Header";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { FiTrash2 as FiTrash2Base, FiPlus as FiPlusBase } from "react-icons/fi";

const FiTrash2 = FiTrash2Base as any;
const FiPlus = FiPlusBase as any;

interface Category {
    id: number;
    name: string;
}

const CategoryManager: React.FC = () => {
    const themeContext = useContext(ThemeContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAdd = async () => {
        if (!newCategory) return;
        try {
            await axios.post("http://localhost:5000/api/categories/add", { name: newCategory });
            fetchCategories();
            setNewCategory("");
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Lỗi khi thêm loại sản phẩm");
        }
    };

    const handleRemove = async (id: number) => {
        if (window.confirm("Xóa loại này?")) {
            try {
                await axios.post("http://localhost:5000/api/categories/remove", { id });
                fetchCategories();
            } catch (error) {
                console.error("Error removing category:", error);
                alert("Lỗi khi xóa loại sản phẩm");
            }
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/CategoryManager"} />
            <div className={`flex-grow-1 ${themeContext?.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
                <Header name={"Quản lý loại sản phẩm"} />
                <div className="p-4">
                    <div className="bg-white p-4 rounded shadow-sm mb-4">
                        <div className="d-flex gap-2">
                            <input className="form-control" placeholder="Tên loại mới" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                            <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAdd}><FiPlus /> Thêm</button>
                        </div>
                    </div>

                    <div className="bg-white rounded shadow-sm overflow-hidden">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Tên loại</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(cat => (
                                    <tr key={cat.id}>
                                        <td>{cat.id}</td>
                                        <td>{cat.name}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger d-flex align-items-center gap-1" onClick={() => handleRemove(cat.id)}>
                                                <FiTrash2 /> Xóa
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

export default CategoryManager;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Menubar from "../../../admin/components/Menubar/Menubar";
import Header from "../../../admin/components/Header/Header";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { FiTrash2, FiPlus } from "react-icons/fi";

const CategoryManager = () => {
    const themeContext = useContext(ThemeContext);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
    };

    const handleAdd = async () => {
        if (!newCategory) return;
        await axios.post("http://localhost:5000/api/categories/add", { name: newCategory });
        fetchCategories();
        setNewCategory("");
    };

    const handleRemove = async (id) => {
        if (window.confirm("Xóa loại này?")) {
            await axios.post("http://localhost:5000/api/categories/remove", { id });
            fetchCategories();
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Menubar focus={"/CategoryManager"} />
            <div className={`flex-grow-1 ${themeContext.theme}`} style={{ backgroundColor: "#f8f9fa" }}>
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

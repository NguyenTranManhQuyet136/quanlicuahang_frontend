import axios from "axios";
import { showNotification } from "../utils/notification";

const logAdminAction = async (content) => {
    const username = localStorage.getItem("username_admin");
    if (username) {
        try {
            await axios.post("http://localhost:5000/api/admin/history", {
                content: content,
                created_by: username
            });
            showNotification(content);
        } catch (error) {
            console.log("Lỗi lưu lịch sử");
        }
    }
};

export { logAdminAction };

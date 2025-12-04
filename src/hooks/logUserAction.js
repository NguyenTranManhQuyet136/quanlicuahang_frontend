import axios from "axios";
import { showNotification } from "../utils/notification";

const logUserAction = async (content) => {
    const username = localStorage.getItem("username_user");
    if (username) {
        try {
            await axios.post("http://localhost:5000/api/user/history", {
                content: content,
                created_by: username
            });
            showNotification(content);
        } catch (error) {
            console.log("Lỗi lưu lịch sử");
        }
    }
};

export { logUserAction };

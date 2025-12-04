import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import "./FormSetting.css";

const FormSetting = (props) => {
    const [settings, setSettings] = useState({
        notification: localStorage.getItem("notification") !== "false",
    });

    const handleNotificationChange = (e) => {
        const newNotification = e.target.value === "on";
        setSettings((prev) => ({ ...prev, notification: newNotification }));
        localStorage.setItem("notification", newNotification);
    };

    const handleSave = () => {
        console.log("Settings saved:", settings);
        props.closeForm();
    };

    return (
        <div className="form-setting-overlay" onClick={props.closeForm}>
            <div className="form-setting-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-setting-header">
                    <div className="form-setting-header-content">
                        <div className="form-setting-header-left">
                            <div className="form-setting-icon-box">
                                <FiSettings size={24} />
                            </div>
                            <div className="form-setting-header-title">
                                <h4>Cài đặt</h4>
                                <small>Quản lý tùy chọn cá nhân</small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="form-setting-close-btn"
                            onClick={props.closeForm}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="form-setting-body">
                    <form className="form-setting-flex">
                        <div className="form-setting-labels">
                            <label className="form-setting-label">Thông báo</label>
                        </div>

                        <div className="form-setting-inputs">
                            <select
                                className="form-setting-select"
                                value={settings.notification ? "on" : "off"}
                                onChange={handleNotificationChange}
                            >
                                <option value="on">Bật</option>
                                <option value="off">Tắt</option>
                            </select>
                        </div>
                    </form>

                    <div className="form-setting-actions">
                        <button
                            type="button"
                            className="form-setting-btn-cancel"
                            onClick={props.closeForm}
                        >
                            Đóng
                        </button>
                        <button
                            type="button"
                            className="form-setting-btn-submit"
                            onClick={handleSave}
                        >
                            Lưu cài đặt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormSetting;

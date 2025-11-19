import { useNavigate } from "react-router-dom";

import AccountPanel from "../../components/AccountPanel/AccountPanel";
import { mockAccount } from "../../data/account";

import "./UserProfile.css";

const UserProfile = () => {
    const navigate = useNavigate();

    return (
        <div className="user-profile">
            <header className="user-profile__hero">
                <div>
                    <p className="ts-label">Thông tin người dùng</p>
                    <h1>{mockAccount.name}</h1>
                    <p>Chào mừng trở lại Tech Commerce. Kiểm tra trạng thái tài khoản và ưu đãi dành riêng cho bạn.</p>
                </div>
                <button
                    className="ts-btn"
                    type="button"
                    onClick={() => navigate("/store")}
                >
                    ← Quay lại cửa hàng
                </button>
            </header>

            <section className="user-profile__content">
                <AccountPanel user={mockAccount} />

                <div className="user-profile__details">
                    <section>
                        <p className="ts-label">Thành viên từ</p>
                        <h3>{mockAccount.memberSince}</h3>
                        <p>Hạng hiện tại: {mockAccount.tier}</p>
                    </section>

                    <section>
                        <p className="ts-label">Điểm thưởng</p>
                        <h3>{mockAccount.points.toLocaleString("vi-VN")}</h3>
                        <p>Đổi phụ kiện, voucher vận chuyển và nhiều ưu đãi khác.</p>
                    </section>

                    <section>
                        <p className="ts-label">Sở thích</p>
                        <ul>
                            {mockAccount.preferences.map((pref) => (
                                <li key={pref}>{pref}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;


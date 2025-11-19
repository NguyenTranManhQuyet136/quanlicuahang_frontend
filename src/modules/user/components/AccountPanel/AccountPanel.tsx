import { UserAccount } from "../../pages/TechStore/types";

import "./AccountPanel.css";

type AccountPanelProps = {
    user: UserAccount;
};

const AccountPanel = ({ user }: AccountPanelProps) => {
    return (
        <aside className="ts-card ts-account">
            <header className="ts-card__header">
                <div>
                    <p className="ts-label">Tài khoản</p>
                    <h3>{user.name}</h3>
                </div>
                <span className="ts-badge">{user.tier}</span>
            </header>

            <div className="ts-account__content">
                <div>
                    <p className="ts-label">Email</p>
                    <p>{user.email}</p>
                </div>

                <div>
                    <p className="ts-label">Tích lũy</p>
                    <p>{user.points.toLocaleString("vi-VN")} điểm</p>
                </div>

                <div>
                    <p className="ts-label">Địa chỉ giao hàng</p>
                    <p>{user.shippingAddress}</p>
                </div>

                <div>
                    <p className="ts-label">Quan tâm</p>
                    <div className="ts-account__preferences">
                        {user.preferences.map((pref) => (
                            <span key={pref} className="ts-chip">
                                {pref}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <section className="ts-account__orders">
                <p className="ts-label">Đơn gần đây</p>
                {user.recentOrders.map((order) => (
                    <div key={order.id} className="ts-account__order">
                        <div>
                            <p>Mã #{order.id}</p>
                            <span>{order.date}</span>
                        </div>
                        <div>
                            <strong>
                                {order.total.toLocaleString("vi-VN")} ₫
                            </strong>
                            <span>{order.status}</span>
                        </div>
                    </div>
                ))}
            </section>
        </aside>
    );
};

export default AccountPanel;


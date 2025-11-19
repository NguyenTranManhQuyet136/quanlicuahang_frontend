import { useNavigate } from "react-router-dom";

import UserHeader from "../../components/Header/UserHeader";
import { useCart } from "../../context/CartContext";
import { mockAccount } from "../../data/account";

import "./CartPage.css";

const CartPage = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem, clearCart } = useCart();
    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        alert("Gửi yêu cầu đặt hàng thành công!");
        clearCart();
        navigate("/store");
    };

    return (
        <div className="cart-page">
            <UserHeader
                userName={mockAccount.name}
                onOpenCart={() => {}}
                onOpenProfile={() => navigate("/user/profile")}
            />

            <section className="cart-panel">
                <header className="cart-panel__header">
                    <div className="cart-panel__title">
                        <span className="cart-panel__icon">🛒</span>
                        <div>
                            <p className="ts-label">Giỏ hàng của bạn</p>
                            <h1>{items.length} sản phẩm đã chọn</h1>
                        </div>
                    </div>
                    <button
                        className="cart-panel__back"
                        type="button"
                        onClick={() => navigate("/store")}
                    >
                        ← Tiếp tục mua sắm
                    </button>
                </header>

                <div className="cart-panel__content">
                    {items.length === 0 ? (
                        <p className="ts-empty">
                            Chưa có sản phẩm nào trong giỏ. Tiếp tục mua sắm nhé!
                        </p>
                    ) : (
                        <>
                            <ul className="cart-panel__list">
                                {items.map((item) => (
                                    <li key={item.product.id}>
                                        <div>
                                            <strong>{item.product.name}</strong>
                                            <p>
                                                {item.product.price.toLocaleString(
                                                    "vi-VN"
                                                )}{" "}
                                                ₫
                                            </p>
                                        </div>
                                        <div className="cart-panel__actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        Math.max(1, item.quantity - 1)
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                            <button
                                                type="button"
                                                className="ts-link"
                                                onClick={() =>
                                                    removeItem(item.product.id)
                                                }
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <footer className="cart-panel__footer">
                                <div>
                                    <p>Tổng tạm tính</p>
                                    <strong>
                                        {subtotal.toLocaleString("vi-VN")} ₫
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    className="ts-btn ts-btn--primary"
                                    onClick={handleCheckout}
                                >
                                    Gửi yêu cầu đặt hàng
                                </button>
                            </footer>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CartPage;


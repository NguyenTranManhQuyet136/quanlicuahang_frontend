import { CartItem } from "../../pages/TechStore/types";

import "./CartPanel.css";

type CartPanelProps = {
    items: CartItem[];
    onOpenForm: () => void;
};

const CartPanel = ({ items, onOpenForm }: CartPanelProps) => {
    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    const previewItems = items.slice(0, 2);

    return (
        <aside className="ts-card ts-cart-summary">
            <header className="ts-card__header">
                <div>
                    <p className="ts-label">Giỏ hàng</p>
                    <h3>{items.length} sản phẩm</h3>
                </div>
                <strong>{subtotal.toLocaleString("vi-VN")} ₫</strong>
            </header>

            <div className="ts-cart-summary__content">
                {items.length === 0 ? (
                    <p className="ts-empty">Giỏ hàng đang trống.</p>
                ) : (
                    <>
                        <ul>
                            {previewItems.map((item) => (
                                <li key={item.product.id}>
                                    <span>{item.product.name}</span>
                                    <span>x{item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        {items.length > 2 && (
                            <p className="ts-muted">
                                +{items.length - 2} sản phẩm khác
                            </p>
                        )}
                    </>
                )}
            </div>

            <footer className="ts-card__footer">
                <button
                    className="ts-btn ts-btn--primary"
                    disabled={!items.length}
                    onClick={onOpenForm}
                >
                    Mở form giỏ hàng
                </button>
            </footer>
        </aside>
    );
};

export default CartPanel;


import "./UserHeader.css";

type UserHeaderProps = {
    userName: string;
    onOpenCart: () => void;
    onOpenProfile: () => void;
};

const UserHeader = ({
    userName,
    onOpenCart,
    onOpenProfile,
}: UserHeaderProps) => {
    return (
        <header className="user-header">
            <div className="user-header__brand">
                <span className="user-header__logo">Tech Commerce</span>
                <nav className="user-header__nav">
                    <a href="#featured">Nổi bật</a>
                    <a href="#laptop">Laptop</a>
                    <a href="#mobile">Mobile</a>
                    <a href="#accessories">Phụ kiện</a>
                </nav>
            </div>

            <div className="user-header__actions">
                <button
                    type="button"
                    className="user-header__cart"
                    onClick={onOpenCart}
                >
                    <span className="user-header__cart-icon">🛒</span>
                    <span>Giỏ hàng</span>
                </button>
                <button
                    type="button"
                    className="user-header__user"
                    onClick={onOpenProfile}
                >
                    <span className="user-header__user-icon">👤</span>
                    <span>{userName}</span>
                </button>
            </div>
        </header>
    );
};

export default UserHeader;


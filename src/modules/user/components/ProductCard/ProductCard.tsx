import { Product } from "../../pages/TechStore/types";

import "./ProductCard.css";

type ProductCardProps = {
    product: Product;
    onAddToCart: (product: Product) => void;
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    return (
        <article className="ts-product-card">
            <img
                src={product.image}
                alt={product.name}
                className="ts-product-card__image"
            />
            <div className="ts-product-card__body">
                <div className="ts-product-card__header">
                    <h3>{product.name}</h3>
                    <span className="ts-badge">{product.category}</span>
                </div>
                <p className="ts-product-card__description">
                    {product.description}
                </p>
                <ul className="ts-product-card__specs">
                    {product.specs.map((spec) => (
                        <li key={spec}>{spec}</li>
                    ))}
                </ul>
                <div className="ts-product-card__meta">
                    <strong>{product.price.toLocaleString("vi-VN")} ₫</strong>
                    <span>{product.rating.toFixed(1)}★</span>
                    <span>Còn {product.stock} sp</span>
                </div>
            </div>
            <button
                className="ts-btn ts-btn--primary"
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
            >
                {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
            </button>
        </article>
    );
};

export default ProductCard;


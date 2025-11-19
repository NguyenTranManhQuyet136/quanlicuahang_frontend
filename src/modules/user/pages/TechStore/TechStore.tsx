import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import FilterBar from "../../components/FilterBar/FilterBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import UserHeader from "../../components/Header/UserHeader";
import { mockAccount } from "../../data/account";
import { useCart } from "../../context/CartContext";
import { Product } from "./types";

import "./TechStore.css";

const productCatalog: Product[] = [
    {
        id: 1,
        name: "MacBook Pro 14” M3",
        category: "Laptop",
        price: 48990000,
        rating: 4.9,
        stock: 8,
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
        description: "Chip M3 Pro, 18GB RAM, SSD 512GB phù hợp cho lập trình & sáng tạo.",
        specs: ["18GB RAM", "512GB SSD", "Liquid Retina XDR"],
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        category: "Điện thoại",
        price: 34990000,
        rating: 4.8,
        stock: 15,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Titan siêu bền, chip A17 Pro, camera quay ProRes, pin 29h.",
        specs: ["A17 Pro", "USB-C", "Camera 48MP"],
    },
    {
        id: 3,
        name: "Samsung Odyssey G9 49”",
        category: "Màn hình",
        price: 29990000,
        rating: 4.7,
        stock: 5,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        description: "Màn hình cong Dual QHD 240Hz dành cho game thủ & streamer.",
        specs: ["240Hz", "HDR1000", "G-Sync"],
    },
    {
        id: 4,
        name: "PlayStation 5 Slim",
        category: "Console",
        price: 15990000,
        rating: 4.6,
        stock: 12,
        image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=800&q=80",
        description: "Thiết kế Slim, bộ nhớ 1TB, hỗ trợ Ray Tracing thời gian thực.",
        specs: ["1TB SSD", "Ray Tracing", "DualSense"],
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        category: "Âm thanh",
        price: 7990000,
        rating: 4.9,
        stock: 25,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
        description: "Tai nghe chống ồn đầu ngành, 30h sử dụng, sạc nhanh 3 phút.",
        specs: ["ANC", "LDAC", "Bluetooth 5.3"],
    },
    {
        id: 6,
        name: "Logitech MX Mechanical",
        category: "Phụ kiện",
        price: 3990000,
        rating: 4.5,
        stock: 30,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        description: "Bàn phím low-profile switch Tactile, kết nối đa thiết bị.",
        specs: ["Switch Tactile", "Multi-Device", "USB-C"],
    },
    {
        id: 7,
        name: "DJI Mini 4 Pro",
        category: "Drone",
        price: 25990000,
        rating: 4.8,
        stock: 6,
        image: "https://images.unsplash.com/photo-1498669289079-2cfd92d987c1?auto=format&fit=crop&w=800&q=80",
        description: "Drone siêu nhẹ 249g, quay 4K60 HDR, cảm biến tránh vật cản 360°.",
        specs: ["4K60 HDR", "249g", "O4 Transmission"],
    },
    {
        id: 8,
        name: "Apple Watch Ultra 2",
        category: "Wearable",
        price: 22990000,
        rating: 4.7,
        stock: 10,
        image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
        description: "Titanium, màn hình 3.000 nit, thời lượng pin 72h, cảm biến lặn.",
        specs: ["Pin 72h", "Dual-Frequency GPS", "Depth Gauge"],
    },
];

const TechStore = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("featured");
    const { addItem } = useCart();

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(productCatalog.map((product) => product.category))
        );
        return ["Tất cả", ...uniqueCategories];
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = productCatalog.filter((product) => {
            const matchCategory =
                selectedCategory === "Tất cả" ||
                product.category === selectedCategory;
            const matchSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCategory && matchSearch;
        });

        switch (sortOption) {
            case "price-asc":
                filtered = filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filtered = filtered.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                filtered = filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "stock":
                filtered = filtered.sort((a, b) => b.stock - a.stock);
                break;
            default:
                filtered = filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    }, [searchTerm, selectedCategory, sortOption]);

    const handleAddToCart = (product: Product) => {
        addItem(product);
    };

    const handleResetFilters = () => {
        setSelectedCategory("Tất cả");
        setSearchTerm("");
        setSortOption("featured");
    };

    const handleGoToProfile = () => {
        navigate("/user/profile");
    };

    return (
        <div className="tech-store">
            <UserHeader
                userName={mockAccount.name}
                onOpenCart={() => navigate("/store/cart")}
                onOpenProfile={handleGoToProfile}
            />

            <header className="ts-hero">
                <div className="ts-hero__content">
                    <p className="ts-label">Tech Commerce</p>
                    <h1>Thiết bị xịn nhất cho dân công nghệ</h1>
                    <p>
                        Chọn nhanh laptop, điện thoại, gaming gear mới nhất từ các
                        thương hiệu hàng đầu với ưu đãi giao nhanh trong 2 giờ.
                    </p>
                </div>
                <div className="ts-hero__stats">
                    <div>
                        <strong>2h</strong>
                        <span>Giao siêu tốc nội thành</span>
                    </div>
                    <div>
                        <strong>+30K</strong>
                        <span>Khách hàng trung thành</span>
                    </div>
                    <div>
                        <strong>5*</strong>
                        <span>Đánh giá trung bình</span>
                    </div>
                </div>
            </header>

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortOption={sortOption}
                onSortChange={setSortOption}
                onResetFilters={handleResetFilters}
            />

            <section className="ts-product-grid">
                {filteredProducts.length === 0 ? (
                    <p className="ts-empty">
                        Không tìm thấy sản phẩm phù hợp. Thử từ khóa khác nhé!
                    </p>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))
                )}
            </section>
        </div>
    );
};

export default TechStore;


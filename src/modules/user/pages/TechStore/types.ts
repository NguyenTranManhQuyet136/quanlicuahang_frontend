export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    image: string;
    description: string;
    specs: string[];
};

export type CartItem = {
    product: Product;
    quantity: number;
};

export type UserAccount = {
    name: string;
    email: string;
    tier: "Standard" | "Premium" | "Enterprise";
    points: number;
    memberSince: string;
    shippingAddress: string;
    preferences: string[];
    recentOrders: Array<{
        id: string;
        date: string;
        total: number;
        status: "Đang xử lý" | "Đã giao" | "Đã hủy";
        items: number;
    }>;
};


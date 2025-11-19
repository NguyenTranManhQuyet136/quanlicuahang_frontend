import { UserAccount } from "../pages/TechStore/types";

export const mockAccount: UserAccount = {
    name: "Nguyễn Minh Anh",
    email: "minhanh@techstore.vn",
    tier: "Premium",
    points: 18450,
    memberSince: "2019",
    shippingAddress: "25 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
    preferences: ["Laptop", "Smart Home", "Gaming Gear"],
    recentOrders: [
        {
            id: "HD982134",
            date: "15/11/2025",
            total: 32990000,
            status: "Đã giao",
            items: 2,
        },
        {
            id: "HD982001",
            date: "02/11/2025",
            total: 4590000,
            status: "Đang xử lý",
            items: 1,
        },
    ],
};


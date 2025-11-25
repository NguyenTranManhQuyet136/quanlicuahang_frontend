import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../contexts/ThemeProvider";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiBox, FiUsers, FiShoppingCart, FiArchive, FiRefreshCw } from "react-icons/fi";

import { checkLogin } from "../../hooks/checkLogin";

function StatCard({ title, value, sub, icon, color = "#0b3d91" }) {
    return (
        <div className="p-4 bg-white rounded-3" style={{ boxShadow: "0 10px 30px rgba(11,61,145,0.08)", border: "1px solid #f0f0f0", transition: "all 0.3s ease" }}>
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <div style={{ fontSize: 13, color: "#6c757d", fontWeight: 600, letterSpacing: 0.5 }}>{title}</div>
                    <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8, color: "#0b3d91" }}>{value}</div>
                    {sub && <div style={{ fontSize: 11, color: "#95a3b3", marginTop: 6, fontWeight: 500 }}>{sub}</div>}
                </div>
                <div style={{ width: 70, height: 70, borderRadius: 16, background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 8px 16px ${color}33` }}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

const Dashboard = () => {
    checkLogin();

    const themeContext = useContext(ThemeContext);

    const [stats, setStats] = useState({ products: null, customers: null, orders: null, warehouses: null, productsList: [], ordersList: [] });
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const [p, c, o, w] = await Promise.all([
                axios.get("http://localhost:5000/api/product"),
                axios.get("http://localhost:5000/api/customer"),
                axios.get("http://localhost:5000/api/order"),
                axios.get("http://localhost:5000/api/warehouse"),
            ]);

            const products = Array.isArray(p.data) ? p.data.length : 0;
            const productValue = Array.isArray(p.data) ? p.data.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0) : 0;
            const customers = Array.isArray(c.data) ? c.data.length : 0;
            const orders = Array.isArray(o.data) ? o.data.length : 0;
            const ordersValue = Array.isArray(o.data) ? o.data.reduce((s, it) => s + (Number(it.total_price || 0)), 0) : 0;
            const warehouses = Array.isArray(w.data) ? w.data.length : 0;
setStats({ products: { count: products, totalValue: productValue }, customers: { count: customers }, orders: { count: orders, totalValue: ordersValue }, warehouses: { count: warehouses }, productsList: Array.isArray(p.data) ? p.data : [], ordersList: Array.isArray(o.data) ? o.data : [] });
        } catch (err) {
            console.error("Failed to fetch dashboard stats:", err && err.message ? err.message : err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className={`d-flex`} style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Dashboard"} />
            <div className={`flex-grow-1 dashboard ${themeContext.theme}`} style={{ backgroundColor: "#f5f7fa" }}>
                <Header name={"Dashboard"} />

                <div className="p-4">
                    {/* Header Section */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h4 style={{ margin: 0, color: "rgba(13, 110, 253, 1)", fontSize: 28, fontWeight: 700 }}>Tổng quan quản lý</h4>
                            <p style={{ margin: "4px 0 0 0", color: "#95a3b3", fontSize: 13 }}>Theo dõi hiệu suất bán hàng & quản lý</p>
                        </div>
                        <button 
                            className="btn"
                            onClick={fetchStats} 
                            disabled={loading}
                            style={{ background: "rgba(13, 110, 253, 1)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 600, transition: "all 0.3s" }}
                        >
                            <FiRefreshCw style={{ marginRight: 8 }} /> {loading ? "Đang tải..." : "Làm mới"}
                        </button>
                    </div>

                    {/* KPI Cards */}
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6 col-lg-3">
                            <StatCard title="Sản phẩm" value={stats.products ? stats.products.count.toLocaleString() : "-"} sub={stats.products ? `Giá trị: ${(stats.products.totalValue / 1000000).toFixed(1)}M ₫` : "-"} icon={<FiBox size={26} />} color="#0b3d91" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <StatCard title="Khách hàng" value={stats.customers ? stats.customers.count.toLocaleString() : "-"} sub="Khách hàng đăng ký" icon={<FiUsers size={26} />} color="#198754" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
<StatCard title="Đơn hàng" value={stats.orders ? stats.orders.count.toLocaleString() : "-"} sub={stats.orders ? `Tổng: ${(stats.orders.totalValue / 1000000).toFixed(1)}M ₫` : "-"} icon={<FiShoppingCart size={26} />} color="#ffc107" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <StatCard title="Kho hàng" value={stats.warehouses ? stats.warehouses.count.toLocaleString() : "-"} sub="Phiếu nhập" icon={<FiArchive size={26} />} color="#6f42c1" />
                        </div>
                    </div>

                    {/* Quick Summary Cards */}
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0 12px 32px rgba(11,61,145,0.06)", border: "1px solid #f0f0f0" }}>
                                <h6 style={{ margin: "0 0 16px 0", color: "#0b3d91", fontWeight: 700, fontSize: 13 }}>📦 Thống kê sản phẩm</h6>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Tổng số lượng</div>
                                        <div style={{ fontSize: 20, fontWeight: 700, color: "#0b3d91" }}>{stats.products ? stats.products.count : "-"}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Giá trị tồn kho</div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: "#0b3d91" }}>{stats.products ? `${(stats.products.totalValue / 1000000).toFixed(1)}M` : "-"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0 12px 32px rgba(11,61,145,0.06)", border: "1px solid #f0f0f0" }}>
                                <h6 style={{ margin: "0 0 16px 0", color: "#0b3d91", fontWeight: 700, fontSize: 13 }}>👥 Thống kê khách hàng</h6>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Tổng khách hàng</div>
                                        <div style={{ fontSize: 20, fontWeight: 700, color: "#198754" }}>{stats.customers ? stats.customers.count : "-"}</div>
                                    </div>
                                    <div>
<div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Hoạt động</div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: "#198754" }}>100%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0 12px 32px rgba(11,61,145,0.06)", border: "1px solid #f0f0f0" }}>
                                <h6 style={{ margin: "0 0 16px 0", color: "#0b3d91", fontWeight: 700, fontSize: 13 }}>🛒 Thống kê đơn hàng</h6>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Tổng đơn hàng</div>
                                        <div style={{ fontSize: 20, fontWeight: 700, color: "#ffc107" }}>{stats.orders ? stats.orders.count : "-"}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Tổng doanh thu</div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: "#ffc107" }}>{stats.orders ? `${(stats.orders.totalValue / 1000000).toFixed(1)}M` : "-"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0 12px 32px rgba(11,61,145,0.06)", border: "1px solid #f0f0f0" }}>
                                <h6 style={{ margin: "0 0 16px 0", color: "#0b3d91", fontWeight: 700, fontSize: 13 }}>📊 Thống kê kho hàng</h6>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Tổng phiếu</div>
                                        <div style={{ fontSize: 20, fontWeight: 700, color: "#6f42c1" }}>{stats.warehouses ? stats.warehouses.count : "-"}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#95a3b3", fontWeight: 600, marginBottom: 4 }}>Trạng thái</div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: "#6f42c1" }}>✓ Hoạt động</div>
                                    </div>
</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
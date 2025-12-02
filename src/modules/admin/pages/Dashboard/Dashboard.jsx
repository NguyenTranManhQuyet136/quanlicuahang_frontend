import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { useContext, useEffect, useState } from "react";
import { checkLogin } from "../../../../hooks/checkLogin";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../../user/components/ProductCard/ProductCard";
import { FaBox, FaShoppingCart, FaUsers, FaWarehouse, FaMoneyBillWave, FaHistory, FaUserClock } from "react-icons/fa";
import { MdLaptop, MdPhoneIphone, MdMonitor, MdHeadset, MdKeyboard, MdMouse, MdSpeaker } from 'react-icons/md';
import "./Dashboard.css";

const Dashboard = () => {
    checkLogin("admin");
    const themeContext = useContext(ThemeContext);

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [adminHistory, setAdminHistory] = useState([]);
    const [userHistory, setUserHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resOrders, resProducts, resCustomers, resWarehouse, resAdminHist, resUserHist] = await Promise.all([
                    axios.get("http://localhost:5000/api/order"),
                    axios.get("http://localhost:5000/api/product"),
                    axios.get("http://localhost:5000/api/customer"),
                    axios.get("http://localhost:5000/api/warehouse"),
                    axios.get("http://localhost:5000/api/admin/history"),
                    axios.get("http://localhost:5000/api/user/history")
                ]);
                setOrders(resOrders.data);
                setProducts(resProducts.data);
                setCustomers(resCustomers.data);
                setWarehouse(resWarehouse.data);
                setAdminHistory(resAdminHist.data);
                setUserHistory(resUserHist.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleProcessOrder = async (orderId) => {
        try {
            await axios.post("http://localhost:5000/api/order/update_status", {
                order_id: orderId,
                status: "Chờ lấy hàng"
            });
            // Refresh data
            const resOrders = await axios.get("http://localhost:5000/api/order");
            setOrders(resOrders.data);
        } catch (error) {
            console.error("Error processing order:", error);
            alert("Có lỗi xảy ra khi xử lý đơn hàng!");
        }
    };

    // Area 1: Pending Orders
    const pendingOrders = orders.filter(o => o.status === "Đang chờ xác nhận");
    // Helper to group by status
    const countByStatus = (data, statusList, statusKey = 'status') => {
        const counts = data.reduce((acc, item) => {
            const status = item[statusKey] || 'Khác';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return statusList.map(status => ({
            label: status,
            value: counts[status] || 0
        }));
    };

    const orderStatuses = [
        "Đang chờ xác nhận",
        "Chờ lấy hàng",
        "Đang giao hàng",
        "Đã giao hàng",
        "Hoàn tất"
    ];

    const warehouseStatuses = [
        "Đang xử lý",
        "Đang vận chuyển",
        "Đã giao"
    ];

    const orderStats = countByStatus(orders, orderStatuses);
    const warehouseStats = countByStatus(warehouse, warehouseStatuses);

    // Product Categories
    const productCategories = [
        { label: "Laptop", type: "laptop" },
        { label: "Điện Thoại", type: "Điện thoại" },
        { label: "Màn hình", type: "Màn hình" },
        { label: "Tai nghe", type: "Tai nghe" },
        { label: "Bàn phím", type: "Bàn phím" },
        { label: "Chuột", type: "Chuột" },
        { label: "Loa", type: "Loa" },
    ];

    const productStats = countByStatus(products, productCategories.map(c => c.type), 'type');
    // Map back to labels for display
    const productDisplayStats = productStats.map(stat => {
        const category = productCategories.find(c => c.type === stat.label);
        return { label: category ? category.label : stat.label, value: stat.value };
    });

    // Area 2: Category Stats (Products, Orders, Customers, Warehouse)
    const stats = [
        {
            label: "Sản phẩm",
            count: products.length,
            icon: <FaBox size={24} />,
            color: "primary",
            bg: "bg-primary",
            link: "/Product",
            details: [
                { label: "Tổng trị giá", value: `${products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString("vi-VN")} ₫` },
                { label: "Sắp hết hàng (<10)", value: products.filter(p => p.quantity < 10).length },
                { label: "Hết hàng", value: products.filter(p => p.quantity === 0).length },
                ...productDisplayStats
            ]
        },
        {
            label: "Đơn hàng",
            count: orders.length,
            icon: <FaShoppingCart size={24} />,
            color: "success",
            bg: "bg-success",
            link: "/Order",
            details: [
                { label: "Tổng giá trị", value: `${orders.reduce((sum, o) => sum + Number(o.total_price), 0).toLocaleString("vi-VN")} ₫` },
                ...orderStats
            ]
        },
        {
            label: "Khách hàng",
            count: customers.length,
            icon: <FaUsers size={24} />,
            color: "info",
            bg: "bg-info",
            link: "/Customer",
            details: [
                { label: "Nam", value: customers.filter(c => c.gender === "Nam").length },
                { label: "Nữ", value: customers.filter(c => c.gender === "Nữ").length }
            ]
        },
        {
            label: "Nhập kho",
            count: warehouse.length,
            icon: <FaWarehouse size={24} />,
            color: "warning",
            bg: "bg-warning",
            link: "/Warehouse",
            details: [
                { label: "Tổng giá trị", value: `${warehouse.reduce((sum, w) => sum + Number(w.total_value), 0).toLocaleString("vi-VN")} ₫` },
                ...warehouseStats
            ]
        }
    ];

    // Area 3: Profit (Total Revenue)
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_price), 0);

    // Area 4: Best Sellers (Simulated by taking first 4 products)
    const bestSellers = products.slice(0, 4);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="d-flex dashboard-container">
            <Menubar focus={"/Dashboard"} />
            <div className={`flex-grow-1 ${themeContext.theme} dashboard-content`}>
                <Header name={"Dashboard"} />
                <div className="p-4">

                    {/* Area 1: Pending Orders */}
                    <div className="mb-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="badge bg-warning text-dark p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                        {pendingOrders.length}
                                    </span>
                                    <h5 className="mb-0 text-warning fw-bold">Đơn hàng chờ xử lý</h5>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                {pendingOrders.length === 0 ? (
                                    <div className="p-4 text-center text-muted">
                                        <p className="mb-0">Không có đơn hàng nào đang chờ xử lý.</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 align-middle">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th className="ps-4">ID</th>
                                                    <th>ID khách hàng</th>
                                                    <th>Ngày đặt hàng</th>
                                                    <th>Tổng giá trị</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pendingOrders.slice(0, 5).map(order => (
                                                    <tr key={order.order_id}>
                                                        <td className="ps-4 fw-bold text-primary">
                                                            <span style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                width: "32px",
                                                                height: "32px",
                                                                backgroundColor: "#e7f1ff",
                                                                color: "#0d6efd",
                                                                borderRadius: "6px",
                                                                fontWeight: "600",
                                                                fontSize: "0.9rem",
                                                            }}>
                                                                {order.order_id}
                                                            </span>
                                                        </td>
                                                        <td className="fw-medium">{order.customer_id}</td>
                                                        <td className="text-muted">{new Date(order.order_date).toLocaleDateString("vi-VN")}</td>
                                                        <td className="fw-bold text-primary">{Number(order.total_price).toLocaleString("vi-VN")} ₫</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-primary"
                                                                onClick={() => handleProcessOrder(order.order_id)}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Area 2: Category Stats */}
                    <div className="row g-4 mb-4">
                        {stats.map((item, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="card border-0 shadow-sm h-100 overflow-hidden hover-scale">
                                    <div className={`card-body position-relative d-flex flex-column`}>
                                        <div className="d-flex justify-content-between align-items-start z-1 position-relative mb-3">
                                            <div>
                                                <h6 className="text-muted text-uppercase mb-2 category-label">{item.label}</h6>
                                                <h3 className="fw-bold mb-0">{item.count}</h3>
                                            </div>
                                            <div className={`p-3 rounded-3 text-white ${item.bg} card-icon-bg shadow-sm`}>
                                                {item.icon}
                                            </div>
                                        </div>
                                        {/* Details Section */}
                                        {item.details && (
                                            <div className="mt-3 pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)', fontSize: '0.9rem' }}>
                                                {item.details.map((detail, idx) => (
                                                    <div key={idx} className="d-flex justify-content-between align-items-center mb-1">
                                                        <span className="text-muted">{detail.label}</span>
                                                        <span className="fw-bold text-dark">{detail.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <Link to={item.link} className="stretched-link"></Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Area 3: Total Revenue (Redesigned) */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm text-white revenue-card">
                                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="card-title opacity-75 mb-1">Tổng Doanh Thu</h5>
                                        <h2 className="display-5 fw-bold mb-0">
                                            {totalRevenue.toLocaleString("vi-VN")} ₫
                                        </h2>
                                        <p className="mb-0 opacity-50 mt-2"><small>Cập nhật liên tục từ hệ thống</small></p>
                                    </div>
                                    <div className="d-none d-md-block opacity-25">
                                        <FaMoneyBillWave size={80} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Area 4: Best Sellers */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="text-secondary fw-bold m-0">🔥 Sản phẩm bán chạy</h5>
                        <Link to="/Product" className="text-decoration-none text-primary fw-semibold">Xem tất cả</Link>
                    </div>
                    <div className="mb-5">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                            {bestSellers.map(product => (
                                <div className="col" key={product.product_id}>
                                    <ProductCard product={product} showAddToCart={false} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Area 5: History (Split) */}
                    <div className="row g-4">
                        {/* Admin History */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-header bg-white py-3 border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                        <FaHistory className="text-primary" />
                                        <h6 className="mb-0 fw-bold text-primary">Lịch sử Admin</h6>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive table-history-container">
                                        <table className="table table-hover mb-0 align-middle">
                                            <thead className="bg-light sticky-top">
                                                <tr>
                                                    <th className="ps-3">Thời gian</th>
                                                    <th>Admin</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {adminHistory.slice(0, 10).map((h, index) => (
                                                    <tr key={index}>
                                                        <td className="ps-3 text-muted history-time">
                                                            {new Date(h.time).toLocaleString("vi-VN")}
                                                        </td>
                                                        <td className="fw-semibold">{h.created_by}</td>
                                                        <td>{h.content}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User History */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-header bg-white py-3 border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                        <FaUserClock className="text-info" />
                                        <h6 className="mb-0 fw-bold text-info">Lịch sử Người dùng</h6>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive table-history-container">
                                        <table className="table table-hover mb-0 align-middle">
                                            <thead className="bg-light sticky-top">
                                                <tr>
                                                    <th className="ps-3">Thời gian</th>
                                                    <th>User</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userHistory.slice(0, 10).map((h, index) => (
                                                    <tr key={index}>
                                                        <td className="ps-3 text-muted history-time">
                                                            {new Date(h.time).toLocaleString("vi-VN")}
                                                        </td>
                                                        <td className="fw-semibold">{h.created_by}</td>
                                                        <td>{h.content}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { useContext, useEffect, useState } from "react";
import { checkLogin } from "../../../../hooks/checkLogin";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../../user/components/ProductCard/ProductCard";
import { FaBox, FaShoppingCart, FaUsers, FaWarehouse, FaMoneyBillWave } from "react-icons/fa";
import { FiEye, FiCheck } from "react-icons/fi";
import { MdLaptop, MdPhoneIphone, MdMonitor, MdHeadset, MdKeyboard, MdMouse, MdSpeaker } from 'react-icons/md';
import "./Dashboard.css";
import FormDetail from "../../components/Form/FormDetail/FormDetail";

const Dashboard = () => {
    checkLogin("admin");
    const themeContext = useContext(ThemeContext);

    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);
    const [warehouse, setWarehouse] = useState<any[]>([]);
    const [profit, setProfit] = useState(0);
    const [loading, setLoading] = useState(true);
    const [detailStatus, setDetailStatus] = useState({ status: false, id_target: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resOrders, resProducts, resCustomers, resWarehouse, resProfit] = await Promise.all([
                    axios.get("http://localhost:5000/api/order"),
                    axios.get("http://localhost:5000/api/product"),
                    axios.get("http://localhost:5000/api/customer"),
                    axios.get("http://localhost:5000/api/warehouse"),
                    axios.get("http://localhost:5000/api/profit")
                ]);
                setOrders(resOrders.data);
                setProducts(resProducts.data);
                setCustomers(resCustomers.data);
                setWarehouse(resWarehouse.data);
                setProfit(resProfit.data.total_profit);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleProcessOrder = async (orderId: any) => {
        try {
            await axios.post("http://localhost:5000/api/order/update_status", {
                order_id: orderId,
                status: "Chờ lấy hàng"
            });
            const resOrders = await axios.get("http://localhost:5000/api/order");
            setOrders(resOrders.data);
        } catch (error) {
            console.error("Error processing order:", error);
            alert("Có lỗi xảy ra khi xử lý đơn hàng!");
        }
    };

    const pendingOrders = orders.filter(o => o.status === "Đang chờ xác nhận");
    const countByStatus = (data: any, statusList: any, statusKey = 'status') => {
        const counts = data.reduce((acc: any, item: any) => {
            const status = item[statusKey] || 'Khác';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return statusList.map((status: any) => ({
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

    const productTypeCounts = products.reduce((acc: any, product: any) => {
        const type = product.type || 'Khác';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const productDisplayStats = Object.keys(productTypeCounts).map(type => ({
        label: type,
        value: productTypeCounts[type]
    }));

    const stats = [
        {
            label: "Sản phẩm",
            count: products.length,
            icon: (FaBox as any)({ size: 24 }),
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
            icon: (FaShoppingCart as any)({ size: 24 }),
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
            icon: (FaUsers as any)({ size: 24 }),
            color: "info",
            bg: "bg-info",
            link: "/Customer",
            details: [
                { label: "Nam", value: customers.filter(c => c.gender === "Nam").length },
                { label: "Nữ", value: customers.filter(c => c.gender === "Nữ").length }
            ]
        },
        {
            label: "Kho",
            count: warehouse.length,
            icon: (FaWarehouse as any)({ size: 24 }),
            color: "warning",
            bg: "bg-warning",
            link: "/Warehouse",
            details: [
                ...warehouseStats
            ]
        }
    ];
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_price), 0);

    const bestSellers = [...products]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 4);


    const [revenueFilter, setRevenueFilter] = useState("all");
    const [profitFilter, setProfitFilter] = useState("all");

    const filterOrders = (orders: any[], filterType: string) => {
        const now = new Date();
        return orders.filter(order => {
            const orderDate = new Date(order.order_date);
            if (filterType === "today") {
                return orderDate.toDateString() === now.toDateString();
            }
            if (filterType === "week") {
                const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                return orderDate >= startOfWeek;
            }
            if (filterType === "month") {
                return orderDate.getMonth() === new Date().getMonth() && orderDate.getFullYear() === new Date().getFullYear();
            }
            if (filterType === "year") {
                return orderDate.getFullYear() === new Date().getFullYear();
            }
            return true;
        });
    };

    const filteredRevenueOrders = filterOrders(orders, revenueFilter);
    const filteredRevenue = filteredRevenueOrders.reduce((sum, o) => sum + Number(o.total_price), 0);

    const filteredProfitOrders = filterOrders(orders, profitFilter);
    const filteredProfitRevenue = filteredProfitOrders.reduce((sum, o) => sum + Number(o.total_price), 0);
    const profitMargin = totalRevenue > 0 ? profit / totalRevenue : 0;
    const estimatedProfit = filteredProfitRevenue * profitMargin;


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex dashboard-container">
            <Menubar focus={"/Dashboard"} />
            <div className={`flex-grow-1 ${themeContext.theme} dashboard-content`}>
                <Header name={"Dashboard"} />
                <div className="p-4">
                    {detailStatus.status && (
                        <FormDetail
                            typeData="đơn hàng"
                            type_target="order"
                            id_target={detailStatus.id_target}
                            closeForm={() => setDetailStatus({ status: false, id_target: "" })}
                        />
                    )}

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

                                                            <div className="d-flex gap-2">
                                                                <button
                                                                    style={{
                                                                        padding: "6px 10px",
                                                                        backgroundColor: "#cfe2ff",
                                                                        color: "#0d6efd",
                                                                        border: "none",
                                                                        borderRadius: "6px",
                                                                        fontWeight: "500",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "4px",
                                                                        transition: "all 0.3s ease",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => setDetailStatus({ status: true, id_target: order.order_id })}
                                                                >
                                                                    {(FiEye as any)({ size: 16 })}
                                                                    Xem chi tiết
                                                                </button>
                                                                <button
                                                                    style={{
                                                                        padding: "6px 10px",
                                                                        backgroundColor: "#0d6efd",
                                                                        color: "#fff",
                                                                        border: "none",
                                                                        borderRadius: "6px",
                                                                        fontWeight: "500",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "4px",
                                                                        transition: "all 0.3s ease",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => handleProcessOrder(order.order_id)}
                                                                >
                                                                    {(FiCheck as any)({ size: 16 })}
                                                                    Xác nhận
                                                                </button>
                                                            </div>
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

                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm text-white revenue-card h-100">
                                <div className="card-body p-4 position-relative d-flex align-items-center justify-content-between">
                                    <select
                                        className="form-select form-select-sm border-0 shadow-sm text-dark"
                                        style={{ position: 'absolute', top: '15px', right: '15px', width: 'auto', cursor: 'pointer', backgroundColor: 'white' }}
                                        value={revenueFilter}
                                        onChange={(e) => setRevenueFilter(e.target.value)}
                                    >
                                        <option value="all">Tất cả</option>
                                        <option value="today">Hôm nay</option>
                                        <option value="week">Tuần này</option>
                                        <option value="month">Tháng này</option>
                                        <option value="year">Năm nay</option>
                                    </select>
                                    <div>
                                        <h5 className="card-title opacity-75 mb-1">Tổng Doanh Thu</h5>
                                        <h2 className="display-5 fw-bold mb-0">
                                            {filteredRevenue.toLocaleString("vi-VN")} ₫
                                        </h2>
                                        <p className="mb-0 opacity-50 mt-2"><small>Cập nhật liên tục từ hệ thống</small></p>
                                    </div>
                                    <div className="d-none d-md-block opacity-25">
                                        {(FaMoneyBillWave as any)({ size: 80 })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm text-white bg-success h-100">
                                <div className="card-body p-4 position-relative d-flex align-items-center justify-content-between">
                                    <select
                                        className="form-select form-select-sm border-0 shadow-sm text-dark"
                                        style={{ position: 'absolute', top: '15px', right: '15px', width: 'auto', cursor: 'pointer', backgroundColor: 'white' }}
                                        value={profitFilter}
                                        onChange={(e) => setProfitFilter(e.target.value)}
                                    >
                                        <option value="all">Tất cả</option>
                                        <option value="today">Hôm nay</option>
                                        <option value="week">Tuần này</option>
                                        <option value="month">Tháng này</option>
                                        <option value="year">Năm nay</option>
                                    </select>
                                    <div>
                                        <h5 className="card-title opacity-75 mb-1">Lợi Nhuận Ước Tính</h5>
                                        <h2 className="display-5 fw-bold mb-0">
                                            {Math.round(estimatedProfit).toLocaleString("vi-VN")} ₫
                                        </h2>
                                        <p className="mb-0 opacity-50 mt-2">
                                            <small>
                                                Tỉ suất: {totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0}%
                                            </small>
                                        </p>
                                    </div>
                                    <div className="d-none d-md-block opacity-25">
                                        {(FaMoneyBillWave as any)({ size: 80 })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        {/* Top Khách hàng */}
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold text-info">🏆 Top Khách Hàng Tiềm Năng</h5>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        {Object.entries(orders.reduce((acc: any, order) => {
                                            acc[order.customer_id] = (acc[order.customer_id] || 0) + Number(order.total_price);
                                            return acc;
                                        }, {}))
                                            .sort(([, a]: any, [, b]: any) => b - a)
                                            .slice(0, 5)
                                            .map(([id, total]: any) => (
                                                <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span>{id}</span>
                                                    <span className="fw-bold text-primary">{total.toLocaleString("vi-VN")} ₫</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Cảnh báo tồn kho */}
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold text-danger">⚠️ Cảnh Báo Sắp Hết Hàng</h5>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        {products
                                            .filter(p => p.quantity < 10)
                                            .map(p => (
                                                <li key={p.product_id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span>{p.name}</span>
                                                    <span className="badge bg-danger rounded-pill">{p.quantity}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

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



                </div>
            </div>
        </div>
    );
};

export default Dashboard;

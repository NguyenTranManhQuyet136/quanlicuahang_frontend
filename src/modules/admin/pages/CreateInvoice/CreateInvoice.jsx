import { useState, useContext, useEffect } from "react";
import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { FaFileInvoice } from "react-icons/fa";
import axios from "axios";
import { checkLogin } from "../../../../hooks/checkLogin";
import { logAdminAction } from "../../../../hooks/logAdminAction";
import "./CreateInvoice.css";

const CreateInvoice = () => {
    checkLogin("admin");
    const themeContext = useContext(ThemeContext);

    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: "",
        customerId: "",
        customerName: "",
        invoiceDate: new Date().toISOString().split('T')[0],
        items: [{ productId: "", productName: "", quantity: 1, price: 0, total: 0, suggestions: [] }],

        status: 1
    });

    const [dataProduct, setDataProduct] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/product");
            setDataProduct(res.data);
        };
        const fetchId = async () => {
            const res = await axios.get("http://localhost:5000/api/order/generate-id");
            const randomCustomerId = "KH" + Math.floor(100000 + Math.random() * 900000);
            setInvoiceData(prev => ({ ...prev, invoiceNumber: res.data.id, customerId: randomCustomerId }));
        };
        fetchData();
        fetchId();
    }, [])

    const handleInputChange = (field, value) => {
        setInvoiceData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...invoiceData.items];
        newItems[index][field] = value;

        if (field === "productName") {
            const suggestions = dataProduct.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            newItems[index].suggestions = suggestions;
        }

        if (field === "quantity" || field === "price") {
            newItems[index].total = (newItems[index].quantity || 0) * (newItems[index].price || 0);
        }

        setInvoiceData(prev => ({ ...prev, items: newItems }));
        calculateTotal(newItems);
    };

    const selectSuggestion = (index, product) => {
        const newItems = [...invoiceData.items];
        newItems[index].product = product;
        newItems[index].productName = product.name;
        newItems[index].price = product.price || 0;
        newItems[index].suggestions = [];
        newItems[index].total = (newItems[index].quantity || 0) * (newItems[index].price || 0);
        setInvoiceData(prev => ({ ...prev, items: newItems }));
        calculateTotal(newItems);
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + (item.total || 0), 0);
        setTotalAmount(total);
    };

    const addItem = () => {
        setInvoiceData(prev => ({
            ...prev,
            items: [...prev.items, { productId: "", productName: "", quantity: 1, price: 0, total: 0, suggestions: [] }]
        }));
    };

    const removeItem = (index) => {
        const newItems = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData(prev => ({ ...prev, items: newItems }));
        calculateTotal(newItems);
    };

    const handleSubmit = () => {
        console.log(invoiceData.items)
        console.log(invoiceData)

        const handleAddCustomer = async () => {
            await axios.post("http://localhost:5000/api/customer/add", {
                customer_id: invoiceData.customerId,
                fullname: invoiceData.customerName,
                birthyear: 0,
                address: "",
                status: 1,
            });
        };

        const handleAddOrder = async () => {
            await axios.post("http://localhost:5000/api/order/add", {
                order_id: invoiceData.invoiceNumber,
                customer_id: invoiceData.customerId,
                order_date: invoiceData.invoiceDate,
                total_price: totalAmount,
                status: 1,
                created_by: localStorage.getItem("username")
            });
        };

        const handleAddOrderDetail = async (order_id, dataProduct) => {
            await axios.post("http://localhost:5000/api/order_detail/add", {
                order_id: order_id,
                product_id: dataProduct.product.product_id,
                unit_quantity: dataProduct.quantity,
                unit_price: dataProduct.product.price,
            });
        };

        handleAddCustomer()
        handleAddOrder()
        for (let i = 0; i < invoiceData.items.length; i++) {
            handleAddOrderDetail(invoiceData.invoiceNumber, (invoiceData.items)[i])
        }
        logAdminAction("Tạo hóa đơn: " + invoiceData.invoiceNumber);

        window.location.reload()
    };

    return (
        <div className="invoice-container">
            <Menubar />
            <div className={`flex-grow-1 bg-light dashboard ${themeContext.theme}`}>
                <Header name={"Tạo hóa đơn"} />
                <div className="invoice-content p-4">
                    <div className="invoice-form-card">
                        <div className="invoice-form-body">
                            <form>
                                <div className="invoice-section">
                                    <h5 className="invoice-section-title">Thông Tin Chung</h5>
                                    <div className="invoice-grid">
                                        <div className="invoice-input-group">
                                            <label className="invoice-label">Mã Hóa Đơn</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập mã hóa đơn"
                                                className="invoice-input"
                                                value={invoiceData.invoiceNumber}
                                                readOnly
                                            />
                                        </div>
                                        <div className="invoice-input-group">
                                            <label className="invoice-label">Mã Khách Hàng</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập mã khách hàng"
                                                className="invoice-input"
                                                value={invoiceData.customerId}
                                                readOnly
                                            />
                                        </div>
                                        <div className="invoice-input-group">
                                            <label className="invoice-label">Tên Khách Hàng</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập tên khách hàng"
                                                className="invoice-input"
                                                value={invoiceData.customerName}
                                                onChange={(e) => handleInputChange("customerName", e.target.value)}
                                            />
                                        </div>
                                        <div className="invoice-input-group">
                                            <label className="invoice-label">Ngày Hóa Đơn</label>
                                            <input
                                                type="date"
                                                className="invoice-input"
                                                value={invoiceData.invoiceDate}
                                                onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="invoice-items-section">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h5 className="invoice-section-title mb-0">Chi Tiết Sản Phẩm</h5>
                                        <button
                                            type="button"
                                            className="invoice-btn invoice-btn-add"
                                            onClick={addItem}
                                        >
                                            + Thêm Sản Phẩm
                                        </button>
                                    </div>

                                    {invoiceData.items.map((item, index) => (
                                        <div key={index} className="invoice-item-row">
                                            <div className="invoice-suggestion-container">
                                                <label className="invoice-label">Tên Sản Phẩm</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập tên sản phẩm"
                                                    className="invoice-item-input"
                                                    value={item.productName}
                                                    onChange={(e) => handleItemChange(index, "productName", e.target.value)}
                                                />
                                                {item.suggestions && item.suggestions.length > 0 && (
                                                    <div className="invoice-suggestions">
                                                        {item.suggestions.map((product, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="invoice-suggestion-item"
                                                                onClick={() => selectSuggestion(index, product)}
                                                            >
                                                                {product.name} - {product.price ? product.price.toLocaleString() : 0} đ
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="invoice-label">Giá</label>
                                                <input
                                                    type="number"
                                                    placeholder="Giá"
                                                    className="invoice-item-input"
                                                    value={item.price}
                                                    onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div>
                                                <label className="invoice-label">Thành Tiền</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="invoice-item-input"
                                                    value={item.total.toLocaleString()}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="invoice-btn-remove"
                                                onClick={() => removeItem(index)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="invoice-total-section">
                                    <h5 className="invoice-total-title">
                                        Tổng Cộng: {totalAmount.toLocaleString()} đ
                                    </h5>
                                </div>



                                <div className="invoice-buttons">
                                    <button
                                        type="button"
                                        className="invoice-btn invoice-btn-submit"
                                        onClick={() => handleSubmit()}
                                    >
                                        <FaFileInvoice className="invoice-icon" />
                                        Tạo Hóa Đơn
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateInvoice;

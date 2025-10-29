import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import OrderList from "../../components/Order/OrderList";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";

const Order = () => {
    const themeContext = useContext(ThemeContext)
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Order"} />
            <div className={`flex-grow-1 bg-light ${themeContext.theme}`}>
                <Header name={"Quản lí đơn hàng"} />
                <div className="p-4">
                    <OrderList />
                </div>
            </div>
        </div>
    );
};

export default Order;

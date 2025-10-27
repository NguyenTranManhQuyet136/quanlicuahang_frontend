import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import OrderList from "../../components/Order/OrderList";

const Order = () => {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Order"} />
            <div className="flex-grow-1 bg-light">
                <Header name={"Quản lí đơn hàng"} />
                <div className="p-4">
                    <OrderList />
                </div>
            </div>
        </div>
    );
};

export default Order;

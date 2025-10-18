import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import CustomerList from "../../components/Customer/CustomerList";

const Customer = () => {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Customer"} />
            <div className="flex-grow-1 bg-light">
                <Header name={"Quản lí khách hàng"} />
                <div className="p-4">
                    <CustomerList />
                </div>
            </div>
        </div>
    );
};

export default Customer;

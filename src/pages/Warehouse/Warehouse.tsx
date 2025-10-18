import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import WarehouseList from "../../components/Warehouse/WarehouseList";

const Warehouse = () => {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Warehouse"} />
            <div className="flex-grow-1 bg-light">
                <Header name={"Quản lí nguồn cung"} />
                <div className="p-4">
                    <WarehouseList />
                </div>
            </div>
        </div>
    );
};

export default Warehouse;

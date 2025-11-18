import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Product from "./pages/Product/Product";
import Customer from "./pages/Customer/Customer";
import Order from "./pages/Order/Order";
import Warehouse from "./pages/Warehouse/Warehouse";
import User from "./pages/User/User";
import CreateInvoice from "./pages/CreateInvoice/CreateInvoice";

function App() {
    return (
        <div className="App">
            <title>Quản lí cửa hàng</title>

            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Product" element={<Product />} />
                    <Route path="/Customer" element={<Customer />} />
                    <Route path="/Order" element={<Order />} />
                    <Route path="/Warehouse" element={<Warehouse />} />
                    <Route path="/User" element={<User />}></Route>
                    <Route path="create-invoice" element={<CreateInvoice/>}></Route>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

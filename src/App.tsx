import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./modules/admin/pages/Login/Login";
import Dashboard from "./modules/admin/pages/Dashboard/Dashboard";
import Product from "./modules/admin/pages/Product/Product";
import Customer from "./modules/admin/pages/Customer/Customer";
import Order from "./modules/admin/pages/Order/Order";
import Warehouse from "./modules/admin/pages/Warehouse/Warehouse";
import User from "./modules/admin/pages/User/User";
import CreateInvoice from "./modules/admin/pages/CreateInvoice/CreateInvoice";
import TechStore from "./modules/user/pages/TechStore/TechStore";
import UserProfile from "./modules/user/pages/UserProfile/UserProfile";
import CartPage from "./modules/user/pages/Cart/CartPage";
import { CartProvider } from "./modules/user/context/CartContext";

function App() {
    return (
        <div className="App">
            <title>Quản lí cửa hàng</title>

            <BrowserRouter>
                <CartProvider>
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Product" element={<Product />} />
                        <Route path="/Customer" element={<Customer />} />
                        <Route path="/Order" element={<Order />} />
                        <Route path="/Warehouse" element={<Warehouse />} />
                        <Route path="/User" element={<User />}></Route>
                        <Route path="/store" element={<TechStore />} />
                        <Route path="/store/cart" element={<CartPage />} />
                        <Route path="/user/profile" element={<UserProfile />} />
                        <Route path="create-invoice" element={<CreateInvoice/>}></Route>
                        <Route
                            path="/"
                            element={<Navigate to="/login" replace />}
                        ></Route>
                    </Routes>
                </CartProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;

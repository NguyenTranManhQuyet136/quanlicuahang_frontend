import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./modules/admin/pages/Login/Login";
import Dashboard from "./modules/admin/pages/Dashboard/Dashboard";
import Product from "./modules/admin/pages/Product/Product";
import Customer from "./modules/admin/pages/Customer/Customer";
import Order from "./modules/admin/pages/Order/Order";
import Warehouse from "./modules/admin/pages/Warehouse/Warehouse";
import User from "./modules/admin/pages/User/User";
import CreateInvoice from "./modules/admin/pages/CreateInvoice/CreateInvoice";

import AccountManager from "./modules/superadmin/pages/AccountManager/AccountManager";
import HistoryManager from "./modules/superadmin/pages/HistoryManager/HistoryManager";

import Store from "./modules/user/pages/Store/Store";
import Cart from "./modules/user/pages/Cart/Cart";
import Profile from "./modules/user/pages/Profile/Profile";
import History from "./modules/user/pages/History/History";

function App() {
    return (
        <div className="App">
            <title>Aero Tech</title>

            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Product" element={<Product />} />
                    <Route path="/Customer" element={<Customer />} />
                    <Route path="/Order" element={<Order />} />
                    <Route path="/Warehouse" element={<Warehouse />} />
                    <Route path="/User" element={<User />}></Route>
                    <Route path="/create-invoice" element={<CreateInvoice />}></Route>

                    <Route path="/AccountManager" element={<AccountManager />} />
                    <Route path="/HistoryManager" element={<HistoryManager />} />

                    <Route path="/Store" element={<Store />}></Route>
                    <Route path="/Cart" element={<Cart />}></Route>
                    <Route path="/Profile" element={<Profile />}></Route>
                    <Route path="/History" element={<History />}></Route>
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

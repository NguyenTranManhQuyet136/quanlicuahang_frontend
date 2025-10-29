import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import ProductList from "../../components/Product/ProductList";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { useContext } from "react";

const Product = () => {
    const themeContext = useContext(ThemeContext)

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Product"} />
            <div className={`flex-grow-1 bg-light ${themeContext.theme }`}>
                <Header name={"Quản lí sản phẩm"} />
                <div className="p-4">
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default Product;

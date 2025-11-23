import Header from "../../components/Header/Header";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ProductList from "../../components/ProductList/ProductList";
import './Store.css';

const Store = () => {
    return (
        <div className="store-page">
            <Header />
            <HeroBanner />
            <CategoryNav />
            <ProductList />
        </div>
    );
}

export default Store;
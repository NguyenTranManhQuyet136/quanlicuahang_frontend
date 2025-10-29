import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import UserDetail from "../../components/User/UserDetail";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";

const User:React.FC = () => {
    const themeContext = useContext(ThemeContext)

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={""} />
            <div className={`flex-grow-1 bg-light ${themeContext.theme }`}>
                <Header name={"Tài khoản"} />
                <div className="p-4">
                    <UserDetail />
                </div>
            </div>
        </div>
    );
};

export default User;

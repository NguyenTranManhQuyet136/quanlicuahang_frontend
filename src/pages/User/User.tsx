import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import UserDetail from "../../components/User/UserDetail";

const User = () => {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={""} />
            <div className="flex-grow-1 bg-light">
                <Header name={"Tài khoản"} />
                <div className="p-4">
                    <UserDetail />
                </div>
            </div>
        </div>
    );
};

export default User;

import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";

const Dashboard = () => {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Menubar focus={"/Dashboard"} />
            <div className="flex-grow-1 bg-light">
                <Header name={"Dashboard"} />
                <div className="p-4"></div>
            </div>
        </div>
        
        

        
    );
};

export default Dashboard;

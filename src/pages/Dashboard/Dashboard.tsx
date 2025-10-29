import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { useContext } from "react";

const Dashboard = () => {
    const themeContext = useContext(ThemeContext) 
    return (
        <div className={`d-flex`}  style={{minHeight: "100vh"}}>
            <Menubar focus={"/Dashboard"} />
            <div className={`flex-grow-1 bg-light dashboard ${themeContext.theme}`} >
                <Header name={"Dashboard"}/>
                <div className="p-4"></div>
            </div>
        </div>   
       );


};

export default Dashboard;

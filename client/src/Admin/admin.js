import "../styles/auth.css";
import "../styles/admin.css";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import { useState } from "react";
const AdminPage = () => {
    const [showModel, setShowModel] = useState(false);

    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="addButton" onClick={() => {setShowModel((value) => !value)}}>Add account</button>
                    <div className="line"></div>
                    {showModel && 
                    <div className="bigBox">
                        <input className="accInput" placeholder="Username"/>
                        <input className="accInput" placeholder="Surname"/>
                        <input className="accInput" placeholder="First name"/>
                        <input className="accInput" placeholder="Password" />
                        <input className="accInput" placeholder="Departament"/>
                        <div className="adminButton">
                            <div className="adminText">Admin</div>
                            <input className="adminCheck"type="checkbox" />
                        </div>
                        <button className="createNewButton">Create</button>
                        <div className="line"></div>
                    </div>
                    }
                </div>}/>
                
        </div>
    )
}

export default AdminPage;
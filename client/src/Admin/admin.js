import "../styles/auth.css";
import "../styles/admin.css";
import ProfilePic from "../Images/profilePic.png";
import XMark from "../Images/xMark.png";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
const AdminPage = () => {
    const [showModel, setShowModel] = useState(false);
    const [users, setUsers] = useState({});
    useEffect(() => {
        axios.post("http://localhost:6969/getUsers", {userName:"24"}).then((response) => {
            console.log(response);
            setUsers(response.data);
        });

        
    }, []);
    let login = useRef({})
    console.log(login.current)
    const updateValues = (value, type) => {
        login.current[type] = value;
        
    }
    const deleteAccount = (username) => {
        axios.post("http://localhost:6969/deleteUser", {userName:username}).then((response) => {
            console.log(response);
            let tempObj = {...users};
            delete tempObj[username];
            setUsers({...tempObj});
        })
    }

    const createAccount = () => {
        if(!(login.current.surname && login.current.firstname && login.current.password && login.current.username && login.current.departament)) {
            console.log("empty input");
            console.log(login.current);
            return;
        }
        axios.post("http://localhost:6969/createAccount", {name:[login.current.surname, login.current.firstname], password:login.current.password, departament:login.current.departament, userName:login.current.username, adminAcces:login.current.admin})
        .catch(() => {
            console.log("Internal server error");
        }).then((response) => {
            console.log(response);
            let tempObj = {...users};
            tempObj[login.current.username] = {userName:login.current.username, departament:login.current.departament, adminAcces:login.current.admin};
            setUsers({...tempObj});
            setShowModel((value) => !value);
        });
    }

    return(

        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="addButton" onClick={() => {setShowModel((value) => !value)}}>Add account</button>
                    <div className="line"></div>
                    {showModel && 
                    <div className="bigBox">
                        <input className="accInput" placeholder="Username" onChange={(e) => {updateValues(e.target.value, "username")}}/>
                        <input className="accInput" placeholder="Surname" onChange={(e) => {updateValues(e.target.value, "surname")}}/>
                        <input className="accInput" placeholder="First name" onChange={(e) => {updateValues(e.target.value, "firstname")}}/>
                        <input className="accInput" placeholder="Password" onChange={(e) => {updateValues(e.target.value, "password")}}/>
                        <input className="accInput" placeholder="Departament" onChange={(e) => {updateValues(e.target.value, "departament")}}/>
                        <div className="adminButton">
                            <div className="adminText">Admin</div>
                            <input className="adminCheck"type="checkbox" onChange={(e) => {updateValues(e.target.checked, "admin")}}v/>
                        </div>
                        <button className="createNewButton" onClick={createAccount}>Create</button>
                        <div className="line"></div>
                    </div>
                    }
                    {Object.entries(users).map(([key, value]) => {
                        return(
                            <div className="userCard">
                                <img src={ProfilePic}/>
                                <div className="infoContainer">
                                    <div className="infoText">
                                        Username: {key}
                                    </div>
                                    <div className="infoText">
                                        Departament: {value.departament}
                                    </div>
                                    <div className="infoText">
                                        Admin: {value.adminAcces == undefined?"false":value.adminAcces}
                                    </div>
                                </div>
                                <button className="deleteButton"><img src={XMark} onClick={() => {deleteAccount(key)}}/></button>
                            </div>
                        );
                    })}
                </div>}/>
                
        </div>
    )
}

export default AdminPage;
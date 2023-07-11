import "../styles/auth.css";
import "../styles/admin.css";
import ProfilePic from "../Images/profilePic.png";
import XMark from "../Images/xMark.png";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom/dist";
const AdminPage = () => {
    const [showModel, setShowModel] = useState(false);
    const [users, setUsers] = useState({});

    let nav = useNavigate();

    useEffect(() => {
        if(document.cookie)
        {
            let username = document.cookie.split("=")[1].split("/")[0];
            let password = document.cookie.split("=")[1].split("/")[1];

            axios.post("http://localhost:6969/logIn", {userName: username, password: password})
            .catch(() => {console.log("wrong data")})
            .then((response) => {
            console.log(response);

            try{
                if(response.status === 200){
                    console.log("credentials confirmed")   
                }
            }catch{
                console.log("wrong input data")
                nav("/");  
            }
        });
        }
        
    }, []);

    useEffect(() => {
        axios.post("http://localhost:6969/getUsers", {userName:document.cookie.split("=")[1].split("/")[0]}).then((response) => {
                
                setUsers(response.data);
            });
    }, [])

    let login = useRef({})
    
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
                    <button className="backButton" onClick={() => {nav("/contacts")}}>Back</button>
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
                            <div key={key} className="userCard">
                                <img src={ProfilePic} alt={"someIMg"}/>
                                <div className="infoContainer">
                                    <div className="infoText">
                                        Username: {key}
                                    </div>
                                    <div className="infoText">
                                        Departament: {value.departament}
                                    </div>
                                    <div className="infoText">
                                        Admin: {value.adminAcces === undefined?"false":"true"}
                                    </div>
                                </div>
                                <button className="deleteButton"><img alt="someImg" src={XMark} onClick={() => {deleteAccount(key)}}/></button>
                            </div>
                        );
                    })}
                </div>}/>
                
        </div>
    )
}

export default AdminPage;
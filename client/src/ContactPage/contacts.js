import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import "../styles/contacts.css"
import ProfilePic from "../Images/profilePic.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { useParams } from "react-router-dom/dist";
const ContactPage = () => {
    const [showModel, setShowModel] = useState(false);
    const [users, setUsers] = useState({});

    let nav = useNavigate();



    useEffect(() => {
        axios.post("http://localhost:6969/getUsers", {userName:"24"}).then((response) => {
            console.log(response);
            setUsers(response.data);
        });

        
    }, []);

    useEffect(() => {
        console.log(document.cookie.split("=")[1].split("/")[2]);
        if(document.cookie.split("=")[1].split("/")[2]){
            setShowModel(true);
        }
    }, []);

    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <div className="buttonContainer">   
                        <button className="profileButton" onClick={() => {nav("/profile")}}>My Profile</button>
                        {showModel && <button className="loginButton" onClick={() => {nav("/admin")}}>Admin</button>}
                    </div>
                    <div className="line"></div>
                    <div className="contacts">
                        {Object.entries(users).map(([key, value]) => {
                            return(
                                <div className="userCard" onClick={() => {nav(`/message/${key}-${value.departament}`)}}>
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
                                    
                                </div>
                            );
                        })}
                    </div>

                </div>}/>
        </div>
    );
}

export default ContactPage;
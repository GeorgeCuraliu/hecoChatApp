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
        if(!document.cookie){nav("/"); }
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
    }, [])


    useEffect(() => {
        if(!document.cookie){
            nav("/");
        } else {
            axios.post("http://localhost:6969/getUsers", {userName:document.cookie.split("=")[1].split("/")[0]}).then((response) => {
                setUsers(response.data);
            });
            if(document.cookie.split("=")[1].split("/")[2]){
                setShowModel(true);
            }
        }
        
    }, []);

    

    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <div className="buttonContainer">   
                        <button className="profileButton" onClick={() => {nav("/profile")}}>My Profile</button>
                        <button className="profileButton" onClick={() => {nav("/"); document.cookie = "credentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";}}>Log Out</button>
                        {showModel && <button className="profileButton" onClick={() => {nav("/admin")}}>Admin</button>}
                    </div>
                    <div className="line"></div>
                    <div className="contacts">
                        {Object.entries(users).map(([key, value]) => {
                            return(
                                <div key={key} className="userCard" onClick={() => {nav(`/message/${key}-${value.departament}`)}}>
                                    <img src={ProfilePic}/>
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
                                    
                                </div>
                            );
                        })}
                    </div>

                </div>}/>
        </div>
    );
}

export default ContactPage;
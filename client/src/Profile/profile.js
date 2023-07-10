import "../styles/auth.css";
import "../styles/profile.css";
import ProfilePic from "../Images/profilePic.png";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { useEffect } from "react";
const ProfilePage = () => {

    let nav = useNavigate();

    

    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="backButton" onClick={() => {nav("/contacts")}}>Inapoi</button>
                    <div className="dataContainer">
                        <div className="flex">
                            <img src={ProfilePic} className="profilePic"/>
                                <div className="usernameBox">
                                    Username: {document.cookie.split("=")[1].split("/")[0]}
                                </div>
                        </div>
                        
                        <div className="line">

                        </div>
                        <div className="flex">
                            <div className="table">
                                De la
                            </div>
                            <div className="table">
                                In hala
                            </div>
                            <div className="table">
                                Necesitate
                            </div>
                            <div className="table">
                                Cat timp
                            </div>
                        </div>
                    </div>
                </div>}/>
        </div>
    )
}

export default ProfilePage;
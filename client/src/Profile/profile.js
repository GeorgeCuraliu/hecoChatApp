import "../styles/auth.css";
import "../styles/profile.css";
import ProfilePic from "../Images/profilePic.png";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const ProfilePage = (props) => {

    let nav = useNavigate();

    const [message, setMessage] = useState({});

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
        if(props.message){
            console.log("message arrived in profile page")
            if(message && message[props.message.from]){
                let tempObj = {...message};
                delete tempObj[props.message.from];
                setMessage({...tempObj});
            }
            setMessage(val => ({ [props.message.from]: props.message, ...val }));
        }
    }, [props.message])

    useEffect(() => {
        if(!document.cookie)
        {
            nav("/");
        } else {
            axios.post("http://localhost:6969/getMessages", {userName: document.cookie.split("=")[1].split("/")[0]})
            .catch(err => {
            console.log("something bad happened -- users fault")
            console.log(err)
            })
            .then((response) => {
                setMessage(response.data)
                console.log(response)
            }) 
        }
    }, []);



    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <button className="backButton" onClick={() => {nav("/contacts")}}>Inapoi</button>
                    <div className="dataContainer">
                        <div className="flex">
                            <img src={ProfilePic} className="profilePic" alt="noImg"/>
                                <div className="usernameBox">
                                    My profile
                                </div>
                        </div>
                        
                        <div className="line"></div>
                        <div className="flex">
                            {message && Object.entries(message).map(([key, value]) => {
                                return(
                                    <div key={key} className="message"> 
                                        <div>From: {key}</div>
                                        <div>Location: {value.hangar}</div>
                                        <div>Service: {value.for}</div>
                                        <div>Time: {value.durations}</div>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                </div>}/>
        </div>
    )
}

export default ProfilePage;
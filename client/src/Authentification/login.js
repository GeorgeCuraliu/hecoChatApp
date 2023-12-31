import "../styles/auth.css";
import UserPic from "../Images/userPic.png"; 
import RightArrow from "../Images/rightArrow.png";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import axios from "axios";
import { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom/dist";
const LoginPage = () => {

    const loginData = useRef({});
    
    let nav = useNavigate();

    useEffect(() => {
        if(document.cookie) {
            console.log(document.cookie);
            loginData.current.username = document.cookie.split("=")[1].split("/")[0];
            loginData.current.password = document.cookie.split("=")[1].split("/")[1];
            login();
        }
    }, []);

    const login = () => {
        axios.post("http://localhost:6969/logIn", {userName: loginData.current.username, password: loginData.current.password})
        .catch(() => {console.log("wrong data")})
        .then((response) => {
            console.log(response);

            try{
                if(response.status === 200){
                    document.cookie = `credentials = ${loginData.current.username}/${loginData.current.password}/${response.data}`;
                    nav("/contacts");   
                }
            }catch{
                console.log("wrong input data")
            }
        });
    }

    const updateData = (value, key) => {
        loginData.current[key] = value;
    }

    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <img src = {UserPic} className="pic"/>  
                    <div className="text">Username</div>
                    <input className="input" onChange={(e) => {updateData(e.target.value, "username")}}/>
                    <div className="text">Password</div>
                    <input className="input" onChange={(e) => {updateData(e.target.value, "password")}}/>
                    <button className="button" onClick={login}><img src={RightArrow}/></button>
                </div>}/>
            
        </div>
    )
}

export default LoginPage;
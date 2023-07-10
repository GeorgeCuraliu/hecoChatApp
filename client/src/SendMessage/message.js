import "../styles/auth.css";
import "../styles/message.css";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import ProfilePic from "../Images/profilePic.png";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom/dist";
import axios from "axios";
const MessagePage = () => {

    let { ref } = useParams();
    let messageData = useRef({});
    let nav = useNavigate();

    const [button, setButton] = useState({});
    const [service, setService] = useState({});
    const [time, setTime] = useState({});

    const updateData = (value, key) => {
        messageData.current[key] = value;
        console.log(messageData);
    }

    useEffect(() => {console.log(messageData)}, [button])

    useEffect(() => {
        axios.post("http://localhost:6969/sendMessage", {to: ref.split("-")[0], from: document.cookie.split("=")[1].split("/")[0], hangar: button, for: service, time: time, date: new Date(), message: messageData})
        .catch(console.log("idk"))
        .then((response) => {
            //console.log(response);
        })


    }, []);

    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                <button className="backButton" onClick={() => {nav("/contacts")}}>Inapoi</button>
                <div className="dataContainer">
                    <div className="flex">
                        <img src={ProfilePic} className="profilePic"/>
                        <div className="infoBox">
                            <div className="nameSpace">
                                Username: {ref.split("-")[0]}
                            </div>
                            <div className="nameSpace">
                                Departament: {ref.split("-")[1]}
                            </div>
                        </div>
                    </div>
                    
                    <div className="line">

                    </div>
                    <div className="nameSpace">
                        Unde?
                    </div>
                    <div className="flex">
                        
                        {button === "Formare" ? <button className="hangarButton" style={{backgroundColor: "white"}}>Formare</button>: <button className="hangarButton" onClick={() => {setButton("Formare"); updateData(button, "button")}}>Formare</button>}
                        {button === "Calire" ? <button className="hangarButton" style={{backgroundColor: "white"}}>Calire</button>: <button className="hangarButton" onClick={() => {setButton("Calire"); updateData(button, "button")}}>Calire</button>}
                        {button === "Galvanizare" ? <button className="hangarButton" style={{backgroundColor: "white"}}>Galvanizare</button>: <button className="hangarButton" onClick={() => {setButton("Galvanizare"); updateData(button, "button")}}>Galvanizare</button>}
                        {button === "Ambalare" ? <button className="hangarButton" style={{backgroundColor: "white"}}>Ambalare</button>: <button className="hangarButton" onClick={() => {setButton("Ambalare"); updateData(button, "button")}}>Ambalare</button>}
                        {button === "Calitate" ? <button className="hangarButton" style={{backgroundColor: "white"}}>Calitate</button>: <button className="hangarButton" onClick={() => {setButton("Calitate"); updateData(button, "button")}}>Calitate</button>}
                        {button === "Mentenanta" ? <button className="hangarButton" style={{backgroundColor: "white"}}>Mentenanta</button>: <button className="hangarButton" onClick={() => {setButton("Mentenanta"); updateData(button, "button")}}>Mentenanta</button>}
                    </div>
                    <div className="nameSpace">
                        Ce?
                    </div>
                    <div className="flex">
                        {service === "Stivuitor" ? <button className="jobButton" style={{backgroundColor: "white"}}>Stivuitor</button>: <button className="jobButton" onClick={() => {setService("Stivuitor"); updateData(service, "service")}}>Stivuitor</button>}
                        {service === "Transpalet" ? <button className="jobButton" style={{backgroundColor: "white"}}>Transpalet</button>: <button className="jobButton" onClick={() => {setService("Transpalet"); updateData(service, "service")}}>Transpalet</button>}
                        {service === "Control" ? <button className="jobButton" style={{backgroundColor: "white"}}>Control</button>: <button className="jobButton" onClick={() => {setService("Control"); updateData(service, "service")}}>Control</button>}
                    </div>
                    <div className="nameSpace">
                        Cand?
                    </div>
                    <div className="flex">
                        {time === "Acum" ? <button className="timeButton" style={{backgroundColor: "white"}}>Acum</button>: <button className="timeButton"   onClick={() => {setTime("Acum"); updateData(time, "time")}}>Acum</button>}
                        {time === "5 min" ? <button className="timeButton" style={{backgroundColor: "white"}}>5 min</button>: <button className="timeButton" onClick={() => {setTime("5 min"); updateData(time, "time")}}>5 min</button>}
                        {time === "10 min" ? <button className="timeButton" style={{backgroundColor: "white"}}>10 min</button>: <button className="timeButton" onClick={() => {setTime("10 min"); updateData(time, "time")}}>10 min</button>}
                    </div>
                    <div className="nameSpace">
                        Observatii
                    </div>
                    <div className="flex">
                        <input className="inputObs" placeholder="Scrie aici" onChange={(e) => {updateData(e.target.value, "message")}}/>
                        <button className="send" onClick = {() => {console.log(button)}}>Trimite</button>
                    </div>
                </div>
            </div>}/>
            
        </div>
    )
}

export default MessagePage;
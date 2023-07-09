import "../styles/auth.css";
import "../styles/message.css";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import ProfilePic from "../Images/profilePic.png";
const MessagePage = () => {
    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                <button className="backButton">Inapoi</button>
                <div className="dataContainer">
                    <div className="flex">
                        <img src={ProfilePic} className="profilePic"/>
                        <div className="infoBox">
                            <div className="nameSpace">
                                Nume:
                            </div>
                            <div className="nameSpace">
                                Prenume:
                            </div>
                        </div>
                    </div>
                    <div className="nameSpace">
                        Departament:
                    </div>
                    <div className="nameSpace">
                        Functie:
                    </div>
                    <div className="line">

                    </div>
                    <div className="nameSpace">
                        Unde?
                    </div>
                    <div className="flex">
                        <button className="hangarButton">Hala 1</button> 
                        <button className="hangarButton">Hala 2</button>
                        <button className="hangarButton">Hala 3</button>
                        <button className="hangarButton">Hala 4</button> 
                        <button className="hangarButton">Hala 5</button>
                        <button className="hangarButton">Hala 6</button>
                    </div>
                    <div className="nameSpace">
                        Ce?
                    </div>
                    <div className="flex">
                        <button className="jobButton">Stivuitor</button> 
                        <button className="jobButton">Transpalet</button>
                        <button className="jobButton">Control</button>
                    </div>
                    <div className="nameSpace">
                        Cand?
                    </div>
                    <div className="flex">
                        <button className="timeButton">Acum</button> 
                        <button className="timeButton">5 min</button>
                        <button className="timeButton">10 min</button>
                    </div>
                    <div className="nameSpace">
                        Observatii
                    </div>
                    <div className="flex">
                        <input className="inputObs" placeholder="Scrie aici"/>
                        <button className="send">Trimite</button>
                    </div>
                </div>
            </div>}/>
            
        </div>
    )
}

export default MessagePage;
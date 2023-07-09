import "../styles/auth.css";
import "../styles/profile.css";
import ProfilePic from "../Images/profilePic.png";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
const ProfilePage = () => {
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
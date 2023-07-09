import "../styles/auth.css";
import UserPic from "../Images/userPic.png"; 
import RightArrow from "../Images/rightArrow.png";
import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
const LoginPage = () => {
    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <img src = {UserPic} className="pic"/>  
                    <div className="text">Username</div>
                    <input className="input"/>
                    <div className="text">Password</div>
                    <input className="input"/>
                    <button className="button"><img src={RightArrow}/></button>
                </div>}/>
            
        </div>
    )
}

export default LoginPage;
import "../styles/auth.css";
import UserPic from "../Images/userPic.png"; 

const LoginPage = () => {
    return(
        <div>
            <header>
                <p>HECO Chat</p>
            </header>
            <div className="body">
                <img src = {UserPic} className="pic"/>  
                <div className="text">Username</div>
                <input className="input"/>
                <div className="text">Password</div>
                <input className="input"/>
                <button className="button">mama</button>
            </div>
        </div>
    )
}

export default LoginPage
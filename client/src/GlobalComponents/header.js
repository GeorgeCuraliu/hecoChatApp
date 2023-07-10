import "../styles/auth.css"
import Heco from "../Images/hecoLogoTrans.png"
const Header = () => {
    return(
        <div>
            <header>
                <p>HECO Chat</p>
                <img className="logo" src={Heco}/>
            </header>
            <div className="space">

            </div>
        </div>
    );
}

export default Header;
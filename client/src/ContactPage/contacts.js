import Header from "../GlobalComponents/header.js";
import Body from "../GlobalComponents/body.js";
import "../styles/contacts.css"

const ContactPage = () => {
    return(
        <div>
            <Header />
            <Body component = {
                <div className="body">
                    <div className="buttonContainer">   
                        <button className="profileButton">My Profile</button>
                        <button className="loginButton">Login</button>
                    </div>
                    <div className="categories">
                        <div className="category">
                            <p>Birouri</p>
                        </div>
                        <div className="category">
                            <p>Stivuitor</p>
                        </div>
                        <div className="category">
                            <p>Ambalare</p>
                        </div>
                    </div>

                </div>}/>
        </div>
    );
}

export default ContactPage;
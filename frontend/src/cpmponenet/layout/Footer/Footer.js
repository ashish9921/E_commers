import React from 'react'
import playStore from "../../../images/playstore.png"
import AppStore from "../../../images/Appstore.png"
import "./Footer.css"
export const Footer = () => {
return (
<footer id='footer'>
    <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Download our app for Android and ios</p>
        <img src={playStore} alt="playstore" />
        <img src={AppStore} alt="Appstore" />
    </div>

    <div className="midFooter">
        <h1>Mega</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; Ashish</p>

    </div>

    <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/A_s_h_i_s_h99">Instagram</a>
        <a href="http://www.youtube.com/channel/UCzHKSFjaSzXqM7aq6JQEJuQ">Youtube</a>
        <a href="https://www.linkedin.com/in/ashish-dudhe-/">Linked IN</a>
    </div>
</footer>
);
};
export default Footer
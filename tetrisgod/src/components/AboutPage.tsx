import React from "react"
import '../css/App.css';
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";


const AboutPage: React.FC = () => {
    return (
        <div>
            <MyNavbar/>
            <p> About text </p>
            <Footer/>
        </div>
    )
};

export default AboutPage
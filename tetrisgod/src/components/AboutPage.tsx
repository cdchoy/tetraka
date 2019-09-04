import React from "react"
import '../css/App.css';
import Navbar from "./Navbar";
import Footer from "./Footer";


const AboutPage: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="AboutPage">
                <p>An About Page!</p>
            </div>
            <Footer/>
        </div>

    )
};

export default AboutPage
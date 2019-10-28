import React from "react"
import '../css/App.css';
import Navbar from "./Navbar";
import Footer from "./Footer";


const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="HomePage">
                <h1>Welcome to Tetraka</h1>
                <p> This is our home page. It will feature announcements, statistics, and a chat room in the future! </p>
                <p> There is still a LOT of work for us to do.</p>
            </div>
            <Footer/>
        </div>
    )
};

export default HomePage
import React from "react"
import '../css/App.css';
import Navbar from "./Navbar";
import PlayContainer from "./PlayContainer";
import Footer from "./Footer";


const PlayPage: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <PlayContainer/>
            <Footer/>
        </div>
    )
};

export default PlayPage
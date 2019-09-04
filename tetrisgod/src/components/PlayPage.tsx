import React from "react"
import '../css/App.css';
import MyNavbar from "./MyNavbar";
import PlayContainer from "./PlayContainer";
import Footer from "./Footer";


const PlayPage: React.FC = () => {
    return (
        <div>
            <MyNavbar/>
            <PlayContainer/>
            <Footer/>
        </div>
    )
};

export default PlayPage
import React from "react"
import '../css/App.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import GameContainer from "./GameContainer";

const PlayPage: React.FC = () => {
    return (
        <div>
            <Navbar/>

            <div className="PlayPage">
                <h1>Play Page</h1>
                <p>This will be where we play tetris</p>
                <GameContainer columns={10} rows={20}/>
            </div>

            <Footer/>
        </div>

    )
};

export default PlayPage
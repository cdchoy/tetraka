import React from "react"
import logo from "../tblock.png";
import {Link} from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="App">
            <div className="LandingPage">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Welcome to TetrisGod</h1>
                <Link to={"/home"} className="NavItemText"> Click here to Begin </Link>
            </div>
        </div>
    )
};

export default LandingPage
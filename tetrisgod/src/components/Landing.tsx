
import React from "react"
import logo from "../logo.svg";
import '../css/App.css';


const Landing: React.FC = () => {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Under Development. Pardon our mess.
                </p>
            </header>
        </div>
    )
};

export default Landing
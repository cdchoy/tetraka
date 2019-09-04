import React from "react"
import '../css/App.css';
import logo from "../logo.svg";


const HomePage: React.FC = () => {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Under Development. Pardon our mess.</p>
            </div>
        </div>
    )
};

export default HomePage
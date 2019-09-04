import React from "react"
import '../css/App.css';
import logo from "../imgs/logo.svg";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TodoPage: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Under Development. Pardon our mess.</p>
                </div>
            </div>
            <Footer/>
        </div>

    )
};

export default TodoPage
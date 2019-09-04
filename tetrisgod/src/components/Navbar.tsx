import React from "react"
import {Route} from "react-router";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <header>
            <div className="Navbar">
                <ul>
                    <li className="NavItem"> <Link to="/home" className="NavItemText">Home</Link> </li>
                    <li className="NavItem"> <Link to="/about" className="NavItemText">About</Link> </li>
                </ul>
            </div>
            <div className="App-intro">
                <Route exact path="/" component={HomePage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/about" component={AboutPage}/>
            </div>
        </header>
    )
};

export default Navbar
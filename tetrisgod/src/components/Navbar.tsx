import React from "react"
import {Route} from "react-router";
import {Link} from "react-router-dom";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import PlayPage from "./PlayPage";
import LandingPage from "./LandingPage";

const Navbar: React.FC = () => {
    return (
        <header>
            <div className="Navbar">
                <ul>
                    <li className="NavItem"> <Link to="/home" className="NavItemText">Home</Link> </li>
                    <li className="NavItem"> <Link to="/play" className="NavItemText">Play</Link> </li>
                    <li className="NavItem"> <Link to="/" className="NavItemText">Leaderboards</Link> </li>
                    <li className="NavItem"> <Link to="/about" className="NavItemText">About</Link> </li>
                </ul>
            </div>
            <div className="App-intro">
                <Route exact path="/" component={LandingPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/play" component={PlayPage}/>
                <Route path="/about" component={AboutPage}/>
            </div>
        </header>
    )
};

export default Navbar
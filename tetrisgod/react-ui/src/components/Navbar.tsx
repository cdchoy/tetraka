import React from "react"
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <header>
            <div>
                <ul className="Navbar">
                    <li className="NavItem"> <Link to="/home" className="NavItemText">Home</Link> </li>
                    <li className="NavItem"> <Link to="/play" className="NavItemText">Play</Link> </li>
                    <li className="NavItem"> <Link to="/leaderboards" className="NavItemText">Leaderboards</Link> </li>
                    <li className="NavItem"> <Link to="/about" className="NavItemText">About</Link> </li>
                </ul>
            </div>
        </header>
    )
};

export default Navbar
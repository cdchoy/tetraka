import React from "react"
import logo from "./logo.svg";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <nav>
                    <ul className="Navbar">
                        <li className="NavItem"><a href="/" className="NavItemText">Play</a></li>
                        <li className="NavItem"><a href="/" className="NavItemText">Leaderboards</a></li>
                        <li className="NavItem"><a href="/" className="NavItemText">About</a></li>
                    </ul>
                </nav>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Under Development. Pardon our mess.
                    </p>
                </header>
            </div>
        )
    }
}

export default Header
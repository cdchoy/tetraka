import React from "react"

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
            </div>
        )
    }
}

export default Header
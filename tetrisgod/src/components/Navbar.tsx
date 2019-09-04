import React from "react"

const Navbar: React.FC = () => {
    return (
        <div>
            <nav>
                <ul className="Navbar">
                    <li className="NavItem"><a href="/" className="NavItemText">Home</a></li>
                    <li className="NavItem"><a href="/" className="NavItemText">Play</a></li>
                    <li className="NavItem"><a href="/" className="NavItemText">Leaderboards</a></li>
                    <li className="NavItem"><a href="/" className="NavItemText">About</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
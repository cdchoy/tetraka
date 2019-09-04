
import React from "react"
import NavbarItem from "./NavbarItem"

const MyNavbar: React.FC = () => {
    return (
        <div>
            <nav>
                <ul className="Navbar">
                    <NavbarItem text={"Home"} target={"/"}/>
                    <NavbarItem text={"PlayContainer"} target={"/"}/>
                    <NavbarItem text={"Leaderboards"} target={"/"}/>
                    <NavbarItem text={"About"} target={"/"}/>
                    <NavbarItem text={"Profile"} target={"/"}/>
                </ul>
            </nav>
        </div>
    )
};

export default MyNavbar
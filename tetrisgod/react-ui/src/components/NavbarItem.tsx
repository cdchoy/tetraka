import React from "react"
import {Link} from "react-router-dom";

type NavbarItemProps = {
    target: string,
    text: string
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
    return (
        <li className="NavItem">
            <Link to={props.target} className="NavItemText"> {props.text} </Link>
        </li>
    )
};

export default NavbarItem
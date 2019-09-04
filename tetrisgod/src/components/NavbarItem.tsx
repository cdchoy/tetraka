
import React from "react"
import {Link} from "react-router-dom";

type NavbarItemProps = {
    target: string,
    text: string
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
    return (
        <li className="NavItem">
            <a href={props.target} className="NavItemText">{props.text}</a>
            <Link to={props.target}> Click Here </Link>
        </li>
    )
};

export default NavbarItem
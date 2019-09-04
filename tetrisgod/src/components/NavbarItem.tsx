
import React from "react"

type NavbarItemProps = {
    target: string,
    text: string
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
    return (
        <li className="NavItem">
            <a href={props.target} className="NavItemText">{props.text}</a>
        </li>
    )
};

export default NavbarItem
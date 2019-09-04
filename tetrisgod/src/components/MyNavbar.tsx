import React from "react"
import NavbarItem from "./NavbarItem"
import App from "./App";
import {Redirect, Route, Switch} from "react-router";
import HomePage from "./HomePage";
import PlayPage from "./PlayPage";
import AboutPage from "./AboutPage";

const MyNavbar: React.FC = () => {
    return (
        <div>
            <nav>
                <ul className="Navbar">
                    <NavbarItem text={"Home"} target={"/home"}/>
                    <NavbarItem text={"Play"} target={"/play"}/>
                    <NavbarItem text={"Leaderboards"} target={"/"}/>
                    <NavbarItem text={"About"} target={"/AboutPage"}/>
                    <NavbarItem text={"Profile"} target={"/"}/>
                </ul>
            </nav>

            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/play" component={PlayPage} />
                <Route path="/about" component={AboutPage} />
                <Redirect to="/"/>
            </Switch>
        </div>
    )
};

export default MyNavbar
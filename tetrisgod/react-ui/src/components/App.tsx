import React from 'react';
import '../css/App.css';
import {Route} from "react-router";
import TodoPage from "./TodoPage";
import HomePage from "./HomePage";
import PlayPage from "./PlayPage";
import AboutPage from "./AboutPage";
import LandingPage from "./LandingPage";


const App = () => {
    return (
        <div>
            <div className="App-intro">
                <Route exact path="/" component={LandingPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/play" component={PlayPage}/>
                <Route path="/leaderboards" component={TodoPage}/>
                <Route path="/about" component={AboutPage}/>
            </div>
        </div>
    );
};

export default App;
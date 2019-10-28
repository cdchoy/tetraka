import React from 'react';
import './css/App.css';
import {Route} from "react-router";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import PlayPage from "./components/PlayPage";
import TodoPage from "./components/TodoPage";
import AboutPage from "./components/AboutPage";
import {SocketContext} from "./components/SocketContext";

class App extends React.Component {
    static contextType = SocketContext;

    componentDidMount() {
        this.context.init();
    }

    render() {
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
    }

}

export default App;

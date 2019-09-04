import React from 'react';
import '../css/App.css';
import logo from "../logo.svg";
import MyNavbar from "./MyNavbar";

type AppState = {
    location: string
}

class App extends React.Component<{},AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            location: "landing"
        };
    }

    render() {
        return (
            <div>
                <MyNavbar/>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>Under Development. Pardon our mess.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
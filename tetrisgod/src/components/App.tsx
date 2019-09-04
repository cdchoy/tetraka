import React from 'react';
import '../css/App.css';
import Navbar from "./Navbar";

type AppState = {}

class App extends React.Component<{},AppState> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navbar/>
            </div>
        );
    }
}

export default App;
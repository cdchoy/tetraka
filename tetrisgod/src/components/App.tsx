
import React from 'react';
import '../css/App.css';
import Navbar from "./Navbar"
import PlayContainer from "./PlayContainer";
import Footer from "./Footer";
import Landing from "./Landing"

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
        let content;
        switch (this.state.location) {
            case "landing":
                content = (
                    <div>
                        <Navbar />
                        <Landing />
                        <Footer />
                    </div>
                );
                break;
            case "play":
                content = (
                    <div>
                        <Navbar />
                        <PlayContainer />
                        <Footer />
                    </div>
                );
                break;
            default:
                content = (<h1>Error: Unknown page location access</h1>);
        }

        return content;
    }
}

export default App;
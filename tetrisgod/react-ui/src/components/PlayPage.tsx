import React from "react"
import '../css/App.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {SocketContext} from "./SocketContext";

type PlayPageState = {}

class PlayPage extends React.Component<{},PlayPageState> {
    static contextType = SocketContext;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        let socket = this.context;
        return (
            <div>
                <Navbar/>

                <div className="PlayPage"
                    onKeyDown={socket.emitKeyDown}
                    onKeyUp={socket.emitKeyUp}
                    tabIndex={0}
                >
                    <h1>Play Page</h1>
                    <p>This will be where we play tetris</p>
                </div>


                <Footer/>
            </div>

        )
    }
}

export default PlayPage
import React from "react"
import '../css/App.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {SocketContext} from "./SocketContext";

type PlayPageState = {}

class PlayPage extends React.Component<{},PlayPageState> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navbar/>

                <SocketContext.Consumer>
                    {socket =>
                        <div className="PlayPage"
                        onKeyDown={socket.emitKeyDown}
                        onKeyUp={socket.emitKeyUp}
                        tabIndex={0}
                        >
                            {console.log(socket)}
                            <h1>Play Page</h1>
                            <p>This will be where we play tetris</p>
                        </div>
                    }
                </SocketContext.Consumer>


                <Footer/>
            </div>

        )
    }
}
PlayPage.contextType = SocketContext;


export default PlayPage
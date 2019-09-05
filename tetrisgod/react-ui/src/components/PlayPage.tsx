import React from "react"
import '../css/App.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {emitKeyDown} from "../API";

type PlayPageState = {}

class PlayPage extends React.Component<{},PlayPageState> {
    constructor(props: any) {
        super(props);
        this.state = {};
        this.onKeyDown.bind(this)
    }

    onKeyDown(e : React.KeyboardEvent<any>) {
        console.log(e.keyCode);
        emitKeyDown(e)
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="PlayPage"
                     onKeyDown={this.onKeyDown}
                     tabIndex={0}
                >
                    <h1>Play Page</h1>
                    <p>
                        This will be where we play tetris
                    </p>
                </div>
                <Footer/>
            </div>

        )
    }
}

export default PlayPage
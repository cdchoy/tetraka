import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {SocketContext} from "./components/SocketContext";
import {SocketService} from "./components/SocketService";

const socket = new SocketService();

ReactDOM.render(
    <BrowserRouter><SocketContext.Provider value={socket}>
        <App/>
    </SocketContext.Provider></BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



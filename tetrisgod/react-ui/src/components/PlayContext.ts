
import React from "react"
import {SocketService} from "./SocketService";

export const PlayContext: React.Context<SocketService> =
    React.createContext(new SocketService());


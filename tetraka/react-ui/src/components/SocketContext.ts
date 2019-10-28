import React from "react";
import {SocketService} from "./SocketService";

export const SocketContext: React.Context<SocketService> =
    React.createContext(new SocketService());


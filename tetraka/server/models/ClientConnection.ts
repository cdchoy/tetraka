import * as SocketIO from "socket.io"
import {Input} from "./Input";


class ClientConnection {
    private id: string;
    private socket: SocketIO.Socket;
    public input: Input;

    constructor(socket: SocketIO.Socket) {
        this.id = socket.client.id;
        this.socket = socket;
        this.input = new Input();
    }
}

export default ClientConnection;
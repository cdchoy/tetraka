import {Input} from "./Input";
import {Game} from "./Game";

let SOCKET_LIST : any = {};
let GAME_LIST : any = {};

function socketListener(client: any) {
    onConnect(client);
    client.on('disconnect', () => { onDisconnect(client); });
    client.on('keyPress', () => { onKeyPress(client); })
}

const onConnect = (socket: any) => {
    socket.id = Math.random();
    socket.keyInput = new Input();

    SOCKET_LIST[socket.id] = socket;
    GAME_LIST[socket.id] = new Game();
};

const onDisconnect = (socket: any) => {
    delete SOCKET_LIST[socket.id];
};

const onKeyPress = (socket: any) => {
    console.log("KEY PRESSED!");
    if (socket.data.inputId === 'moveleft')
        socket.keyInput.pressingMoveLeft = socket.data.state;
    else if (socket.data.inputId === 'rotateright')
        socket.keyInput.pressingRotateRight = socket.data.state;
    else if (socket.data.inputId === 'moveright')
        socket.keyInput.pressingMoveRight = socket.data.state;
    else if (socket.data.inputId === 'softdrop')
        socket.keyInput.pressingSoftDrop = socket.data.state;
    else if (socket.data.inputId === 'harddrop')
        socket.keyInput.pressingHardDrop = socket.data.state;
    else if (socket.data.inputId === 'hold')
        socket.keyInput.pressingHold = socket.data.state;
};

export default socketListener;
import {Input} from "./Input";

let GAME_LIST : any = {};

function socketListener(socket: any) {
    socket.id = Math.random();
    socket.keyInput = new Input();
    // SOCKET_LIST[socket.id] = socket;
}

const onConnect = (socket: any) => {
    socket.id = Math.random();
    socket.keyInput = new Input();
    // SOCKET_LIST[socket.id] = socket;
};

const onDisconnect = (socket: any) => {
    // delete SOCKET_LIST[socket.id];
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


setInterval(() => {
    // for (let socket of SOCKET_LIST) {
    //     let game = GAME_LIST[socket.id];
    //     game.update(socket);
    // }
},1000/25);  // 25fps

export default socketListener;
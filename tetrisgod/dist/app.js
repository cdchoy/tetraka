"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var Modules_1 = require("./Modules");
var app = express_1.default();
var port = process.env.PORT || 2000;
app.set("port", port);
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/client/index.html');
});
app.use(express_1.default.static(__dirname + '/client'));
var server = new http_1.default.Server(app);
server.listen(port, function () {
    console.log("listening on " + port);
});
console.log("Server started");
var SOCKET_LIST = {};
var GAME_LIST = {};
var io = require('socket.io')(server, {});
io.on('connection', function (socket) {
    onConnect(socket);
    socket.on('disconnect', function () { onDisconnect(socket); });
    socket.on('keyPress', function () { onKeyPress(socket); });
});
function onConnect(socket) {
    socket.id = Math.random();
    var keyInput = new Modules_1.Input();
    socket.keyInput = keyInput;
    SOCKET_LIST[socket.id] = socket;
    GAME_LIST[socket.id] = new Modules_1.Game();
}
function onDisconnect(socket) {
    delete SOCKET_LIST[socket.id];
}
function onKeyPress(socket) {
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
}
setInterval(function () {
    for (var _i = 0, SOCKET_LIST_1 = SOCKET_LIST; _i < SOCKET_LIST_1.length; _i++) {
        var socket = SOCKET_LIST_1[_i];
        var game = GAME_LIST[socket.id];
        game.update(socket);
    }
}, 1000 / 25);

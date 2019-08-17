"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var serv = require('http').Server(app);
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
serv.listen(2000);
console.log("Server started");
var SOCKET_LIST = {};
var PLAYER_LIST = {};
var Player = function (id) {
    var self = {
        id: id,
        pressingLeft: false,
        pressingUp: false,
        pressingRight: false,
        pressingDown: false,
        pressingSpace: false,
        pressingShift: false
    };
    return self;
};
var io = require('socket.io')(serv, {});
io.socket.on('connection', function (socket) {
    socket.id = Math.random();
    var player = Player(socket.id);
    SOCKET_LIST[socket.id] = socket;
    PLAYER_LIST[socket.id] = player;
    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
    socket.on('keyPress', function () {
        if (socket.data.inputId === 'left')
            player.pressingLeft = socket.data.state;
        else if (socket.data.inputId === 'up')
            player.pressingUp = socket.data.state;
        else if (socket.data.inputId === 'right')
            player.pressingRight = socket.data.state;
        else if (socket.data.inputId === 'down')
            player.pressingDown = socket.data.state;
        else if (socket.data.inputId === 'space')
            player.pressingDown = socket.data.state;
        else if (socket.data.inputId === 'shift')
            player.pressingDown = socket.data.state;
    });
});
setInterval(function () {
}, 1000 / 25);
//# sourceMappingURL=app.js.map
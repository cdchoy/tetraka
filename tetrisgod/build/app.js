"use strict";
var express = require('express');
var app = express();
var serv = require('http').Server(app);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
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
var Tetrimino = function (type) {
    var self = {
        type: type,
        x: 0,
        y: 0,
        rotation: 0
    };
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
        if (data.inputId === 'left')
            player.pressingLeft = data.state;
        else if (data.inputId === 'up')
            player.pressingUp = data.state;
        else if (data.inputId === 'right')
            player.pressingRight = data.state;
        else if (data.inputId === 'down')
            player.pressingDown = data.state;
        else if (data.inputId === 'space')
            player.pressingDown = data.state;
        else if (data.inputId === 'shift')
            player.pressingDown = data.state;
    });
});
setInterval(function () {
}, 1000 / 25);
//# sourceMappingURL=app.js.map
// tetrisgod/app.ts
// Main entrypoint for our application

import User from "./Modules";
import Pixel from "./Modules";

import express from "express";
import http from "http";

/* Server Initialization */
const app = express();
const server = new http.Server(app);

app.get('/', function(request:any, response:any) {
	response.sendFile(__dirname + '/client/index.html');
})
app.use('/client',express.static(__dirname + '/client'));

server.listen(2000);  // TODO: change variable when hosted on heroku
console.log("Server started");
/* END Server Initialization */

let SOCKET_LIST : Array<number> = {};
let PLAYER_LIST = {};

var Player = function(id:String) {
	var self = {
		id:id,
		pressingLeft:false,
		pressingUp:false,
		pressingRight:false,
		pressingDown:false,
		pressingSpace:false,
		pressingShift:false
	}
	return self;
}


var io = require('socket.io') (serv,{});
io.socket.on('connection', function(socket:any) {  // handler for socket input
	socket.id = Math.random();
	var player = Player(socket.id);

	SOCKET_LIST[socket.id] = socket;
	PLAYER_LIST[socket.id] = player;

	socket.on('disconnect',function() {
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});

	socket.on('keyPress', function() {
		if (socket.data.inputId === 'left')
			player.pressingLeft = socket.data.state;
		else if (socket.data.inputId === 'up')
			player.pressingUp = socket.data.state
		else if (socket.data.inputId === 'right')
			player.pressingRight = socket.data.state;
		else if (socket.data.inputId === 'down')
			player.pressingDown = socket.data.state;
		else if (socket.data.inputId === 'space')
			player.pressingDown = socket.data.state;
		else if (socket.data.inputId === 'shift')
			player.pressingDown = socket.data.state;
	})
});

setInterval(function() {  // trigger every set amt of frames

},1000/25);  // 25fps

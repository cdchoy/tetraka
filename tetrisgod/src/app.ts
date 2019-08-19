// tetrisgod/src/app.ts
// Main entrypoint for our application

import express from "express";
import http from "http";
import {User, Action, Game} from "./Modules";

/** SERVER INITIALIZATION */
const app = express();
const port = process.env.PORT || 2000;
app.set("port", port);
app.get("/", (request: any, response: any) => {
	response.sendFile(__dirname + '/client/index.html');
})
app.use('/client',express.static(__dirname + '/client'));

const server = new http.Server(app);
server.listen(port, function() {
	console.log("listening on " + port);
});

console.log("Server started");
/** END SERVER INITIALIZATION */

/** SOCKET EVENT HANDLER */
let SOCKET_LIST : any = {};

var io = require('socket.io') (server,{});
io.socket.on('connection', function(socket:any) {
	onConnect(socket);
	socket.on('disconnect', function() { onDisconnect(socket); });
	socket.on('keyPress', function() { onKeyPress(socket); })
});

function onConnect(socket: any) : void {
	socket.id = Math.random();

	let action = new Action();
	socket.action = action;

	SOCKET_LIST[socket.id] = socket;
}

function onDisconnect(socket: any) : void {
	delete SOCKET_LIST[socket.id];
}

function onKeyPress(socket: any) : void {
	if (socket.data.inputId === 'moveleft')
		socket.action.pressingMoveLeft = socket.data.state;
	else if (socket.data.inputId === 'rotateright')
		socket.action.pressingRotateRight = socket.data.state
	else if (socket.data.inputId === 'moveright')
		socket.action.pressingMoveRight = socket.data.state;
	else if (socket.data.inputId === 'softdrop')
		socket.action.pressingSoftDrop = socket.data.state;
	else if (socket.data.inputId === 'harddrop')
		socket.action.pressingHardDrop = socket.data.state;
	else if (socket.data.inputId === 'hold')
		socket.action.pressingHold = socket.data.state;
}
/** END SOCKET EVENT HANDLER */

/** MAIN FUNCTION
 *  Determines fps and runs every frame */
setInterval(function() {
	let game = new Game();  // todo this should be run on setup and not every frame
	for (let socket in SOCKET_LIST) {
		game.update(socket);
	}
},1000/25);  // 25fps

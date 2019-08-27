// tetrisgod/src/app.ts
// Main entrypoint for our application

import express from "express";
import http from "http";
import { Input, Game} from "./Modules";

/** SERVER INITIALIZATION */
const app = express();
const port = process.env.PORT || 2000;
app.set("port", port);
app.get("/", (request: any, response: any) => {
	response.sendFile(__dirname + '/client/index.html');
});
app.use(express.static(__dirname + '/client'));

const server = new http.Server(app);
server.listen(port, function() {
	console.log("listening on " + port);
});

console.log("Server started");
/** END SERVER INITIALIZATION */

/** SOCKET EVENT HANDLER */
let SOCKET_LIST : any = {};
let GAME_LIST : any = {};

let io = require('socket.io') (server,{});
io.on('connection', function(socket:any) {
	onConnect(socket);
	socket.on('disconnect', function() { onDisconnect(socket); });
	socket.on('keyPress', function() { onKeyPress(socket); })
});

function onConnect(socket: any) : void {
	socket.id = Math.random();

	let keyInput = new Input();
	socket.keyInput = keyInput;

	SOCKET_LIST[socket.id] = socket;
	GAME_LIST[socket.id] = new Game();
}

function onDisconnect(socket: any) : void {
	delete SOCKET_LIST[socket.id];
}

function onKeyPress(socket: any) : void {
	if (socket.data.inputId === 'moveleft')
		socket.keyInput.pressingMoveLeft = socket.data.state;
	else if (socket.data.inputId === 'rotateright')
		socket.keyInput.pressingRotateRight = socket.data.state
	else if (socket.data.inputId === 'moveright')
		socket.keyInput.pressingMoveRight = socket.data.state;
	else if (socket.data.inputId === 'softdrop')
		socket.keyInput.pressingSoftDrop = socket.data.state;
	else if (socket.data.inputId === 'harddrop')
		socket.keyInput.pressingHardDrop = socket.data.state;
	else if (socket.data.inputId === 'hold')
		socket.keyInput.pressingHold = socket.data.state;
}
/** END SOCKET EVENT HANDLER */

/** MAIN FUNCTION
 *  Determines fps and runs every frame */
setInterval(function() {

	for (let socket of SOCKET_LIST) {
		let game = GAME_LIST[socket.id];
		game.update(socket);
	}
},1000/25);  // 25fps

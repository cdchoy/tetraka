import {Input} from "./models/Input";
import * as SocketIO from "socket.io";

const cluster = require('cluster');
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;

/** Multi-process to utilize all CPU cores. */
if (!isDev && cluster.isMaster) {
  const numCPUs = require('os').cpus().length;

  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

}

/** Normal Single-instance server hosting */
else {
  /** SERVER SETUP */
  const express = require('express');
  const path = require('path');
  const app = express();
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  // Begin Listening for socket & app communications
  server.listen(port);

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // Answer PINGs
  app.get('/ping', function (req, res) {
    return res.send('pong');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
  /** END SERVER SETUP */


  /** SOCKET EVENT HANDLER */
  let SOCKET_LIST : Array<SocketIO.Socket> = new Array<SocketIO.Socket>();

  io.on('connection', (socket) => {
    onConnect(socket);
    socket.on('disconnect', () => { onDisconnect(socket); });
    // socket.on('keyPress', () => { onKeyPress(socket); })

  });

  const onConnect = (socket: SocketIO.Socket) => {
    socket.id = Math.random();
    socket.keyInput = new Input();
    SOCKET_LIST[socket.id] = socket;
  };

  const onDisconnect = (socket: SocketIO.Socket) => {
    delete SOCKET_LIST[socket.id];
  };

  const onKeyPress = (socket: SocketIO.Socket) => {
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
    for (let socket of SOCKET_LIST) {
      socket.emit('test');
      // let game = GAME_LIST[socket.id];
      // game.update(socket);
    }
  },1000/25);  // 25fps

  /** END SOCKET EVENT HANDLER */
}







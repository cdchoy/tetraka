import {Input} from "./models/Input";

/** Server Initialization */
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

}
// Normal Single-instance server hosting
else {
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

  // Answer Socket.io Communications
  let SOCKET_LIST = {};
  io.on('connection', (socket) => {
    socket.id = Math.random();
    socket.keyInput = new Input();
    SOCKET_LIST[socket.id] = socket;

    // socket.on('disconnect', () => { onDisconnect(socket); });
    // socket.on('keyPress', () => { onKeyPress(socket); })
  });
}
/** END SERVER INITIALIZATION */


/** SOCKET EVENT HANDLER */


/** END SOCKET EVENT HANDLER */
// app.listen(port, function () {
//   console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${port}`);
// });
// io.listen(port);
// console.log('socket listening on port ', port);





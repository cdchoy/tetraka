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

  app.listen(port, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${port}`);
  });
}
/** END SERVER INITIALIZATION */


/** SOCKET EVENT HANDLER */

const socketListener = require("./models/SocketHandler");

const io = require('socket.io')();
io.on('connection', socketListener);
io.listen(port);
console.log('socket listening on port ', port);

/** END SOCKET EVENT HANDLER */

/** MAIN FUNCTION
 *  Determines fps and runs every frame */
setInterval(() => {

  // for (let socket of SOCKET_LIST) {
  //   let game = GAME_LIST[socket.id];
  //   game.update(socket);
  // }
},1000/25);  // 25fps

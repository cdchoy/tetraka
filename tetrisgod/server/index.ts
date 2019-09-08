import * as HTTP from "http";
import * as Path from "path";
import * as Cluster from "cluster";
import * as Express from "express";
import * as SocketIO from "socket.io";

import {Input} from "./models/Input";

/**
 * Multi-process to utilize all CPU cores.
 * */
function startClusterMaster() {
  const numCPUs = require('os').cpus().length;

  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    Cluster.fork();
  }

  Cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });
}

/**
 * Normal Single-instance server hosting
 * */
class MyServer {
  public static readonly PORT: number = 5000;

  readonly app: Express.Application;
  readonly port: string | number;
  readonly server: HTTP.Server;
  private io: SocketIO.Server;

  private SOCKET_LIST: Array<any> = new Array<any>();

  constructor() {
    this.app = Express();
    this.port = process.env.PORT || MyServer.PORT;
    this.setupApp();
    this.server = HTTP.createServer(this.app);
    this.io = SocketIO(this.server);
    this.listen();
  }

  private setupApp(): void {
    this.app.use(Express.static(Path.resolve(__dirname, '../react-ui/build')));

    // Answer API requests.
    this.app.get('/api', (req, res) => {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"Hello from the custom server!"}');
    });

    // Answer PINGs
    this.app.get('/ping', (req, res) => {
      return res.send('pong');
    });

    // All remaining requests return the React app, so it can handle routing.
    this.app.get('*', (request, response) => {
      response.sendFile(Path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
  }

  private listen(): void {
    // listen on our defined port
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    // socket events
    this.io.on('connection', (client) => {
      this.onConnect(client);
      client.on('disconnect', () => { this.onDisconnect(client); });
      client.on('keyPress', () => { this.onKeyPress(client); })
    });

    // runs every frame
    setInterval(() => {
      for (let socket of this.SOCKET_LIST) {
        socket.emit('test');
      }
    },1000/25);  // 25fps
  }

  private onConnect = (client: any) => {
    client.id = Math.random();
    client.keyInput = new Input();
    this.SOCKET_LIST[client.id] = client;
  };

  private onDisconnect = (client: any) => {
    delete this.SOCKET_LIST[client.id];
  };

  private onKeyPress = (client: any) => {
    console.log("KEY PRESSED!");
    if (client.data.inputId === 'moveleft')
      client.keyInput.pressingMoveLeft = client.data.state;
    else if (client.data.inputId === 'rotateright')
      client.keyInput.pressingRotateRight = client.data.state;
    else if (client.data.inputId === 'moveright')
      client.keyInput.pressingMoveRight = client.data.state;
    else if (client.data.inputId === 'softdrop')
      client.keyInput.pressingSoftDrop = client.data.state;
    else if (client.data.inputId === 'harddrop')
      client.keyInput.pressingHardDrop = client.data.state;
    else if (client.data.inputId === 'hold')
      client.keyInput.pressingHold = client.data.state;
  };
}


function main() {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && Cluster.isMaster) {
    startClusterMaster();
  } else {
    new MyServer();
  }
}

main();





import * as HTTP from "http";
import * as Path from "path";
import * as Cluster from "cluster";
import * as Express from "express";
import * as SocketIO from "socket.io";
import ClientConnection from "./models/ClientConnection";

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
class TGServer {
  public static readonly PORT: number = 5000;

  readonly app: Express.Application;
  readonly port: string | number;
  readonly server: HTTP.Server;
  private io: SocketIO.Server;

  private CONNECTION_LIST: object = {};

  constructor() {
    this.app = Express();
    this.port = process.env.PORT || TGServer.PORT;
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
    this.io.on('connection', (socket: SocketIO.Socket) => {
      let id: string = socket.client.id;
      this.onConnect(socket);
      socket.on('disconnect', () => { this.onDisconnect(socket) });
      socket.on('keyPress', (data: any) => { this.onKeyPress(socket, data) });
    });

    // runs every frame
    setInterval(() => {

    },1000/25);  // 25fps
  }

  private onConnect = (socket: SocketIO.Socket) => {
    this.CONNECTION_LIST[socket.client.id] = new ClientConnection(socket);
  };

  private onDisconnect = (socket: SocketIO.Socket) => {
    delete this.CONNECTION_LIST[socket.client.id];
  };

  private onKeyPress = (socket: SocketIO.Socket, data: any) => {
    console.log("KEY PRESSED!");
    let client: ClientConnection = this.CONNECTION_LIST[socket.client.id];

    if (data.inputId === 'moveleft')
      client.input.pressingMoveLeft = data.state;
    else if (data.inputId === 'rotateright')
      client.input.pressingRotateRight = data.state;
    else if (data.inputId === 'moveright')
      client.input.pressingMoveRight = data.state;
    else if (data.inputId === 'softdrop')
      client.input.pressingSoftDrop = data.state;
    else if (data.inputId === 'harddrop')
      client.input.pressingHardDrop = data.state;
    else if (data.inputId === 'hold')
      client.input.pressingHold = data.state;
  };
}


function main() {
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && Cluster.isMaster) {
    startClusterMaster();
  } else {
    new TGServer();
  }
}

main();





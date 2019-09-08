import {io, SocketIOClient} from "socket.io-client"
import {UserSettings} from "./UserSettings";

export class SocketService {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;
    private settings: UserSettings;

    constructor() {
        this.settings = new UserSettings();
    }

    public init(): SocketService {
        this.socket = io('localhost:5000');
        return this;
    }

    public emitKeyDown(event) {
        console.log(event.keyCode);
        switch(event.code) {
            case this.settings.moveLeftKey:
                this.socket.emit('keyPress',{inputId:'moveleft',state:true});
                break;
            case this.settings.moveRightKey:
                this.socket.emit('keyPress',{inputId:'moveright',state:true});
                break;
            case this.settings.rotateRightKey:
                this.socket.emit('keyPress',{inputId:'rotateright',state:true});
                break;
            case this.settings.rotateLeftKey:
                this.socket.emit('keyPress',{inputId:'rotateleft',state:true});
                break;
            case this.settings.softDropKey:
                this.socket.emit('keyPress',{inputId:'softdrop',state:true});
                break;
            case this.settings.hardDropKey:
                this.socket.emit('keyPress',{inputId:'harddrop',state:true});
                break;
            case this.settings.holdKey:
                this.socket.emit('keyPress',{inputId:'hold',state:true});
                break;
            default:
            // do nothing
        }
    }

    public emitKeyUp(event) {
        switch(event.code) {
            case this.settings.moveLeftKey:
                this.socket.emit('keyPress',{inputId:'moveleft',state:false});
                break;
            case this.settings.moveRightKey:
                this.socket.emit('keyPress',{inputId:'moveright',state:false});
                break;
            case this.settings.rotateRightKey:
                this.socket.emit('keyPress',{inputId:'rotateright',state:false});
                break;
            case this.settings.rotateLeftKey:
                this.socket.emit('keyPress',{inputId:'rotateleft',state:false});
                break;
            case this.settings.softDropKey:
                this.socket.emit('keyPress',{inputId:'softdrop',state:false});
                break;
            case this.settings.hardDropKey:
                this.socket.emit('keyPress',{inputId:'harddrop',state:false});
                break;
            case this.settings.holdKey:
                this.socket.emit('keyPress',{inputId:'hold',state:false});
                break;
            default:
            // do nothing
        }
    }
}
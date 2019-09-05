// client/scripts/ClientEmitter.ts

import {UserSettings} from "../../react-ui/src/components/UserSettings";

let canvas : any = document.getElementById("ctx");
let ctx : any = canvas.getContext("2d");
ctx.font = "30px Arial";

let socket  = require('socket.io') (80);
let settings = new UserSettings;

document.onkeydown = function(event) {
    switch(event.code) {
        case settings.moveLeftKey:
            socket.emit('keyPress',{inputId:'moveleft',state:true});
            break;
        case settings.moveRightKey:
            socket.emit('keyPress',{inputId:'moveright',state:true});
            break;
        case settings.rotateRightKey:
            socket.emit('keyPress',{inputId:'rotateright',state:true});
            break;
        case settings.rotateLeftKey:
            socket.emit('keyPress',{inputId:'rotateleft',state:true});
            break;
        case settings.softDropKey:
            socket.emit('keyPress',{inputId:'softdrop',state:true});
            break;
        case settings.hardDropKey:
            socket.emit('keyPress',{inputId:'harddrop',state:true});
            break;
        case settings.holdKey:
            socket.emit('keyPress',{inputId:'hold',state:true});
            break;
        default:
        // do nothing
    }
};

document.onkeyup = function(event) {
    switch(event.code) {
        case settings.moveLeftKey:
            socket.emit('keyPress',{inputId:'moveleft',state:false});
            break;
        case settings.moveRightKey:
            socket.emit('keyPress',{inputId:'moveright',state:false});
            break;
        case settings.rotateRightKey:
            socket.emit('keyPress',{inputId:'rotateright',state:false});
            break;
        case settings.rotateLeftKey:
            socket.emit('keyPress',{inputId:'rotateleft',state:false});
            break;
        case settings.softDropKey:
            socket.emit('keyPress',{inputId:'softdrop',state:false});
            break;
        case settings.hardDropKey:
            socket.emit('keyPress',{inputId:'harddrop',state:false});
            break;
        case settings.holdKey:
            socket.emit('keyPress',{inputId:'hold',state:false});
            break;
        default:
        // do nothing
    }
};
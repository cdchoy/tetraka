"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input = (function () {
    function Input() {
        this.pressingMoveLeft = false;
        this.pressingMoveRight = false;
        this.pressingRotateRight = false;
        this.pressingRotateLeft = false;
        this.pressingSoftDrop = false;
        this.pressingHardDrop = false;
        this.pressingHold = false;
    }
    return Input;
}());
exports.Input = Input;

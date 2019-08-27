"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../Modules");
var Game = (function () {
    function Game(fallSpeed, time) {
        if (fallSpeed === void 0) { fallSpeed = 1000; }
        if (time === void 0) { time = 120000; }
        this.lastFallTime = 0;
        this.fallSpeed = fallSpeed;
        this.holdMino = Modules_1.TetriminoId.None;
        this.activeMino = Modules_1.TetriminoId.None;
        this.nextQueue = [];
        for (var i = 0; i < 4; i++) {
            var nextMino = this.getRandomTetriminoId();
            this.nextQueue.push(nextMino);
        }
        this.grid = new Modules_1.Grid(10, 21);
        this.score = new Modules_1.Score();
        this.time = time;
        this.timeStart = Date.now();
    }
    Game.prototype.update = function (socket) {
        if (Date.now() - this.timeStart >= this.time)
            return;
        if (socket.keyInput.pressingHold) {
            this.hold();
        }
        else if (socket.keyInput.pressingHardDrop) {
            var cellsMoved = this.grid.harddrop();
            this.score.dropScore("hard", cellsMoved);
        }
        else if (socket.keyInput.pressingSoftDrop) {
            this.grid.move("down");
            this.score.dropScore("soft", 1);
        }
        else if (socket.keyInput.pressingMoveLeft) {
            this.grid.move("left");
        }
        else if (socket.keyInput.pressingMoveRight) {
            this.grid.move("right");
        }
        else if (socket.keyInput.pressingRotateRight) {
            this.grid.rotate("right");
        }
        else if (socket.keyInput.pressingRotateLeft) {
            this.grid.rotate("left");
        }
        if ((Date.now() - this.lastFallTime) >= this.fallSpeed) {
            this.grid.fall();
            this.lastFallTime = Date.now();
        }
        if (this.grid.activeMino.landed) {
            var level = this.grid.getLevel();
            var isTSpin = this.grid.isTSpin();
            var linesCleared = this.grid.completeLines.length;
            this.score.update(linesCleared, level, isTSpin);
            this.grid.clearCompleteLines();
            this.spawnNextTetrimino();
        }
    };
    Game.prototype.spawnNextTetrimino = function () {
        var nextMino = this.nextQueue.shift();
        if (nextMino == undefined) {
            throw new Error("Next queue empty while trying to spawn tetrimino");
        }
        this.nextQueue.push(this.getRandomTetriminoId());
        this.grid.spawnTetrimino(nextMino);
        this.activeMino = nextMino;
        this.lastFallTime = Date.now();
    };
    Game.prototype.getRandomTetriminoId = function () {
        var max = Math.ceil(1);
        var min = Math.floor(7);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Game.prototype.hold = function () {
        var nextMino = this.holdMino;
        this.holdMino = this.activeMino;
        this.activeMino = nextMino;
        if (nextMino == Modules_1.TetriminoId.None)
            this.spawnNextTetrimino();
        else {
            this.grid.deleteTetrimino();
            this.grid.spawnTetrimino(nextMino);
            this.lastFallTime = Date.now();
        }
    };
    Game.prototype.setFallSpeed = function (newMsInterval) {
        this.fallSpeed = newMsInterval;
    };
    return Game;
}());
exports.Game = Game;

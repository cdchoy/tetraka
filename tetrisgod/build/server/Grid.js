"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../Modules");
var Grid = (function () {
    function Grid(height, width) {
        if (height === void 0) { height = 10; }
        if (width === void 0) { width = 21; }
        this.height = height;
        this.width = width;
        this.origin = [0, 0];
        this.currPosition = new Array();
        this.lineOccupancy = new Array();
        this.completeLines = new Array();
        this.activeMino = new Modules_1.Tetrimino(Modules_1.TetriminoId.None);
        this.matrix = new Array();
        for (var row = 0; row < height; row++) {
            this.lineOccupancy.push(0);
            var newRow = new Array();
            for (var col = 0; col < width; col++) {
                newRow.push(Modules_1.TetriminoId.None);
            }
            this.matrix.push(newRow);
        }
    }
    Grid.prototype.isLegalMove = function (coords) {
        for (var _i = 0, coords_1 = coords; _i < coords_1.length; _i++) {
            var _a = coords_1[_i], row = _a[0], col = _a[1];
            if (row < 0 || row > this.height || col < 0 || col > this.width)
                return false;
            if (this.matrix[row][col] != Modules_1.TetriminoId.None)
                return false;
        }
        return true;
    };
    Grid.prototype.updatePosition = function (newOrigin, newPosition) {
        this.deleteTetrimino();
        for (var _i = 0, newPosition_1 = newPosition; _i < newPosition_1.length; _i++) {
            var _a = newPosition_1[_i], row = _a[0], col = _a[1];
            this.matrix[row][col] = this.activeMino.id;
        }
        this.currPosition = newPosition;
        this.origin = newOrigin;
    };
    Grid.prototype.land = function () {
        this.activeMino.landed = true;
        for (var _i = 0, _a = this.currPosition; _i < _a.length; _i++) {
            var _b = _a[_i], row = _b[0], __ = _b[1];
            this.lineOccupancy[row] += 1;
            if (this.lineOccupancy[row] == this.width) {
                this.completeLines.push(row);
            }
        }
    };
    Grid.prototype.isTSpin = function () {
        var _a = this.origin, row = _a[0], col = _a[1];
        var up = this.activeMino.getCoordinates([row, col + 1]);
        var down = this.activeMino.getCoordinates([row, col - 1]);
        var left = this.activeMino.getCoordinates([row - 1, col]);
        var right = this.activeMino.getCoordinates([row + 1, col]);
        return !(this.isLegalMove(up) || this.isLegalMove(down) || this.isLegalMove(left) || this.isLegalMove(right));
    };
    Grid.prototype.spawnTetrimino = function (type) {
        this.activeMino = new Modules_1.Tetrimino(type);
        this.origin = [(this.height - 1), Math.floor(this.width / 2) - 2];
        this.currPosition = this.activeMino.getCoordinates(this.origin);
        this.updatePosition(this.origin, this.currPosition);
    };
    Grid.prototype.deleteTetrimino = function () {
        for (var _i = 0, _a = this.currPosition; _i < _a.length; _i++) {
            var _b = _a[_i], row = _b[0], col = _b[1];
            this.matrix[row][col] = Modules_1.TetriminoId.None;
        }
    };
    Grid.prototype.getLevel = function () {
        return this.completeLines.sort(function (n1, n2) { return n1 - n2; })[0];
    };
    Grid.prototype.clearCompleteLines = function () {
        var numLinesToClear = this.completeLines.length;
        if (!numLinesToClear)
            return;
        this.completeLines.sort(function (n1, n2) { return n1 - n2; });
        for (var row = this.completeLines[0]; row < this.height; row++) {
            var targetRow = row + numLinesToClear;
            if (targetRow < this.height) {
                this.lineOccupancy[row] = this.lineOccupancy[targetRow];
                this.matrix[row] = this.matrix[targetRow];
            }
            else {
                this.lineOccupancy[row] = 0;
                for (var col in this.matrix[row]) {
                    this.matrix[row][col] = Modules_1.TetriminoId.None;
                }
            }
        }
        this.completeLines = [];
    };
    Grid.prototype.addGarbage = function (lines) {
    };
    Grid.prototype.fall = function () {
        var newOrigin = [this.origin[0] - 1, this.origin[1]];
        var newPosition = this.activeMino.getCoordinates(newOrigin);
        if (this.isLegalMove(newPosition))
            this.updatePosition(newOrigin, newPosition);
        else
            this.land();
    };
    Grid.prototype.harddrop = function () {
        var cellsMoved = 0;
        while (!this.activeMino.landed) {
            this.fall();
            cellsMoved += 1;
        }
        return cellsMoved;
    };
    Grid.prototype.move = function (direction) {
        var newOrigin;
        switch (direction) {
            case "down":
                newOrigin = [this.origin[0] - 1, this.origin[1]];
                break;
            case "left":
                newOrigin = [this.origin[0], this.origin[1] - 1];
                break;
            case "right":
                newOrigin = [this.origin[0], this.origin[1] + 1];
                break;
            default:
                throw new Error("Unknown movement for move(): " + direction);
        }
        var newPosition = this.activeMino.getCoordinates(newOrigin);
        if (this.isLegalMove(newPosition))
            this.updatePosition(newOrigin, newPosition);
    };
    Grid.prototype.rotate = function (direction) {
        var newPosition = (direction == "left") ? this.activeMino.rotateLeft(this.origin) : this.activeMino.rotateRight(this.origin);
        if (this.isLegalMove(newPosition)) {
            this.updatePosition(this.origin, newPosition);
            return;
        }
        for (var offset = 2; offset <= 5; offset++) {
            var newOrigin = this.activeMino.kickOrigin(this.origin, offset);
            newPosition = this.activeMino.getCoordinates(newOrigin);
            if (this.isLegalMove(newPosition)) {
                this.updatePosition(newOrigin, newPosition);
                return;
            }
        }
        (direction == "left") ? this.activeMino.rotateRight(this.origin) : this.activeMino.rotateLeft(this.origin);
    };
    return Grid;
}());
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map
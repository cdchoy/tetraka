"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TetriminoId;
(function (TetriminoId) {
    TetriminoId[TetriminoId["None"] = 0] = "None";
    TetriminoId[TetriminoId["LBlock"] = 1] = "LBlock";
    TetriminoId[TetriminoId["JBlock"] = 2] = "JBlock";
    TetriminoId[TetriminoId["ZBlock"] = 3] = "ZBlock";
    TetriminoId[TetriminoId["SBlock"] = 4] = "SBlock";
    TetriminoId[TetriminoId["IBlock"] = 5] = "IBlock";
    TetriminoId[TetriminoId["TBlock"] = 6] = "TBlock";
    TetriminoId[TetriminoId["OBlock"] = 7] = "OBlock";
})(TetriminoId = exports.TetriminoId || (exports.TetriminoId = {}));
var TetriminoForm;
(function (TetriminoForm) {
    TetriminoForm[TetriminoForm["Up"] = 0] = "Up";
    TetriminoForm[TetriminoForm["Right"] = 1] = "Right";
    TetriminoForm[TetriminoForm["Down"] = 2] = "Down";
    TetriminoForm[TetriminoForm["Left"] = 3] = "Left";
})(TetriminoForm = exports.TetriminoForm || (exports.TetriminoForm = {}));
var Tetrimino = (function () {
    function Tetrimino(id) {
        this.id = id;
        this.form = TetriminoForm.Up;
        this.basicCoordinates = setupCoords(id);
        this.landed = false;
    }
    Tetrimino.prototype.addOrigin = function (origin) {
        return function (point) {
            return [origin[0] + point[0], origin[1] + point[1]];
        };
    };
    Tetrimino.prototype.getCoordinates = function (origin) {
        return this.basicCoordinates[this.form].map(this.addOrigin(origin));
    };
    Tetrimino.prototype.rotateRight = function (origin) {
        this.form = (this.form + 1) % 4;
        return this.getCoordinates(origin);
    };
    Tetrimino.prototype.rotateLeft = function (origin) {
        this.form = (this.form + 3) % 4;
        return this.getCoordinates(origin);
    };
    Tetrimino.prototype.kickOrigin = function (origin, offsetIteration) {
        var originRow = origin[0], originCol = origin[1];
        if (offsetIteration < 1 || offsetIteration > 5)
            throw new Error("Unknown offsetIteration: " + offsetIteration);
        if (this.id in [TetriminoId.JBlock, TetriminoId.LBlock, TetriminoId.ZBlock, TetriminoId.SBlock, TetriminoId.TBlock]) {
            originRow += KICK_OFFSET[offsetIteration - 1][this.form][0];
            originCol += KICK_OFFSET[offsetIteration - 1][this.form][1];
        }
        else if (this.id == TetriminoId.IBlock) {
            originRow += IKICK_OFFSET[offsetIteration - 1][this.form][0];
            originCol += IKICK_OFFSET[offsetIteration - 1][this.form][1];
        }
        return [originRow, originCol];
    };
    return Tetrimino;
}());
exports.Tetrimino = Tetrimino;
function setupCoords(id) {
    switch (id) {
        case TetriminoId.None:
            return [[]];
        case TetriminoId.LBlock:
            return [L_UP, L_RIGHT, L_DOWN, L_LEFT];
        case TetriminoId.JBlock:
            return [J_UP, J_RIGHT, J_DOWN, J_LEFT];
        case TetriminoId.ZBlock:
            return [Z_UP, Z_RIGHT, Z_DOWN, Z_LEFT];
        case TetriminoId.SBlock:
            return [S_UP, S_RIGHT, S_DOWN, S_LEFT];
        case TetriminoId.IBlock:
            return [I_UP, I_RIGHT, I_DOWN, I_LEFT];
        case TetriminoId.TBlock:
            return [T_UP, T_RIGHT, T_DOWN, T_LEFT];
        case TetriminoId.OBlock:
            return [O_ALL, O_ALL, O_ALL, O_ALL];
        default:
            throw new Error('Invalid TetriminoId passed to TetriminoMaker');
    }
}
var OFFSET_1 = [[0, 0], [0, 0], [0, 0], [0, 0]];
var OFFSET_2 = [[0, 0], [0, 1], [0, 0], [0, -1]];
var OFFSET_3 = [[0, 0], [-1, 1], [0, 0], [-1, -1]];
var OFFSET_4 = [[0, 0], [2, 0], [0, 0], [2, 0]];
var OFFSET_5 = [[0, 0], [2, 1], [0, 0], [2, -1]];
var KICK_OFFSET = [OFFSET_1, OFFSET_2, OFFSET_3, OFFSET_4, OFFSET_5];
var I_OFFSET_1 = [[0, 0], [0, -1], [1, -1], [1, 0]];
var I_OFFSET_2 = [[0, -1], [0, 0], [1, 1], [1, 0]];
var I_OFFSET_3 = [[0, 2], [0, 0], [1, -2], [1, 0]];
var I_OFFSET_4 = [[0, -1], [1, 0], [0, 1], [-1, 0]];
var I_OFFSET_5 = [[0, 2], [-2, 0], [0, -2], [2, 0]];
var IKICK_OFFSET = [I_OFFSET_1, I_OFFSET_2, I_OFFSET_3, I_OFFSET_4, I_OFFSET_5];
var L_UP = [[1, 0], [1, 2], [1, 2], [2, 2]];
var L_RIGHT = [[0, 1], [0, 2], [1, 1], [2, 1]];
var L_DOWN = [[0, 0], [1, 0], [1, 1], [1, 2]];
var L_LEFT = [[0, 1], [1, 1], [2, 0], [2, 1]];
var J_UP = [[1, 0], [1, 1], [1, 2], [2, 0]];
var J_RIGHT = [[0, 1], [1, 1], [2, 1], [2, 2]];
var J_DOWN = [[2, 0], [1, 0], [1, 1], [1, 2]];
var J_LEFT = [[0, 0], [0, 1], [1, 1], [2, 1]];
var Z_UP = [[1, 1], [1, 2], [2, 0], [2, 1]];
var Z_RIGHT = [[0, 1], [1, 1], [1, 2], [2, 2]];
var Z_DOWN = [[0, 1], [0, 2], [1, 0], [1, 1]];
var Z_LEFT = [[0, 0], [1, 0], [1, 1], [2, 1]];
var S_UP = [[1, 0], [1, 1], [2, 1], [2, 2]];
var S_RIGHT = [[0, 2], [1, 1], [1, 2], [2, 1]];
var S_DOWN = [[0, 0], [0, 1], [1, 1], [1, 2]];
var S_LEFT = [[0, 1], [1, 0], [1, 1], [2, 0]];
var I_UP = [[1, 0], [1, 1], [1, 2], [1, 3]];
var I_RIGHT = [[0, 1], [1, 1], [2, 1], [3, 1]];
var I_DOWN = [[2, 0], [2, 1], [2, 2], [2, 3]];
var I_LEFT = [[0, 2], [1, 2], [2, 2], [3, 2]];
var T_UP = [[1, 0], [1, 1], [1, 2], [2, 1]];
var T_RIGHT = [[0, 1], [1, 1], [1, 2], [2, 1]];
var T_DOWN = [[0, 1], [1, 0], [1, 1], [1, 2]];
var T_LEFT = [[0, 1], [1, 0], [1, 1], [2, 1]];
var O_ALL = [[0, 0], [0, 1], [1, 0], [1, 1]];

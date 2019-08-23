"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScoreAction;
(function (ScoreAction) {
    ScoreAction[ScoreAction["None"] = 0] = "None";
    ScoreAction[ScoreAction["Single"] = 1] = "Single";
    ScoreAction[ScoreAction["Double"] = 2] = "Double";
    ScoreAction[ScoreAction["Triple"] = 3] = "Triple";
    ScoreAction[ScoreAction["Tetris"] = 4] = "Tetris";
})(ScoreAction || (ScoreAction = {}));
var Score = (function () {
    function Score() {
        this.back2backTetris = false;
        this.back2backTSpin = false;
        this.comboCount = 0;
        this.points = 0;
        this.linesSent = 0;
    }
    Score.prototype.update = function (linesCleared, level, isTspin) {
        var pointsScored = 0;
        if (linesCleared == 0 && !isTspin) {
            this.comboCount = 0;
            return;
        }
        if (linesCleared == 1 && !isTspin) {
            pointsScored += 100 * level;
            this.back2backTetris = false;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 2 && !isTspin) {
            pointsScored += 300 * level;
            this.back2backTetris = false;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 3 && !isTspin) {
            pointsScored += 500 * level;
            this.back2backTetris = false;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 4 && !isTspin) {
            pointsScored += 800 * level;
            if (this.back2backTetris)
                pointsScored += 400 * level;
            this.back2backTetris = true;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 0 && isTspin) {
            pointsScored += 400 * level;
        }
        else if (linesCleared == 1 && isTspin) {
            pointsScored += 800 * level;
            if (this.back2backTSpin)
                pointsScored += 50 * level;
            this.back2backTetris = false;
            this.back2backTSpin = true;
        }
        else if (linesCleared == 2 && isTspin) {
            pointsScored += 1200 * level;
            if (this.back2backTSpin)
                pointsScored += 50 * level;
            this.back2backTetris = false;
            this.back2backTSpin = true;
        }
        else if (linesCleared == 3 && isTspin) {
            pointsScored += 1600 * level;
            if (this.back2backTSpin)
                pointsScored += 800 * level;
            this.back2backTetris = false;
            this.back2backTSpin = true;
        }
        var comboBonus = 50 * this.comboCount * level;
        this.comboCount += 1;
        this.points += pointsScored + comboBonus;
    };
    Score.prototype.dropScore = function (type, cellsMoved) {
        if (type == "soft")
            this.points += cellsMoved;
        else if (type == "hard")
            this.points += (2 * cellsMoved);
        else
            throw new Error("Unknown drop type: " + type);
    };
    return Score;
}());
exports.Score = Score;
//# sourceMappingURL=Score.js.map
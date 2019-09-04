// server/Score

export class Score {
    private back2backTetris: boolean;
    private back2backTSpin: boolean;
    private comboCount: number;
    public points: number;
    public linesSent: number;

    constructor() {
        this.back2backTetris = false;
        this.back2backTSpin = false;
        this.comboCount = 0;
        this.points = 0;
        this.linesSent = 0;
    }

    public update(linesCleared: number, level: number, isTspin: boolean) {
        let pointsScored: number = 0;

        if (linesCleared == 0 && !isTspin) {
            this.comboCount = 0;
            return; // early exit
        }

        if (linesCleared == 1 && !isTspin) {       // Single
            pointsScored += 100 * level;
            this.back2backTetris = false;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 2 && !isTspin) {  // Double
            pointsScored += 300 * level;
            this.back2backTetris = false;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 3 && !isTspin) {  // Triple
            pointsScored += 500 * level;
            this.back2backTetris = false;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 4 && !isTspin) {  // Tetris
            pointsScored += 800 * level;
            if (this.back2backTetris) pointsScored += 400 * level;
            this.back2backTetris = true;
            this.back2backTSpin = false;
        }
        else if (linesCleared == 0 && isTspin) {  // TSpin no lines
            pointsScored += 400 * level;
        }
        else if (linesCleared == 1 && isTspin) {  // TSpin single
            pointsScored += 800 * level;
            if (this.back2backTSpin) pointsScored += 50 * level;
            this.back2backTetris = false;
            this.back2backTSpin = true;
        }
        else if (linesCleared == 2 && isTspin) {  // TSpin double
            pointsScored += 1200 * level;
            if (this.back2backTSpin) pointsScored += 50 * level;
            this.back2backTetris = false;
            this.back2backTSpin = true;
        }
        else if (linesCleared == 3 && isTspin) {  // TSpin triple
            pointsScored += 1600 * level;
            if (this.back2backTSpin) pointsScored += 800 * level;
            this.back2backTetris = false;
            this.back2backTSpin = true;
        }

        const comboBonus = 50 * this.comboCount * level;
        this.comboCount += 1;  // only no line, no tspin doesnt count as a combo
        this.points += pointsScored + comboBonus;
    }

    public dropScore(type: string, cellsMoved: number) : void {
        if (type == "soft")
            this.points += cellsMoved;
        else if (type == "hard")
            this.points += (2 * cellsMoved);
        else
            throw new Error("Unknown drop type: " + type);
    }
}


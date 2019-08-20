// server/Score

enum Action {
    None,
    Single,
    Double,
    Triple,
    Tetris,
    TSpinMini,
    TSpin
}

export class Score {
    private lastAction: Action;

    public points: number;
    public linesSent: number;

    constructor() {
        this.lastAction = Action.None;
        this.points = 0;
        this.linesSent = 0;
    }
}
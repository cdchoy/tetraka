// server/UserSettings.ts

enum TetriminoId {  // redeclared from tetrimino.ts
    None   = 0,
    LBlock = 1,
    JBlock = 2,
    ZBlock = 3,
    SBlock = 4,
    IBlock = 5,
    TBlock = 6,
    OBlock = 7,
}

export class UserSettings {
    /* Key Codes - https://keycode.info/ */
    public moveRightKey  : number = 39;  // rightArrow
    public moveLeftKey   : number = 37;  // leftArrow
    public rotateRightKey: number = 38;  // upArrow
    public rotateLeftKey : number = 67;  // c
    public softDropKey   : number = 40;  // downArrow
    public hardDropKey   : number = 32;  // space
    public holdKey       : number = 16;  // shift

    /* Time Delays in Millis */
    public autoRepeatDelay: number = 170;  // aka DAS (delay auto speed)
    public autoRepeatSpeed: number = 50;   // aka ARR (auto repeat rate)
    public gravity: number = 1000; // time between fall intervals

    /* Other settings */
    public showGhostPiece: boolean = true;

    /* Tetrimino Colors */
    public BlockColors: Array<string> = new Array<string>();

    constructor() {
        this.setDefaultBlockColors();
    }

    private setDefaultBlockColors() {
        this.BlockColors[TetriminoId.None] = 'lightgray';
        this.BlockColors[TetriminoId.LBlock] = 'orange';
        this.BlockColors[TetriminoId.JBlock] = 'blue';
        this.BlockColors[TetriminoId.ZBlock] = 'red';
        this.BlockColors[TetriminoId.SBlock] = 'green';
        this.BlockColors[TetriminoId.IBlock] = 'lightblue';
        this.BlockColors[TetriminoId.TBlock] = 'purple';
        this.BlockColors[TetriminoId.OBlock] = 'yellow';
    }

}

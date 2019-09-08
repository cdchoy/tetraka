// server/UserSettings.ts

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
}

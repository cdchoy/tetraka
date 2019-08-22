// server/Settings.ts

export class Settings {
    /* Key Codes - https://keycode.info/ */
    public moveRightKey  : string = "39";  // rightArrow
    public moveLeftKey   : string = "37";  // leftArrow
    public rotateRightKey: string = "38";  // upArrow
    public rotateLeftKey : string = "90";  // z
    public softDropKey   : string = "40";  // downArrow
    public hardDropKey   : string = "32";  // space
    public holdKey       : string = "16";  // shift

    /* Time Delays in Millis */
    public autoRepeatDelay: number = 170;  // aka DAS (delay auto speed)
    public autoRepeatSpeed: number = 50;   // aka ARR (auto repeat rate)
    public gravity: number = 1000; // time between fall intervals

    /* Other settings */
    public showGhostPiece: boolean = true;
}
// server/Settings.ts

export class Settings {
    /* Key Codes */
    private moveRightKey  : number = 39;  // rightArrow
    private moveLeftKey   : number = 37;  // leftArrow
    private rotateRightKey: number = 38;  // upArrow
    private rotateLeftKey : number = 90;  // z
    private softDropKey   : number = 40;  // downArrow
    private hardDropKey   : number = 32;  // space
    private holdKey       : number = 16;  // shift

    /* Time Delays in Millis */
    private autoRepeatDelay: number = 170;  // aka DAS (delay auto speed)
    private autoRepeatSpeed: number = 50;   // aka ARR (auto repeat rate)
    private gravity: number = 1000; // time between fall intervals

    /* Other settings */
    private showGhostPiece: boolean = true;
}
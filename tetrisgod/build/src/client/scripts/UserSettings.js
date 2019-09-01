"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserSettings = (function () {
    function UserSettings() {
        this.moveRightKey = "39";
        this.moveLeftKey = "37";
        this.rotateRightKey = "38";
        this.rotateLeftKey = "90";
        this.softDropKey = "40";
        this.hardDropKey = "32";
        this.holdKey = "16";
        this.autoRepeatDelay = 170;
        this.autoRepeatSpeed = 50;
        this.gravity = 1000;
        this.showGhostPiece = true;
    }
    return UserSettings;
}());
exports.UserSettings = UserSettings;

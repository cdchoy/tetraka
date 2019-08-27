"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usertagLength = 4;
var User = (function () {
    function User(name, username, email, socket) {
        this.name = "Alexey Pajitnov";
        this.username = "TetrisGod";
        this.usertag = "#0123";
        this.userid = "TetrisGod#0123";
        this.rank = 1;
        this.name = name;
        this.username = username;
        this.email = email;
        this.usertag = this.generateUsertag();
        this.userid = this.username + this.usertag;
        this.socketid = socket.id;
    }
    User.prototype.getName = function () { return this.name; };
    User.prototype.getUsername = function () { return this.username; };
    User.prototype.getUsertag = function () { return this.usertag; };
    User.prototype.getUserid = function () { return this.userid; };
    User.prototype.setUsername = function (newUsername) {
        this.username = newUsername;
        this.usertag = this.generateUsertag();
        this.userid = this.username + this.usertag;
    };
    User.prototype.generateUsertag = function () {
        var max = Math.pow(10, usertagLength);
        var min = 0;
        var s = Math.floor(min + (max - min) * Math.random()).toString();
        while (s.length < usertagLength)
            s = "0" + s;
        var tag = "#" + s;
        return tag;
    };
    return User;
}());
exports.User = User;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name, username) {
        this.name = "Alexey Pajitnov";
        this.name = name;
        this.username = username;
        this.usertag = this.generateUsertag();
    }
    User.prototype.generateUsertag = function () {
        var tag = "#";
        return tag;
    };
    User.prototype.getUsername = function () { return this.username; };
    User.prototype.updateUsername = function (newUsername) {
        this.username = newUsername;
        this.usertag = this.generateUsertag();
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map
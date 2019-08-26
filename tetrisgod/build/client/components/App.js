"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Header_1 = __importDefault(require("./Header"));
var MainContent_1 = __importDefault(require("./MainContent"));
var Footer_1 = __importDefault(require("./Footer"));
function App() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement(MainContent_1.default, null),
        react_1.default.createElement(Footer_1.default, null)));
}
exports.default = App;
//# sourceMappingURL=App.js.map
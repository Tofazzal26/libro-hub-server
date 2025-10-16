"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get("/todos", (req, res) => {
    res.send({ data: "Todos get success" });
});

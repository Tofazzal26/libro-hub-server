"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todos_router_1 = require("./todos/todos.router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/", todos_router_1.todosRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;

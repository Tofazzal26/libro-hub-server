"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_router_1 = require("./books/books.router");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://libro-hub-client.vercel.app"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/", books_router_1.booksRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;

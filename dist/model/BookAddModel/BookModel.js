"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: Number, required: true },
    copies: { type: Number, required: true },
    availability: { type: Boolean, required: true },
});
const BookModel = mongoose_1.default.models.Book || mongoose_1.default.model("Book", BookSchema);
exports.default = BookModel;

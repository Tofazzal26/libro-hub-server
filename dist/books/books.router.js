"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const BookModel_1 = __importDefault(require("../model/BookAddModel/BookModel"));
const BorrowModel_1 = __importDefault(require("../model/BorrowModel/BorrowModel"));
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post("/create-book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newBook = new BookModel_1.default(data);
        const result = yield newBook.save();
        res
            .status(200)
            .send({ data: result, message: "Data post success", status: 200 });
    }
    catch (error) {
        res
            .status(500)
            .send({ data: error, message: "There was a server error", status: 500 });
    }
}));
exports.booksRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * limit;
        const totalBooks = yield BookModel_1.default.countDocuments();
        const result = yield BookModel_1.default.find().skip(skip).limit(limit);
        res.status(200).send({
            books: result,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks,
        });
    }
    catch (error) {
        res.status(500).send({
            data: error,
            message: "There was a server error",
            status: 500,
        });
    }
}));
exports.booksRouter.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield BookModel_1.default.findById(id);
        res.status(200).send(result);
    }
    catch (error) {
        res
            .status(500)
            .send({ data: error, message: "There was a server error", status: 500 });
    }
}));
exports.booksRouter.patch("/books/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const allData = req.body;
        if (allData.copies === 0) {
            allData.availability = false;
        }
        else if (allData.copies > 0) {
            allData.availability = true;
        }
        const result = yield BookModel_1.default.findByIdAndUpdate(id, allData, {
            new: true,
            runValidators: true,
        });
        res.status(200).send({
            message: "Book updated successfully",
            status: 200,
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "There was a server error",
            status: 500,
            error,
        });
    }
}));
exports.booksRouter.delete("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield BookModel_1.default.findByIdAndDelete(id);
        res.status(200).send({ message: "Book delete success", status: 200 });
    }
    catch (error) {
        res
            .status(500)
            .send({ data: error, message: "There was a server error", status: 500 });
    }
}));
exports.booksRouter.patch("/borrow/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { quantity, dueDate, title, isbn, image } = req.body;
        const existBook = yield BookModel_1.default.findById(bookId);
        if (!existBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (quantity > existBook.copies) {
            return res
                .status(400)
                .json({ message: "Quantity exceeds available copies" });
        }
        existBook.copies -= quantity;
        if (existBook.copies <= 0) {
            existBook.availability = false;
        }
        yield existBook.save();
        const borrowRecord = new BorrowModel_1.default({
            bookId: existBook._id,
            title,
            isbn,
            image,
            quantity,
            dueDate,
        });
        yield borrowRecord.save();
        res.status(200).json({
            message: "Book borrowed successfully",
            existBook,
            borrow: borrowRecord,
        });
    }
    catch (error) {
        res.status(500).send({
            data: error,
            message: "There was a server error",
            status: 500,
        });
    }
}));
exports.booksRouter.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield BorrowModel_1.default.find();
        res.status(200).send(result);
    }
    catch (error) {
        res
            .status(500)
            .send({ data: error, message: "There was a server error", status: 500 });
    }
}));

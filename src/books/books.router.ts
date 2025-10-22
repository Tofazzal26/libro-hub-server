import express, { Request, Response } from "express";
import BookModel from "../model/BookAddModel/BookModel";
import BorrowModel from "../model/BorrowModel/BorrowModel";

export const booksRouter = express.Router();

booksRouter.post("/create-book", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newBook = new BookModel(data);
    const result = await newBook.save();
    res
      .status(200)
      .send({ data: result, message: "Data post success", status: 200 });
  } catch (error) {
    res
      .status(500)
      .send({ data: error, message: "There was a server error", status: 500 });
  }
});

booksRouter.get("/books", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;
    const skip = (page - 1) * limit;

    const totalBooks = await BookModel.countDocuments();
    const result = await BookModel.find().skip(skip).limit(limit);

    res.status(200).send({
      books: result,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    });
  } catch (error) {
    res.status(500).send({
      data: error,
      message: "There was a server error",
      status: 500,
    });
  }
});

booksRouter.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await BookModel.findById(id);
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ data: error, message: "There was a server error", status: 500 });
  }
});

booksRouter.patch("/books/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allData = req.body;

    if (allData.copies === 0) {
      allData.availability = false;
    } else if (allData.copies > 0) {
      allData.availability = true;
    }
    const result = await BookModel.findByIdAndUpdate(id, allData, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      message: "Book updated successfully",
      status: 200,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "There was a server error",
      status: 500,
      error,
    });
  }
});

booksRouter.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await BookModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Book delete success", status: 200 });
  } catch (error) {
    res
      .status(500)
      .send({ data: error, message: "There was a server error", status: 500 });
  }
});

booksRouter.patch("/borrow/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { quantity, dueDate, title, isbn, image } = req.body;

    const existBook = await BookModel.findById(bookId);
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

    await existBook.save();

    const borrowRecord = new BorrowModel({
      bookId: existBook._id,
      title,
      isbn,
      image,
      quantity,
      dueDate,
    });

    await borrowRecord.save();

    res.status(200).json({
      message: "Book borrowed successfully",
      existBook,
      borrow: borrowRecord,
    });
  } catch (error) {
    res.status(500).send({
      data: error,
      message: "There was a server error",
      status: 500,
    });
  }
});

booksRouter.get("/borrow", async (req: Request, res: Response) => {
  try {
    const result = await BorrowModel.find();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ data: error, message: "There was a server error", status: 500 });
  }
});

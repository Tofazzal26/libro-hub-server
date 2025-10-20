import express, { Request, Response } from "express";
import BookModel from "../model/BookAddModel/BookModel";

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
    const result = await BookModel.find();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ data: error, message: "There was a server error", status: 500 });
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

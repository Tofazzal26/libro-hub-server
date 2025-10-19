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

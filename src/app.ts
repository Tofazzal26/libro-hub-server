import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { booksRouter } from "./books/books.router";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", booksRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

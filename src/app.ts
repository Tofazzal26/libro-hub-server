import express, { Request, Response } from "express";
import cors from "cors";
import { todosRouter } from "./todos/todos.router";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", todosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

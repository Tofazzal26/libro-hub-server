import express from "express";
import type { Request, Response } from "express";
export const todosRouter = express.Router();

todosRouter.get("/todos", (req: Request, res: Response) => {
  res.send({ data: "Todos get success" });
});

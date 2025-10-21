import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBorrow extends Document {
  image: string;
  title: string;
  quantity: number;
  isbn: number;
  dueDate: string;
  bookId: string;
}

const BorrowSchema: Schema<IBorrow> = new mongoose.Schema({
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  dueDate: { type: String, required: true },
  title: { type: String, required: true },
  isbn: { type: Number, required: true },
  bookId: { type: String, required: true },
});

const BorrowModel: Model<IBorrow> =
  mongoose.models.Borrow || mongoose.model<IBorrow>("Borrow", BorrowSchema);

export default BorrowModel;

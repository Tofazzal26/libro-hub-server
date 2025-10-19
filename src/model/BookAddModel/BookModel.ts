import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBook extends Document {
  image: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  isbn: number;
  copies: number;
  availability: boolean;
}

const BookSchema: Schema<IBook> = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  isbn: { type: Number, required: true },
  copies: { type: Number, required: true },
  availability: { type: Boolean, required: true },
});

const BookModel: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

export default BookModel;

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    published: {
      type: Date,
      required: true,
    },
    createdby: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);

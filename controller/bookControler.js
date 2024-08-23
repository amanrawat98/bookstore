import { Book } from "../models/book.js";
import Joi from "joi";

const createBookSchema = Joi.object({
  title: Joi.string().min(4).required().messages({
    "any.required": "Title is required.",
    "string.empty": "Title can't be empty.",
    "string.min": "Title must be at least 4 characters long.",
  }),
  author: Joi.string().required().messages({
    "any.required": "author is required.",
    "string.empty": "author can't be empty.",
  }),
  publisher: Joi.string().required().messages({
    "any.required": "publisher is required.",
    "string.empty": "publisher can't be empty.",
  }),

  stock: Joi.number().integer().required().messages({
    "any.required": "Password is required.",
    "number.integer": "Must be a Integer.",
  }),
  published: Joi.date().required().messages({
    "any.required": "Date is required.",
    "date.base": "The date provided must be a valid date.",
  }),
});

// Create Book

export const createBook = async (req, res) => {
  try {
    const { body } = req;
    const result = createBookSchema.validate(body, { abortEarly: false });
    const { value, error } = result;
    console.log(error);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, author, publisher, stock, published } = value;
    const findBook = await Book.findOne({ title });
    console.log(findBook);

    if (findBook) {
      return res.status(400).json({ message: "Book Already Exists" });
    }

    const user = req.cookies.user;
    console.log("new user is", user);
    const { _id } = user;
    console.log("id", _id);

    const newBook = new Book({
      title,
      author,
      publisher,
      stock,
      published,
      createdby: _id,
    });

    await newBook.save();

    return res.status(200).json({ message: "Book Created successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Books

export const getBook = async (req, res) => {
  try {
    const allbooks = await Book.find({});
    return res.status(200).json({ data: allbooks });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBookSchema = Joi.object({
  bookid: Joi.string().required().messages({
    "any.required": "BookId is required.",
    "string.empty": "BookId can't be empty.",
  }),
});

//Detete Book

export const deleteBook = async (req, res) => {
  try {
    const { body } = req;
    const result = deleteBookSchema.validate(body, { abortEarly: false });
    const { value, error } = result;

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { bookid } = value;

    const product = await Book.findByIdAndDelete(bookid);
    console.log("product", product);
    return res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { bookid } = req.params;
    const { body } = req;
    const result = createBookSchema.validate(body, { abortEarly: false });
    const { value, error } = result;
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, author, publisher, stock, date } = value;
    const updatedbookvalue = {
      title: title,
      author: author,
      publisher: publisher,
      stock: stock,
      date: date,
    };
    const bookUpdated = await Book.findByIdAndUpdate(bookid, updatedbookvalue, {
      new: true,
    });
    if (!bookUpdated) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book Updated Successfully", book: bookUpdated });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const findBookById = async (req, res) => {
  try {
    const { userid } = req.params;
    const books = await Book.find({ createdby: userid });
    if (books.length === 0) {
      return res.status(400).json({ message: "No Book Find" });
    }

    return res.status(200).json({ books: books });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  updateBook,
} from "../controller/bookControler.js";
const router = express.Router();
import { userAuthorization } from "../auth/userauth.js";

router.post("/", userAuthorization, createBook);
router.get("/", getBook);
router.delete("/", userAuthorization, deleteBook);
router.put("/:bookid", userAuthorization, updateBook);

export default router;

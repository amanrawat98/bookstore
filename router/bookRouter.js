import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  updateBook,
} from "../controller/bookControler.js";
const router = express.Router();
import { userAuthorization } from "../auth/userauth.js";

router.post("/createbook", userAuthorization, createBook);
router.get("/allbooks", getBook);
router.delete("/deleteBook", userAuthorization, deleteBook);
router.put("/updatebook/:bookid", userAuthorization, updateBook);

export default router;

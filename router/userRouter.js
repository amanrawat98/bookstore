import express from "express";

import { userLogin, userSignUp } from "../controller/userController.js";

const router = express.Router();

//create user
/* const signupSchema = joi.object({
  username: joi.string().min(1).required().messages({
    "string.empty": "Username is required",
    "any.required": "Username is required"
  }),
  email: joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required"
  }),
  password: joi.string().min(4).required().messages({
    "string.min": "Password must be greater than 4 characters",
    "any.required": "Password is required"
  }),
}); */


// sign up user
router.post("/signup", userSignUp);

//login user



router.post("/login", userLogin);

export default router;

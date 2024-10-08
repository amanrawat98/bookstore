import { User } from "../models/user.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// Sign Up
const signupSchema = Joi.object({
  username: Joi.string().min(4).required().messages({
    "any.required": "Username is required.",
    "string.empty": "Username can't be empty.",
    "string.min": "Username must be at least 4 characters long.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email can't be empty.",
    "string.email": "Please enter a valid email address.",
  }),
  password: Joi.string().min(4).required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password can't be empty.",
    "string.min": "Password must be at least 4 characters long.",
  }),
});

export const userSignUp = async (req, res) => {
  try {
    const { body } = req;

    const result = signupSchema.validate(body, { abortEarly: false });
    const { value, error } = result;
    console.log(error);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = value;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    let hashpass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpass,
    });

    await newUser.save();

    const createduser = newUser.toObject();
    delete createduser.password;

    console.log("createduser", createduser);

    const token = jwt.sign(
      {
        data: createduser,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "12h" }
    );

    return res
      .status(200)
      .json({ message: "Created successfully", token, createduser });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login
const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Email cant be empty",
    "string.email": "enter valid email",
  }),
  password: Joi.string().required().min(2).messages({
    "any.required": "password cant be empty",
    "string.min": "password need to be minimum 2 digits",
  }),
});

export const userLogin = async (req, res) => {
  try {
    const { body } = req;
    const result = loginSchema.validate(body, { abortEarly: false });
    const { value, error } = result;
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credentials not correct" });
    }

    let decryptpass = await bcrypt.compare(password, user.password);

    if (!decryptpass) {
      return res.status(400).json({ message: "Credentials not correct" });
    }

    const createduser = user.toObject();
    delete createduser.password;

    console.log("createduser", createduser);

    const token = jwt.sign(
      {
        data: createduser,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "12h" }
    );

    res.cookie("user", createduser);
    return res
      .status(200)
      .json({ message: "Login in SuccessFully", token, createduser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

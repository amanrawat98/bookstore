import express from "express";
import { dbConnection } from "./database/dbconnection.js";
import dotenv from "dotenv";
import { config } from "dotenv";
import userRouter from "./router/userRouter.js";
import bookRouter from "./router/bookRouter.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.json());

config({ path: "./config/config.env" });

dotenv.config();
dbConnection();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1", userRouter);
app.use("/api/v1", bookRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("connected", PORT);
});

app.get("/", () => {
  console.log("hello");
});

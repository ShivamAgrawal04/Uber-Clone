import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
const corsOptions = {
  origin: process.env.ORIGIN,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;

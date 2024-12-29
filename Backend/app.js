import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import dbConnect from "./db/db.js";
dbConnect();
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);

const corsOptions = {
  origin: process.env.ORIGIN,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;

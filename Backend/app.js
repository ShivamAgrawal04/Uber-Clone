import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./db/db.js";
dbConnect();
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/captain", captainRoutes);

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;

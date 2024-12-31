import { validationResult } from "express-validator";
import userModel from "../models/user.models.js";
import { createUser } from "../services/user.services.js";
import blacklistModel from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    return res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);

    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
  }
};

export const profileUser = async (req, res, next) => {
  return res.status(200).json(req.user);
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistModel.create({ token });

  return res.status(200).json({ message: "User logged out Successfully" });
};

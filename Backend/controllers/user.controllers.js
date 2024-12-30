import { validationResult } from "express-validator";
import userModel from "../models/user.models.js";
import { createUser } from "../services/user.services.js";

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
    const userExist = await userModel.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const token = await userExist.generateAuthToken();

    return res.status(200).json({ token, userExist });
  } catch (error) {
    console.log(error);
  }
};

import userModel from "../models/user.models.js";
import captainModel from "../models/captain.model.js";
import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, No token provided" });
  }

  const isBlacklisted = await blacklistModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Token has expired" });
    }
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invliad Token" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, No token provided" });
  }

  const isBlacklisted = await blacklistModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Token has expired" });
    }
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "User not found" });
    }
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invliad Token" });
  }
};

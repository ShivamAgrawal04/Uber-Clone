import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;
    console.log(fullName, email, password, vehicle);
    const captainExist = await captainModel.findOne({ email });
    if (captainExist) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password, 10);
    const captain = await createCaptain({
      fullName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    const token = captain.generateAuthToken();
    if (!token) {
      return res.status(401).json({ message: "token expired" });
    }

    return res.status(200).json({ token, captain });
  } catch (err) {
    return res.status(401).json({ message: "Invalid data" });
  }
};
export const loginCaptain = async (req, res, next) => {};

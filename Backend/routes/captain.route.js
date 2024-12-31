import express from "express";
import { body } from "express-validator";
import {
  loginCaptain,
  registerCaptain,
} from "../controllers/captain.controller.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 symbol, and be at least 8 characters long"
      ),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be one of: car, motorcycle, auto"),
  ],
  registerCaptain
);
router.post("/login", loginCaptain);

export default router;

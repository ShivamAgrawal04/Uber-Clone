import express from "express";
import { body } from "express-validator";
import {
  loginUser,
  logoutUser,
  profileUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must be contain 1 upperletter and 1 lowerletter atleast one digit and one symbol alsoand must contain 8 chracters"
      ),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name Must be at least 3 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isStrongPassword().withMessage("Invalid Password"),
  ],
  loginUser
);

router.get("/profile", authUser, profileUser);
router.get("/logout", logoutUser);

export default router;

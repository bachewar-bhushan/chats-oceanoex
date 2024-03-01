import express from "express";
import { body } from "express-validator";
import { signin, signup, logout } from "../controllers/authController.js";
const router = express.Router();

const signupValidator = [
  body("fullname", "Enter the valid name").isLength({ min: 2 }),
  body("email", "Enter the valid email").isEmail(),
  body("password", "Password must be atleast 8 characters").isLength({
    min: 8,
  }),
];

const signinValidator = [
  body("email", "Enter the valid email").isEmail(),
  body("password", "Password must be atleast 8 characters").isLength({
    min: 8,
  }),
];

router.post("/signin", signinValidator, signin);
router.post("/signup", signupValidator, signup);
router.post("/logout", logout);

export default router;

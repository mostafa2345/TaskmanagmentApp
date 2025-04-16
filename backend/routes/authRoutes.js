import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { login, logout, signup } from "../controllers/authController.js";
const router = express.Router();
//signup
router.post("/signup", signup);
//login
router.post("/login", login);
//logout
router.post("/logout", logout);
export default router;

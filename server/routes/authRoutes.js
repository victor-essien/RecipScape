import express from "express";
import {
  googleSignIn,
  googleAuthCallback,
  login,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

// Route to start the Google Sign-In process
router.post("/google", googleSignIn);

// Route to handle the callback from Google after user signs in
router.get("/google/callback", googleAuthCallback);

export default router;

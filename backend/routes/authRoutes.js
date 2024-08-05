import express from "express";
import {
  register,
  login,
  perfil,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendResetPassword,
} from "../controllers/authController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/perfil", checkAuth, perfil);
router.post("/refresh", refreshTokens);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword);
router.post("/reset-password/:id/:token", sendResetPassword);

export default router;

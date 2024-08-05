import express from "express";
import { createEmail } from "../controllers/emailController.js";

const router = express.Router();

router.route("/").post(createEmail);

export default router;

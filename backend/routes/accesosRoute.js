import express from "express";
import {
  createAcceso,
  getAccesos,
  getAccesoByEmail,
  deleteAcceso,
} from "../controllers/accesosController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(getAccesos).post(checkAuth, createAcceso);
router.route("/:id").delete(checkAuth, deleteAcceso);
router.route("/validar/:email").get(getAccesoByEmail);

export default router;

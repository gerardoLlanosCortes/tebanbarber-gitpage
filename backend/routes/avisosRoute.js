import express from "express";
import {
  createAviso,
  getAvisos,
  getActiveAviso,
  updateAviso,
  deleteAviso,
  changeStatus,
} from "../controllers/avisosController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(getAvisos).post(checkAuth, createAviso);
router.route("/:id").put(checkAuth, updateAviso).delete(checkAuth, deleteAviso);

router.route("/:id/status").put(checkAuth, changeStatus);

router.route("/active").get(getActiveAviso);

export default router;

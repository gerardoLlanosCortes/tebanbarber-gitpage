import express from "express";
import {
  createTipoServicio,
  getTiposServicio,
  getTiposServicioAndServicios,
  getTipoServicioById,
  updateTipoServicio,
  deleteTipoServicio,
} from "../controllers/tipoServicioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").post(checkAuth, createTipoServicio).get(getTiposServicio);
router.route("/servicios").get(getTiposServicioAndServicios);

router
  .route("/:id")
  .get(getTipoServicioById)
  .put(checkAuth, updateTipoServicio)
  .delete(checkAuth, deleteTipoServicio);

export default router;

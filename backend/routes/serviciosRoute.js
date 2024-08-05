import express from "express";
import {
  getServicios,
  createServicio,
  getServicioById,
  getSeviciosFromUsers,
  updateServicio,
  deleteServicio,
} from "../controllers/serviciosController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Ruta para crear un servicio con imagen
router.route("/").get(getServicios).post(checkAuth, createServicio);
router.route("/obtener-servicios").get(getSeviciosFromUsers);
router
  .route("/:id")
  .get(getServicioById)
  .put(checkAuth, updateServicio)
  .delete(checkAuth, deleteServicio);

export default router;

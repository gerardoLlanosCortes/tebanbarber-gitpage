import express from "express";
import {
  getFechas,
  createFecha,
  getFechaById,
  getFechaByUserId,
  updateFecha,
  deleteFecha,
  agendarHora,
  cancelarHora,
  deleteHora,
  agregarHoraAgendada,
  eliminarHora,
  getFechasForClientsByEmail,
  getFechasForClientsByUserId,
} from "../controllers/fechasControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").post(checkAuth, createFecha).get(getFechas);

router
  .route("/:id")
  .get(getFechaById)
  .put(checkAuth, updateFecha)
  .delete(checkAuth, deleteFecha);

router.route("/obtener-fechas/:userId").get(getFechaByUserId);
router
  .route("/obtener-fechas-clientes/email/:email")
  .get(getFechasForClientsByEmail);
router
  .route("/obtener-fechas-clientes/:userId")
  .get(getFechasForClientsByUserId);
router.put("/:fechaId/hora/:horaId/agendar", agendarHora);
router.put("/:fechaId/hora/:horaId/cancelar", cancelarHora);
router.put("/:fechaId/hora/:horaId/eliminar", deleteHora);
router.put("/:fechaId/agregar-hora-agendada", agregarHoraAgendada);
router.put("/:fechaId/cancelar-hora-agendada", eliminarHora);

export default router;

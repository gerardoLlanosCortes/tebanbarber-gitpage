import express from "express";
import {
  getUsersInfo,
  getUser,
  getServiciosFromUser,
  addServicioToUser,
  removeServicioFromUser,
  changeStatus,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
router.route("/").get(getUsersInfo);
router
  .route("/:id")
  .get(getUser)
  .delete(checkAuth, deleteUser)
  .put(checkAuth, updateUser);
router.route("/status/:userId").put(checkAuth, changeStatus);
router
  .route("/servicios/:userId/:servicioId")
  .post(checkAuth, addServicioToUser)
  .delete(checkAuth, removeServicioFromUser);

router.route("/servicios/:userId").get(getServiciosFromUser);

export default router;

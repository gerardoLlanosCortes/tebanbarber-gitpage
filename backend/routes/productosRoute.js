import express from "express";
import {
  createProducto,
  getProducto,
  getProductos,
  deleteProducto,
  updateProducto,
} from "../controllers/productosController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").post(checkAuth, createProducto).get(getProductos);

router
  .route("/:id")
  .get(getProducto)
  .put(checkAuth, updateProducto)
  .delete(checkAuth, deleteProducto);

export default router;

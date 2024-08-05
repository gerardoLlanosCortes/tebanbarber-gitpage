import Accesos from "../models/Accesos.js";
import { handleNotFoundError, validateObjectId } from "../utils/index.js";

//!==== POST ====
const createAcceso = async (req, res) => {
  const { email, rol } = req.body;

  if (!email) {
    return res.status(400).json({
      msg: "Todos los campos son obligatorios",
    });
  }

  try {
    const nuevoAcceso = new Accesos(req.body);
    await nuevoAcceso.save();
    res.json(nuevoAcceso);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al crear el acceso",
    });
  }
};

//! ==== GET ALL ====
const getAccesos = async (req, res) => {
  try {
    const accesos = await Accesos.find();
    res.json(accesos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener los accesos",
    });
  }
};

//! ==== GET ONE ====
const getAccesoByEmail = async (req, res) => {
  const { email } = req.params;

  // Basic email validation
  if (!email || typeof email !== "string") {
    return res.status(400).json({
      msg: "Invalid email",
    });
  }

  try {
    // Find access records by email
    const acceso = await Accesos.find({ email: email });
    if (!acceso) {
      return handleNotFoundError("El correo no tiene acceso", res);
    }
    res.json(acceso);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener el acceso del correo",
    });
  }
};

const deleteAcceso = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const acceso = await Accesos.findById(id);
  if (!acceso) {
    return handleNotFoundError("El acceso no existe", res);
  }

  try {
    await acceso.deleteOne();
    res.json({
      msg: "El acceso se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar el acceso",
    });
  }
};

export { createAcceso, getAccesos, getAccesoByEmail, deleteAcceso };

import Avisos from "../models/Avisos.js";
import { handleNotFoundError, validateObjectId } from "../utils/index.js";

//!==== POST ====
const createAviso = async (req, res) => {
  const { titulo, contenido } = req.body;

  if (!titulo || !contenido) {
    return res.status(400).json({
      msg: "Todos los campos son obligatorios",
    });
  }

  try {
    const nuevoAviso = new Avisos(req.body);
    await nuevoAviso.save();
    res.json(nuevoAviso);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al crear el aviso",
    });
  }
};

//! ==== GET ALL ====
const getAvisos = async (req, res) => {
  try {
    const aviso = await Avisos.find();
    res.json(aviso);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener el aviso",
    });
  }
};

const getActiveAviso = async (req, res) => {
  try {
    const avisoActivo = await Avisos.findOne({ isActivo: true });

    res.json(avisoActivo);
  } catch (error) {
    console.error("Error al obtener el aviso activo:", error);
    res.status(500).json({ error: "Error al obtener el aviso activo" });
  }
};

const updateAviso = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const aviso = await Avisos.findById(id);
  if (!aviso) {
    return handleNotFoundError("El aviso no existe", res);
  }

  // Actualizar campos del producto
  aviso.titulo = req.body.titulo || aviso.titulo;
  aviso.contenido = req.body.contenido || aviso.contenido;

  try {
    await aviso.save();
    res.json(aviso);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al actualizar el aviso" });
  }
};

const deleteAviso = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const aviso = await Avisos.findById(id);
  if (!aviso) {
    return handleNotFoundError("El aviso no existe", res);
  }

  try {
    await aviso.deleteOne();
    res.json({
      msg: "El aviso se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al eliminar el aviso" });
  }
};

const changeStatus = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const aviso = await Avisos.findById(id);
  if (!aviso) {
    return handleNotFoundError("El aviso no existe", res);
  }

  try {
    if (!aviso.isActivo) {
      await Avisos.updateMany({}, { isActivo: false });
      aviso.isActivo = true;
    } else {
      aviso.isActivo = false;
    }

    await aviso.save();

    // Obtener y devolver todos los avisos
    const avisos = await Avisos.find();
    res.json(avisos);
  } catch (error) {
    console.error("Error cambiando estado del aviso:", error);
    res.status(500).json({ error: "Error cambiando estado del aviso" });
  }
};

export {
  createAviso,
  getAvisos,
  getActiveAviso,
  updateAviso,
  deleteAviso,
  changeStatus,
};

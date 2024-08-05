import TipoServicio from "../models/TipoServicio.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createTipoServicio = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevoTipoServicio = new TipoServicio({ nombre });
    await nuevoTipoServicio.save();
    // Devuelve solo el nombre y el ID en la respuesta
    res
      .status(201)
      .json({ _id: nuevoTipoServicio._id, nombre: nuevoTipoServicio.nombre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el tipo de servicio" });
  }
};
const getTiposServicio = async (req, res) => {
  try {
    // Utiliza el método select para especificar los campos que deseas devolver
    const tiposServicio = await TipoServicio.find().select("_id nombre");
    res.json(tiposServicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los tipos de servicio" });
  }
};

const getTiposServicioAndServicios = async (req, res) => {
  try {
    const tiposServicio = await TipoServicio.find().populate("servicios");
    res.json(tiposServicio);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los tipos de servicio" });
  }
};

const getTipoServicioById = async (req, res) => {
  const { id } = req.params;

  try {
    const tipoServicio = await TipoServicio.findById(id);
    if (!tipoServicio) {
      return res.status(404).json({ msg: "Tipo de servicio no encontrado" });
    }
    res.json(tipoServicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el tipo de servicio" });
  }
};

//! ==== UPDATE ====
const updateTipoServicio = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const tipoServicio = await TipoServicio.findById(id);
  if (!tipoServicio) {
    return handleNotFoundError("Eltipo de servicio no existe", res);
  }

  tipoServicio.nombre = req.body.nombre || tipoServicio.nombre;

  try {
    await tipoServicio.save();
    res.json({
      msg: "El tipo de servicio se actualizó correctamente",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error al actualizar el tipo de servicio" });
  }
};

const deleteTipoServicio = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const tipoServicio = await TipoServicio.findById(id);
  if (!tipoServicio) {
    return handleNotFoundError("El tipo de servicio no existe", res);
  }

  try {
    await tipoServicio.deleteOne();
    res.json({
      msg: "El tipo de servicio se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error al eliminar el tipo de servicio" });
  }
};

export {
  createTipoServicio,
  getTiposServicio,
  getTipoServicioById,
  updateTipoServicio,
  deleteTipoServicio,
  getTiposServicioAndServicios,
};

import Servicios from "../models/Servicios.js";
import TipoServicio from "../models/TipoServicio.js";
import User from "../models/User.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

//!==== POST ====

// Función para crear un servicio con imagen
const createServicio = async (req, res) => {
  try {
    const { servicio, precio, duracion, tipo, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : "imagenDefault.webp"; // Obtiene el nombre del archivo de la solicitud

    if (validateObjectId(tipo, res)) return;

    const tipoServicioExiste = await TipoServicio.findById(tipo);
    if (!tipoServicioExiste) {
      return handleNotFoundError("El Tipo de servicio no existe", res);
    }

    const nuevoServicio = new Servicios({
      servicio,
      precio,
      tipo,
      duracion,
      descripcion,
      imagen, // Asigna el nombre del archivo al campo de imagen
    });

    await nuevoServicio.save();

    tipoServicioExiste.servicios.push(nuevoServicio._id);
    await tipoServicioExiste.save();

    const nuevoServicioConTipo = await Servicios.findById(
      nuevoServicio._id
    ).populate("tipo", "_id nombre");

    res.status(200).json(nuevoServicioConTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al agregar el Servicio" });
  }
};

const getServicios = async (req, res) => {
  try {
    const servicios = await Servicios.find().populate("tipo", "_id nombre"); // Selecciona solo el _id y el nombre del tipo de servicio
    res.status(200).json(servicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los servicios" });
  }
};

//! ==== GET ONE ====
const getServicioById = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const servicio = await Servicios.findById(id);
  if (!servicio) {
    return handleNotFoundError("El servicio no existe", res);
  }

  res.status(200).json(servicio);
};

const getSeviciosFromUsers = async (req, res) => {
  try {
    // Encuentra todos los usuarios y trae solo los campos _id, nombre y servicios
    const users = await User.find()
      .select("_id nombre servicios")
      .populate("servicios")
      .where("activo")
      .equals(true);

    // Filtra los usuarios para incluir solo aquellos que tienen servicios
    const usersWithServicios = users.filter(
      (user) => user.servicios && user.servicios.length > 0
    );

    if (usersWithServicios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios con servicios" });
    }

    res.json(usersWithServicios);
  } catch (error) {
    console.error("Error fetching users with servicios:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios con sus servicios" });
  }
};

//! ==== UPDATE ====
const updateServicio = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  try {
    const servicio = await Servicios.findById(id);
    if (!servicio) {
      return handleNotFoundError("El servicio no existe", res);
    }

    // Actualizar los campos del servicio con los valores proporcionados en el body
    servicio.servicio = req.body.servicio || servicio.servicio;
    servicio.precio = req.body.precio || servicio.precio;
    servicio.duracion = req.body.duracion || servicio.duracion;
    servicio.descripcion = req.body.descripcion || servicio.descripcion;

    // Verificar si el tipo ha cambiado
    if (servicio.tipo.toString() !== req.body.tipo) {
      // Obtener el tipo de servicio anterior y el nuevo
      const tipoServicioAnterior = await TipoServicio.findById(servicio.tipo);
      const tipoServicioNuevo = await TipoServicio.findById(req.body.tipo);

      // Remover el servicio del tipo anterior
      tipoServicioAnterior.servicios.pull(servicio._id);
      // Agregar el servicio al tipo nuevo
      tipoServicioNuevo.servicios.push(servicio._id);

      // Guardar los cambios en ambos tipos de servicio
      await Promise.allSettled([
        tipoServicioAnterior.save(),
        tipoServicioNuevo.save(),
      ]);

      servicio.tipo = req.body.tipo;
    }

    // Guardar el servicio actualizado en la base de datos
    const servicioActualizado = await servicio.save();

    // Realizar populate para obtener el servicio actualizado con el tipo poblado
    const servicioActualizadoConTipo = await Servicios.findById(
      servicioActualizado._id
    ).populate("tipo", "_id nombre");

    // Enviar la respuesta con el servicio actualizado y el tipo poblado
    res.status(200).json(servicioActualizadoConTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el servicio" });
  }
};

const deleteServicio = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const servicio = await Servicios.findById(id);
  if (!servicio) {
    return handleNotFoundError("El servicio no existe", res);
  }

  try {
    const tipoServicio = await TipoServicio.findById(servicio.tipo);
    tipoServicio.servicios.pull(servicio._id);

    await Promise.allSettled([tipoServicio.save(), servicio.deleteOne()]);

    res.status(200).json({
      msg: "El servicio se eliminó correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el servicio" });
  }
};

export {
  createServicio,
  getServicios,
  getServicioById,
  getSeviciosFromUsers,
  updateServicio,
  deleteServicio,
};

import Servicio from "../models/Servicios.js";
import User from "../models/User.js";
import { handleNotFoundError, validateObjectId } from "../utils/index.js";

const getUsersInfo = async (req, res) => {
  try {
    const users = await User.find()
      .select("_id nombre email activo servicios")
      .populate("servicios");
    if (!users) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al mostrar los usuarios" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  try {
    const user = await User.findById(id).select(
      "_id nombre email activo servicios"
    );
    if (!user) {
      return handleNotFoundError("El usuario no existe", res);
    }

    res.json(user);
  } catch (error) {
    console.error("Error al obtener el usuarios:", error);
    res.status(500).json({ error: "Error al mostrar el usuarios" });
  }
};

const getServiciosFromUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("servicios");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user.servicios);
  } catch (error) {
    console.error("Error al obtener los servicio del usuario:", error);
    res
      .status(500)
      .json({ error: "Error al mostrar los servicios del usuario" });
  }
};

const addServicioToUser = async (req, res) => {
  const { userId, servicioId } = req.params;

  try {
    // Validar que el servicio existe
    const servicio = await Servicio.findById(servicioId);
    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    // Encontrar al usuario y verificar que existe
    const user = await User.findById(userId).populate("servicios");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el servicio ya está en la lista
    if (!user.servicios.some((s) => s._id.toString() === servicioId)) {
      // Añadir el servicio al arreglo de servicios del usuario
      user.servicios.push(servicioId);
      await user.save();
    }

    // Devolver el arreglo actualizado de servicios
    res.json(servicio);
  } catch (error) {
    console.error("Error añadiendo servicio al usuario:", error);
    res.status(500).json({ error: "Error añadiendo servicio al usuario" });
  }
};

const removeServicioFromUser = async (req, res) => {
  const { userId, servicioId } = req.params;

  try {
    // Encontrar al usuario y verificar que existe
    const user = await User.findById(userId).populate("servicios");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Remover el servicio del arreglo de servicios del usuario
    user.servicios = user.servicios.filter(
      (s) => s._id.toString() !== servicioId
    );
    await user.save();

    // Devolver el ID del servicio removido
    res.json({ removedServiceId: servicioId });
  } catch (error) {
    console.error("Error removiendo servicio del usuario:", error);
    res.status(500).json({ error: "Error removiendo servicio del usuario" });
  }
};

const changeStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    // Encontrar al usuario y verificar que existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // cambiar el estado del usuario
    user.activo = !user.activo;
    await user.save();

    // Devolver el ID del servicio removido
    res.json({ msg: "Estado cambiado con éxito" });
  } catch (error) {
    console.error("Error removiendo servicio del usuario:", error);
    res.status(500).json({ error: "Error removiendo servicio del usuario" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const user = await User.findById(id);
  if (!user) {
    return handleNotFoundError("El usuario no existe", res);
  }

  try {
    await user.deleteOne();
    res.json({
      msg: "El usuario se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error eliminando al usuario" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const user = await User.findById(id).select(
    "_id nombre email activo servicios"
  );
  if (!user) {
    return handleNotFoundError("El usuario no existe", res);
  }

  console.log(req.body);

  user.nombre = req.body.nombre || user.nombre;
  user.email = req.body.email || user.email;

  try {
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error actualizando al usuario" });
  }
};

export {
  getUsersInfo,
  getUser,
  getServiciosFromUser,
  addServicioToUser,
  removeServicioFromUser,
  changeStatus,
  deleteUser,
  updateUser,
};

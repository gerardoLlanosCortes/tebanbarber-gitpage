import Fechas from "../models/Fechas.js";
import mongoose from "mongoose";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

//!==== POST ====
const createFecha = async (req, res) => {
  const { fecha } = req.body;
  req.body.creadoPor = req.user.id;

  if (!fecha) {
    return res.status(400).json({
      msg: "La fecha es obligatoria",
    });
  }

  try {
    const nuevaFecha = new Fechas(req.body);
    await nuevaFecha.save();
    res.json({
      msg: "La fecha se creó correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al agregar la fecha",
    });
  }
};

//! ==== GET ALL ====
const getFechas = async (req, res) => {
  try {
    const fechas = await Fechas.find();
    res.json(fechas);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener las fecha",
    });
  }
};

//! ==== GET ONE ====
const getFechaById = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;

  const fecha = await Fechas.findById(id);
  if (!fecha) {
    return handleNotFoundError("La fecha no existe", res);
  }

  res.json(fecha);
};

const getFechaByUserId = async (req, res) => {
  const { userId } = req.params;

  if (validateObjectId(userId, res)) return;

  try {
    const fechas = await Fechas.find({ creadoPor: userId });

    if (fechas.length === 0) {
      return handleNotFoundError("No hay ninguna fecha para ese usuario", res);
    }

    res.json(fechas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener las fechas" });
  }
};

//

const getFechasForClientsByEmail = async (req, res) => {
  try {
    // Obtener el correo del cliente desde los parámetros
    const { email } = req.params;
    console.log(email);

    // Obtener la fecha actual y restarle un día
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Filtrar las fechas a partir de un día antes del actual
    const fechas = await Fechas.find({
      fecha: { $gte: yesterday },
      "horasAgendadas.email": email,
    }).populate("creadoPor", "nombre _id"); // Poblar creadoPor con nombre e id

    if (fechas.length === 0) {
      return handleNotFoundError(
        "No hay ninguna fecha para ese usuario desde ayer en adelante",
        res
      );
    }

    // Filtrar las horas agendadas que correspondan al correo electrónico
    const fechasFiltradas = fechas
      .map((fecha) => {
        const horasFiltradas = fecha.horasAgendadas.filter(
          (hora) => hora.email === email
        );
        return {
          ...fecha._doc,
          horasAgendadas: horasFiltradas,
        };
      })
      .filter((fecha) => fecha.horasAgendadas.length > 0); // Filtrar fechas sin horas agendadas

    console.log(fechasFiltradas);

    res.json(fechasFiltradas);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener las fechas",
    });
  }
};

const getFechasForClientsByUserId = async (req, res) => {
  const { userId } = req.params;

  if (validateObjectId(userId, res)) return;

  try {
    // Obtener la fecha actual y restarle un día
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    console.log(today);

    // Filtrar las fechas a partir de un día antes del actual
    const fechas = await Fechas.find({
      creadoPor: userId,
      fecha: { $gte: yesterday },
    });

    if (fechas.length === 0) {
      return handleNotFoundError(
        "No hay ninguna fecha para ese usuario desde ayer en adelante",
        res
      );
    }

    res.json(fechas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener las fechas" });
  }
};

const updateFecha = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;

  const fecha = await Fechas.findById(id);
  if (!fecha) {
    return handleNotFoundError("La fecha no existe", res);
  }

  // Actualiza los valores de la fecha y las horas
  fecha.horaInicio = req.body.horaInicio || fecha.horaInicio;
  fecha.horaFin = req.body.horaFin || fecha.horaFin;

  try {
    await fecha.save();

    // Envía una respuesta que incluye el _id de la hora recién creada
    res.json(fecha);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al actualizar la fecha" });
  }
};

//! ==== DELETE ====
const deleteFecha = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;

  const fecha = await Fechas.findById(id);
  if (!fecha) {
    return handleNotFoundError("La fecha no existe", res);
  }

  try {
    await fecha.deleteOne();
    res.json({
      msg: "La fecha se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al eliminar la fecha" });
  }
};

//! Controlador para agregar una hora agendada
// Función para comprobar si dos rangos horarios se solapan
const solapanHorarios = (inicio1, fin1, inicio2, fin2) => {
  return (
    (inicio1 < fin2 && inicio1 >= inicio2) ||
    (fin1 <= fin2 && fin1 > inicio2) ||
    (inicio1 <= inicio2 && fin1 >= fin2)
  );
};

// Controlador para agregar una hora agendada
const agregarHoraAgendada = async (req, res) => {
  const { fechaId } = req.params;
  const { horaInicio, horaFin, nombre, email, servicio } = req.body;

  try {
    // Busca la fecha por su ID
    const fecha = await Fechas.findById(fechaId);

    // Si la fecha no existe, devuelve un error
    if (!fecha) {
      return res.status(404).json({ message: "Fecha no encontrada" });
    }

    // Verifica si la nueva hora se solapa con alguna hora ya agendada
    const conflicto = fecha.horasAgendadas.some((hora) =>
      solapanHorarios(horaInicio, horaFin, hora.horaInicio, hora.horaFin)
    );

    if (conflicto) {
      return res
        .status(400)
        .json({ message: "La hora agendada se solapa con una existente" });
    }

    // Crea una nueva hora agendada
    const nuevaHoraAgendada = {
      horaInicio,
      horaFin,
      nombre,
      email,
      servicio,
    };

    // Agrega la nueva hora agendada al array de horasAgendadas
    fecha.horasAgendadas.push(nuevaHoraAgendada);

    // Guarda los cambios en la base de datos
    await fecha.save();

    // Devuelve la fecha actualizada
    res.status(200).json(fecha);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! ==== ELIMINAR HORA ====
const eliminarHora = async (req, res) => {
  const { fechaId } = req.params;
  const { horaInicio, horaFin } = req.body;

  if (validateObjectId(fechaId, res)) return;

  try {
    const fecha = await Fechas.findById(fechaId);
    if (!fecha) {
      return handleNotFoundError("La fecha no existe", res);
    }

    const horaIndex = fecha.horasAgendadas.findIndex(
      (hora) => hora.horaInicio === horaInicio && hora.horaFin === horaFin
    );

    if (horaIndex === -1) {
      return handleNotFoundError("La hora no existe en esta fecha", res);
    }

    fecha.horasAgendadas.splice(horaIndex, 1); // Eliminar la hora del arreglo
    await fecha.save();

    res.json({
      msg: "Hora eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar la hora",
    });
  }
};

//! ==== AGENDAR HORA ====
const agendarHora = async (req, res) => {
  const { fechaId, horaId } = req.params;

  if (validateObjectId(fechaId, res) || validateObjectId(horaId, res)) return;

  try {
    const fecha = await Fechas.findById(fechaId);
    if (!fecha) {
      return handleNotFoundError("La fecha no existe", res);
    }

    const hora = fecha.horas.find((hora) => hora._id.toString() === horaId);
    if (!hora) {
      return handleNotFoundError("La hora no existe en esta fecha", res);
    }

    // if (!hora.habilitado) {
    //   return res.status(400).json({
    //     msg: "La hora ya no se encuentra disponible",
    //   });
    // }

    hora.habilitado = false; // Cambiar el estado de la hora a false
    await fecha.save();

    res.json({
      msg: "Hora agendada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al agendar la hora",
    });
  }
};

//! ==== AGENDAR HORA ====
const cancelarHora = async (req, res) => {
  const { fechaId, horaId } = req.params;
  // if (validateObjectId(fechaId, res) || validateObjectId(horaId, res)) return;

  try {
    const fecha = await Fechas.findById(fechaId);
    if (!fecha) {
      return handleNotFoundError("La fecha no existe", res);
    }

    const hora = fecha.horas.find((hora) => hora._id.toString() === horaId);
    if (!hora) {
      return handleNotFoundError("La hora no existe en esta fecha", res);
    }

    hora.habilitado = true; // Cambiar el estado de la hora a false
    await fecha.save();

    res.json({
      msg: "Hora cancelada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al cancelar la hora",
    });
  }
};
const deleteHora = async (req, res) => {
  const { fechaId, horaId } = req.params;

  try {
    const fecha = await Fechas.findById(fechaId);
    if (!fecha) {
      return handleNotFoundError("La fecha no existe", res);
    }

    let horaIndex = -1;
    for (let i = 0; i < fecha.horas.length; i++) {
      const hora = fecha.horas[i];
      if (hora._id && hora._id.toString() === horaId) {
        horaIndex = i;
        break;
      } else if (hora.uid && hora.uid.toString() === horaId) {
        horaIndex = i;
        break;
      }
    }

    if (horaIndex === -1) {
      return handleNotFoundError("La hora no existe en esta fecha", res);
    }

    fecha.horas.splice(horaIndex, 1); // Elimina la hora del array
    await fecha.save();

    res.json({
      msg: "Hora eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar la hora",
    });
  }
};

export {
  getFechas,
  createFecha,
  getFechaById,
  getFechaByUserId,
  getFechasForClientsByEmail,
  getFechasForClientsByUserId,
  updateFecha,
  deleteFecha,
  agendarHora,
  cancelarHora,
  deleteHora,
  agregarHoraAgendada,
  eliminarHora,
};

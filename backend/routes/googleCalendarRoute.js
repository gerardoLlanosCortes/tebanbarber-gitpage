// googleCalendarRoute.js

import express from "express";
import {
  insertEvent,
  getEvents,
  deleteEvent,
  getEventById, // Importamos la función para obtener eventos por su ID
  updateEventById, // Importamos la función para actualizar eventos por su ID
  getEventByDateTime,
  deleteEventsByDate,
} from "../controllers/googleCalendarController.js";

const router = express.Router();

router.post("/:barberId", async (req, res) => {
  const { barberId } = req.params;
  const event = req.body;
  const result = await insertEvent(barberId, event);

  if (result === 1) {
    res.json({
      msg: "Evento agregado correctamente",
    });
  } else {
    res.status(500).json({
      msg: "Error al agregar el evento",
    });
  }
});

router.get("/:barberId", async (req, res) => {
  const { barberId } = req.params;
  const events = await getEvents(barberId);

  if (events) {
    res.json(events);
  } else {
    res.status(404).json({
      msg: "Eventos no encontrados",
    });
  }
});

router.get("/:fecha/:horaInicio/:horaFin/:barberId", async (req, res) => {
  const { fecha, horaInicio, horaFin, barberId } = req.params;
  const dateTimeStart = "";
  const dataTimeEnd = "";
  console.log(req.params);
  // const events = await getEventByDateTime(barberId, dateTimeStart, dataTimeEnd);

  if (events) {
    res.json(events);
  } else {
    res.status(404).json({
      msg: "Eventos no encontrados",
    });
  }
});

// Ruta para obtener un evento por su ID
router.get("/:barberId/:eventId", async (req, res) => {
  const { barberId, eventId } = req.params;
  const event = await getEventById(barberId, eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({
      msg: "Evento no encontrado",
    });
  }
});

// Ruta para actualizar un evento por su ID
router.put("/:barberId/:eventId", async (req, res) => {
  const { barberId, eventId } = req.params;
  const updatedEvent = req.body;
  const result = await updateEventById(barberId, eventId, updatedEvent);

  if (result === 1) {
    res.json({
      msg: "Evento actualizado correctamente",
    });
  } else {
    res.status(500).json({
      msg: "Error al actualizar el evento",
    });
  }
});

router.delete("/:barberId/:eventId", async (req, res) => {
  const { barberId, eventId } = req.params;
  const result = await deleteEvent(barberId, eventId);

  if (result === 1) {
    res.json({
      msg: "Evento eliminado correctamente",
    });
  } else {
    res.status(500).json({
      msg: "Error al eliminar el evento",
    });
  }
});

router.delete("/:barberId", async (req, res) => {
  const { barberId } = req.params;
  const { date } = req.body;
  const result = await deleteEventsByDate(barberId, eventId);

  if (result === 1) {
    res.json({
      msg: "Eventos eliminados correctamente",
    });
  } else {
    res.status(500).json({
      msg: `Error al eliminar los eventos de la fecha ${date}`,
    });
  }
});

export default router;

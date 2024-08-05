// googleCalendarController.js
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const getAuth = async (userId) => {
  const CREDENTIALS = JSON.parse(process.env[`CREDENTIALS_${userId}`]);

  return new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
  );
};

const getCalendarId = (userId) => {
  return process.env[`CALENDAR_ID_${userId}`];
};

const insertEvent = async (barberId, event) => {
  try {
    const calendarId = getCalendarId(barberId);
    const auth = await getAuth(barberId);
    // Insertar el nuevo evento si no hay superposición
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response.status == 200 && response.statusText === "OK") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};

const getEvents = async (barberId) => {
  try {
    const calendarId = getCalendarId(barberId);
    const auth = await getAuth(barberId);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let nextPageToken = null;
    let allItems = [];

    do {
      let response = await calendar.events.list({
        auth: auth,
        calendarId: calendarId,
        timeMin: yesterday.toISOString(),
        // timeMax: dateTimeEnd,
        timeZone: "America/Santiago",
        maxResults: 1000, // Puedes ajustar este valor según tus necesidades
        // pageToken: nextPageToken,
      });

      let items = response.data.items || [];
      allItems = [...allItems, ...items];
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    return allItems;
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return [];
  }
};

const deleteEvent = async (barberId, eventId) => {
  const calendarId = getCalendarId(barberId);
  const auth = await getAuth(barberId);
  try {
    let response = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
    });

    if (response.status == 204) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at deleteEvent --> ${error}`);
    return 0;
  }
};

// Obtener un evento por su ID
const getEventById = async (barberId, eventId) => {
  const calendarId = getCalendarId(barberId);
  const auth = await getAuth(barberId);
  try {
    let response = await calendar.events.get({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
    });

    return response.data;
  } catch (error) {
    console.log(`Error at getEventById --> ${error}`);
    return null;
  }
};

// Actualizar un evento por su ID
const updateEventById = async (barberId, eventId, updatedEvent) => {
  const calendarId = getCalendarId(barberId);
  const auth = await getAuth(barberId);
  try {
    let response = await calendar.events.update({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
      resource: updatedEvent,
    });

    if (response.status == 200 && response.statusText === "OK") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at updateEventById --> ${error}`);
    return 0;
  }
};

// Obtener un evento según fecha y hora dada
const getEventByDateTime = async (barberId, dateTimeStart, dateTimeEnd) => {
  const calendarId = getCalendarId(barberId);
  const auth = await getAuth(barberId);
  try {
    let response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd,
      timeZone: "America/Santiago",
      maxResults: 1, // Puedes ajustar este valor según tus necesidades
    });

    return response.data.items.length > 0 ? response.data.items[0] : null;
  } catch (error) {
    console.log(`Error at getEventByDateTime --> ${error}`);
    return null;
  }
};

// Agregar un deleteEvents, que cuando se elimine una fecha eliminte todos los eventos de esa fecha
const deleteEventsByDate = async (barberId, date) => {
  const calendarId = getCalendarId(barberId);
  const auth = await getAuth(barberId);

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    let response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      timeZone: "America/Santiago",
      maxResults: 1000,
    });

    let items = response.data.items || [];

    for (const event of items) {
      await calendar.events.delete({
        auth: auth,
        calendarId: calendarId,
        eventId: event.id,
      });
    }

    return 1;
  } catch (error) {
    console.log(`Error at deleteEventsByDate --> ${error}`);
    return 0;
  }
};

export {
  insertEvent,
  getEvents,
  deleteEvent,
  getEventById, // Agregamos estas dos funciones
  updateEventById, // Agregamos estas dos funciones
  getEventByDateTime,
  deleteEventsByDate,
};

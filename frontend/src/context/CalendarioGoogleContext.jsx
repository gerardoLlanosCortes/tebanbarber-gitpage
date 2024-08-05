import { createContext, useState } from "react";
import axios from "axios";
import { changeTime, formattedDateToDateAndHour } from "../utils";

const CalendarioCoogleContext = createContext();

const CalendarioGoogleProvider = ({ children }) => {
  const [calendario, setCalendario] = useState([]);

  const getEventos = async (barberId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/google-calendar/${barberId}`
      );
      setCalendario(data);
    } catch (error) {
      throw error;
    }
  };

  const getEventoByFechaAndHora = async (barberId, fecha, horaInicio) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/google-calendar/${fecha}/${horaInicio}/${horaFin}/${barberId}`
      );
      setCalendario(data);
    } catch (error) {
      throw error;
    }
  };

  const createEvento = async (barberId, evento) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/google-calendar/${barberId}`,
        evento
      );
    } catch (error) {
      throw error;
    }
  };

  const deleteEvento = async (barberId, id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/google-calendar/${barberId}/${id}`
      );
      setCalendario(calendario.filter((evento) => evento.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const deleteEventosByFecha = async (barberId, fecha) => {
    try {
      const eventosToDelete = calendario.filter(
        (evento) => evento.start.dateTime.split("T")[0] === fecha
      );
      eventosToDelete.forEach(async (evento) => {
        await deleteEvento(barberId, evento.id);
      });
    } catch (error) {
      throw error;
    }
  };
  const deleteEventoByFechaHora = async (barberId, fecha) => {
    console.log(barberId);
    try {
      const eventoToDelete = calendario.filter((evento) => {
        console.log(evento.start.dateTime);
        console.log(fecha);
        return evento.start.dateTime === fecha;
      });
      await deleteEvento(barberId, eventoToDelete[0].id);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const deleteEventoByFechaHoraSecond = async (barberId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/google-calendar/${barberId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteEventosbyFecha = async (barberId, date) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/google-calendar/${barberId}`,
        date
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <CalendarioCoogleContext.Provider
      value={{
        calendario,
        getEventos,
        createEvento,
        deleteEvento,
        deleteEventosByFecha,
        deleteEventoByFechaHora,
        getEventoByFechaAndHora,
        deleteEventoByFechaHoraSecond,
        deleteEventosbyFecha,
      }}
    >
      {children}
    </CalendarioCoogleContext.Provider>
  );
};

export { CalendarioGoogleProvider };

export default CalendarioCoogleContext;

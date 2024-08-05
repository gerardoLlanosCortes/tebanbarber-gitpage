import { createContext, useState } from "react";
import axios from "axios";

const AgendasContext = createContext();

const AgendasProvider = ({ children }) => {
  const [agendas, setAgendas] = useState([]);

  const createAgenda = async (agenda) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/agendas`, agenda);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getAgendas = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/agendas`
      );
      setAgendas(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteAgenda = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/agendas/${id}`);
      setAgendas(agendas.filter((agenda) => agenda._id !== id));
    } catch (error) {
      throw error;
    }
  };

  const deleteAgendasByFechaId = async (fechaId) => {
    try {
      const agendasToDelete = agendas.filter(
        (agenda) => agenda.fechaSeleccionada === fechaId
      );
      agendasToDelete.forEach(async (agenda) => {
        await deleteAgenda(agenda._id);
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteAgendaByHoraId = async (horaId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/agendas/hora/${horaId}`
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <AgendasContext.Provider
      value={{
        createAgenda,
        getAgendas,
        agendas,
        deleteAgenda,
        deleteAgendasByFechaId,
        deleteAgendaByHoraId,
      }}
    >
      {children}
    </AgendasContext.Provider>
  );
};

export { AgendasProvider };

export default AgendasContext;

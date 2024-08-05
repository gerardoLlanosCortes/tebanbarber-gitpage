import { createContext, useState } from "react";
import axios from "axios";
import { obtenerToken } from "../utils";
import axiosWithAuth from "../utils/axios";

const FechasContext = createContext();

const FechasProvider = ({ children }) => {
  const [fechas, setFechas] = useState([]);

  const [agendarInfo, setAgendarInfo] = useState([
    {
      barberoId: "",
      servicios: [],
      precio: "",
      nombre: "",
      email: "",
      fechaSeleccionada: "",
      fechaSeleccionadaString: "",
      horaInicio: "",
      horaFin: "",
    },
  ]);

  const createFecha = async (fecha) => {
    try {
      await axiosWithAuth.post(`/fechas`, fecha);
    } catch (error) {
      throw error;
    }
  };

  const getFechas = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/fechas`
      );
      setFechas(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getFechasByUserId = async (userId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/fechas/obtener-fechas/${userId}`
      );
      setFechas(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getFechasForClientsByEmail = async (email) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/fechas/obtener-fechas-clientes/email/${email}`
      );
      setFechas(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getFechasForClientsByUserId = async (userId) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/fechas/obtener-fechas-clientes/${userId}`
      );
      setFechas(data);
    } catch (error) {
      console.log("error", error);
      setFechas([]);
      throw error;
    }
  };

  const updateHoras = async (data) => {
    try {
      const res = await axiosWithAuth.put(`/fechas/${data.fecha}`, {
        horaInicio: data.horaInicio,
        horaFin: data.horaFin,
      });
      const editedFechas = fechas.map((fechaMap) =>
        fechaMap._id === res.data._id ? res.data : fechaMap
      );
      setFechas(editedFechas);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteFecha = async (id) => {
    try {
      await axiosWithAuth.delete(`/fechas/${id}`);
      setFechas((prevFechas) => prevFechas.filter((fecha) => fecha._id !== id));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteHora = async (fechaId, horaId) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/fechas/${fechaId}/hora/${horaId}/eliminar`
      );
      if (res.status === 200) {
        // Actualiza el estado de las fechas después de eliminar la hora
        setFechas((prevFechas) =>
          prevFechas.map((fecha) => {
            if (fecha._id === fechaId) {
              return {
                ...fecha,
                horas: fecha.horas.filter((hora) => {
                  // Si hora._id existe, compara con él; de lo contrario, compara con hora.uid
                  return hora._id !== horaId;
                }),
              };
            }
            return fecha;
          })
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const agendarHora = async (fechaId, horaId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/fechas`
      );

      // Obtén la fecha y hora seleccionadas
      const fechaSeleccionada = data.find((fecha) => fecha._id === fechaId);
      if (!fechaSeleccionada) {
        throw new Error("Fecha no encontrada."); // Lanza una excepción
      }

      const horaSeleccionada = fechaSeleccionada.horas.find(
        (hora) => hora._id === horaId
      );
      if (!horaSeleccionada) {
        throw new Error("Hora no encontrada."); // Lanza una excepción
      }

      // Verifica si la hora ya está agendada
      if (!horaSeleccionada.habilitado) {
        throw new Error("La hora ya está agendada."); // Lanza una excepción
      }

      try {
        await axios.put(
          `${
            import.meta.env.VITE_API_URL
          }/fechas/${fechaId}/hora/${horaId}/agendar`
        );
        setFechas((prevFechas) =>
          prevFechas.map((fecha) => {
            if (fecha._id === fechaId) {
              return {
                ...fecha,
                horas: fecha.horas.map((hora) => {
                  if (hora._id === horaId) {
                    return {
                      ...hora,
                      habilitado: false,
                    };
                  }
                  return hora;
                }),
              };
            }
            return fecha;
          })
        );
      } catch (error) {
        console.log(error);
        throw error; // Lanza una excepción si falla agendarHoraRequest
      }
    } catch (error) {
      throw error;
    }
  };

  const habilitarHora = async (fechaId, horaId) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/fechas/${fechaId}/hora/${horaId}/cancelar`
      );
      if (res.status === 200) {
        setFechas((prevFechas) =>
          prevFechas.map((fecha) => {
            if (fecha._id === fechaId) {
              return {
                ...fecha,
                horas: fecha.horas.map((hora) => {
                  if (hora._id === horaId) {
                    return {
                      ...hora,
                      habilitado: true,
                    };
                  }
                  return hora;
                }),
              };
            }
            return fecha;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const findFechaById = (fechaId) => {
    return fechas.find((fecha) => fecha._id === fechaId);
  };

  const agregarHoraAgendada = async (fechaId, data) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/fechas/${fechaId}/agregar-hora-agendada`,
        data
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const eliminarHoraAgendada = async (fechaId, data) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/fechas/${fechaId}/cancelar-hora-agendada`,
        data
      );
      if (res.status === 200) {
        setFechas((prevFechas) =>
          prevFechas.map((fecha) => {
            if (fecha._id === fechaId) {
              return {
                ...fecha,
                horasAgendadas: fecha.horasAgendadas.filter(
                  (hora) =>
                    hora.horaInicio !== data.horaInicio ||
                    hora.horaFin !== data.horaFin
                ),
              };
            }
            return fecha;
          })
        );
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <FechasContext.Provider
      value={{
        createFecha,
        updateHoras,
        deleteFecha,
        deleteHora,
        agendarInfo,
        setAgendarInfo,
        getFechas,
        getFechasByUserId,
        fechas,
        agendarHora,
        habilitarHora,
        agregarHoraAgendada,
        eliminarHoraAgendada,
        getFechasForClientsByEmail,
        getFechasForClientsByUserId,
      }}
    >
      {children}
    </FechasContext.Provider>
  );
};

export { FechasProvider };

export default FechasContext;

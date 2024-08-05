import { createContext, useState } from "react";
import axios from "axios";
import { obtenerToken } from "../utils";
import axiosWithAuth from "../utils/axios";

const TipoServicioContext = createContext();

const TipoServicioProvider = ({ children }) => {
  const [tiposServicios, setTiposServicios] = useState([]);

  const getTiposServicios = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tipo-servicio`
      );
      setTiposServicios(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getTiposServiciosAndServicios = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tipo-servicio/servicios`
      );
      setTiposServicios(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createTipoServicio = async (nombre) => {
    try {
      const { data } = await axiosWithAuth.post(`/tipo-servicio`, { nombre });
      setTiposServicios([...tiposServicios, data]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteTipoServicio = async (id) => {
    try {
      await axiosWithAuth.delete(`/tipo-servicio/${id}`);

      const filterTiposServicios = tiposServicios.filter(
        (tipoServicio) => tipoServicio._id !== id
      );
      setTiposServicios(filterTiposServicios);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const editTipoServicio = async (tipoServicio) => {
    try {
      await axiosWithAuth.put(
        `/tipo-servicio/${tipoServicio._id}`,
        tipoServicio
      );

      const EditedTiposServicios = tiposServicios.map((tipoServicioMap) =>
        tipoServicioMap._id === tipoServicio._id
          ? tipoServicio
          : tipoServicioMap
      );
      setTiposServicios(EditedTiposServicios);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <TipoServicioContext.Provider
      value={{
        getTiposServicios,
        getTiposServiciosAndServicios,
        createTipoServicio,
        deleteTipoServicio,
        editTipoServicio,
        tiposServicios,
        setTiposServicios,
      }}
    >
      {children}
    </TipoServicioContext.Provider>
  );
};

export { TipoServicioProvider };

export default TipoServicioContext;

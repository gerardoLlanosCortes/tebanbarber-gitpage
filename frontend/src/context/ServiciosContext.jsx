import axios from "axios";
import { createContext, useState } from "react";
import { obtenerToken } from "../utils";
import axiosWithAuth from "../utils/axios";

const ServiciosContext = createContext();

const ServiciosProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);
  const [userAndServicesInfo, setUserAndServicesInfo] = useState([]);

  const getServicios = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/servicios`
      );
      setServicios(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getServiciosFromUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/servicios/obtener-servicios`
      );
      setUserAndServicesInfo(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createServicio = async (servicio) => {
    try {
      const { data } = await axiosWithAuth.post("/servicios", servicio);

      setServicios([...servicios, data]);
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  const deleteServicio = async (id) => {
    try {
      await axiosWithAuth.delete(`/servicios/${id}`);

      const filterServicios = servicios.filter(
        (servicio) => servicio._id !== id
      );
      setServicios(filterServicios);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const editServicio = async (servicio) => {
    try {
      const { data } = await axiosWithAuth.put(
        `/servicios/${servicio._id}`,
        servicio
      );

      const editedServicios = servicios.map((servicioMap) =>
        servicioMap._id === servicio._id ? data : servicioMap
      );
      setServicios(editedServicios);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <ServiciosContext.Provider
      value={{
        getServicios,
        getServiciosFromUsers,
        createServicio,
        deleteServicio,
        editServicio,
        servicios,
        userAndServicesInfo,
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
};

export { ServiciosProvider };

export default ServiciosContext;

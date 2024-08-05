import axios from "axios";
import { createContext, useState } from "react";
import { obtenerToken } from "../utils";
import axiosWithAuth from "../utils/axios";

const AccesosContext = createContext();

const AccesosProvider = ({ children }) => {
  const [accesos, setAccesos] = useState([]);

  const getAccesos = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/accesos`
      );
      setAccesos(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getAccesoByEmail = async (email) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/accesos/validar/${email}`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createAcceso = async (accesoData) => {
    try {
      const { data } = await axiosWithAuth.post("/accesos", accesoData);
      console.log(data);
      setAccesos([...accesos, data]);
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  const deleteAcceso = async (id) => {
    try {
      await axiosWithAuth.delete(`/accesos/${id}`);

      const filterAccesos = accesos.filter((acceso) => acceso._id !== id);
      setAccesos(filterAccesos);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <AccesosContext.Provider
      value={{
        getAccesos,
        getAccesoByEmail,
        accesos,
        createAcceso,
        deleteAcceso,
      }}
    >
      {children}
    </AccesosContext.Provider>
  );
};

export { AccesosProvider };

export default AccesosContext;

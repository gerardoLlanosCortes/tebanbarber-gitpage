import axios from "axios";
import { createContext, useState } from "react";
import { obtenerToken } from "../utils";
import axiosWithAuth from "../utils/axios";

const UsuariosContext = createContext();

const UsuariosProvider = ({ children }) => {
  const [userServices, setUserServices] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);

  const getUsersInfo = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsersInfo(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUserServiceData = async (userId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/servicios/${userId}`
      );
      setUserServices(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUser = async (userId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const addServiceToUser = async (userId, servicioId) => {
    try {
      const { data } = await axiosWithAuth.post(
        `/users/servicios/${userId}/${servicioId}`
      );
      setUserServices([...userServices, data]);
    } catch (error) {
      console.error("Error al añadir el servicio:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  const RemoveServiceFromUser = async (userId, servicioId) => {
    try {
      const { data } = await axiosWithAuth.delete(
        `/users/servicios/${userId}/${servicioId}`
      );
      setUserServices((prevUserServices) =>
        prevUserServices.filter((servicio) => servicio._id !== servicioId)
      );
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  const changeStatus = async (userId) => {
    try {
      await axiosWithAuth.put(`/users/status/${userId}`);
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axiosWithAuth.delete(`/users/${userId}`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const { data } = await axiosWithAuth.put(`/users/${userId}`, userData);
      const updatedUsers = usersInfo.map((userInfo) =>
        userInfo._id === data._id ? data : userInfo
      );
      setUsersInfo(updatedUsers);
      console.log(updatedUsers);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        getUsersInfo,
        usersInfo,
        getUser,
        userServices,
        getUserServiceData,
        addServiceToUser,
        RemoveServiceFromUser,
        changeStatus,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export { UsuariosProvider };

export default UsuariosContext;

import { createContext, useState } from "react";
import axios from "axios";
import { obtenerToken } from "../utils";
import axiosWithAuth from "../utils/axios";

const AvisoContext = createContext();

const AvisoProvider = ({ children }) => {
  const [avisos, setAvisos] = useState([]);
  const [activeAviso, setActiveAviso] = useState([]);

  const getAvisos = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/avisos`
      );
      setAvisos(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getActiveAviso = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/avisos/active`
      );
      setActiveAviso(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createAviso = async (avisoData) => {
    try {
      const { data } = await axiosWithAuth.post(`/avisos`, avisoData);
      setAvisos([...avisos, data]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteAviso = async (id) => {
    try {
      await axiosWithAuth.delete(`/avisos/${id}`);

      const filterAvisos = avisos.filter((aviso) => aviso._id !== id);
      setAvisos(filterAvisos);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateAviso = async (id, avisoData) => {
    try {
      const { data } = await axiosWithAuth.put(`/avisos/${id}`, avisoData);

      const editedAvisos = avisos.map((avisoMap) =>
        avisoMap._id === data._id ? data : avisoMap
      );
      setAvisos(editedAvisos);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const changeAvisoStatus = async (id) => {
    try {
      const { data } = await axiosWithAuth.put(`/avisos/${id}/status`);
      setAvisos(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <AvisoContext.Provider
      value={{
        avisos,
        activeAviso,
        getAvisos,
        getActiveAviso,
        createAviso,
        deleteAviso,
        updateAviso,
        changeAvisoStatus,
      }}
    >
      {children}
    </AvisoContext.Provider>
  );
};

export { AvisoProvider };

export default AvisoContext;

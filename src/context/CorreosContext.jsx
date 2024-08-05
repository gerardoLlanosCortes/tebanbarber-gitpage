import { createContext, useState } from "react";
import axios from "axios";

const CorreosContext = createContext();

const CorreosProvider = ({ children }) => {
  const [correoInfo, setCorreoInfo] = useState([]);

  const createCorreo = async (correo) => {
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/correos`, correo);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <CorreosContext.Provider
      value={{ correoInfo, setCorreoInfo, createCorreo }}
    >
      {children}
    </CorreosContext.Provider>
  );
};

export { CorreosProvider };

export default CorreosContext;

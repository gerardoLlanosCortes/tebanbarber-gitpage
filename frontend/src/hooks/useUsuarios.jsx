import { useContext } from "react";
import UsuariosContext from "../context/UsuariosContext";

const useUsuarios = () => {
  return useContext(UsuariosContext);
};

export default useUsuarios;

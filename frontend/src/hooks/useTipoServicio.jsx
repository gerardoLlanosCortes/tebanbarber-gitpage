import { useContext } from "react";
import TipoServicioContext from "../context/TipoServicioContext";

const useTipoServicio = () => {
  return useContext(TipoServicioContext);
};

export default useTipoServicio;

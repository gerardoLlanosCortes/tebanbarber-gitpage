import { useContext } from "react";
import ServiciosContext from "../context/ServiciosContext";

const useServicios = () => {
  return useContext(ServiciosContext);
};

export default useServicios;

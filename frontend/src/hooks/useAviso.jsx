import { useContext } from "react";
import AvisoContext from "../context/AvisosContext";

const useAviso = () => {
  return useContext(AvisoContext);
};

export default useAviso;

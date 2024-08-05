import { useContext } from "react";
import AccesosContext from "../context/AccesosContext";

const useAccesos = () => {
  return useContext(AccesosContext);
};

export default useAccesos;

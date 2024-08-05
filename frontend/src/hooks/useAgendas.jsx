import { useContext } from "react";
import AgendasContext from "../context/AgendasContext";

const useAgendas = () => {
  return useContext(AgendasContext);
};

export default useAgendas;

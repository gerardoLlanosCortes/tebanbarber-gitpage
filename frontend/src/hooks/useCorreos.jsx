import { useContext } from "react";
import CorreosContext from "../context/CorreosContext";

const useCorreos = () => {
  return useContext(CorreosContext);
};

export default useCorreos;

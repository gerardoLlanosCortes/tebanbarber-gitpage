import { useContext } from "react";
import FechasContext from "../context/FechasContext";

const useFechas = () => {
  return useContext(FechasContext);
};

export default useFechas;

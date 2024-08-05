import { useContext } from "react";
import CalendarioCoogleContext from "../context/CalendarioGoogleContext";

const useCalendario = () => {
  return useContext(CalendarioCoogleContext);
};

export default useCalendario;

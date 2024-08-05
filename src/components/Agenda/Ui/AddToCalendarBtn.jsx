import { AddToCalendarButton } from "add-to-calendar-button-react";
import { convertirFecha } from "../../../utils";

export default function AddToCalendarBtn({ agendarInfo }) {
  return (
    <AddToCalendarButton
      name={`${agendarInfo[0].servicio} - LaTebanBarber`}
      options={["Apple", "Google"]}
      location="La Tenca 584, 9290472 Santiago, Maipú, Región Metropolitana"
      startDate={`${convertirFecha(agendarInfo[0].fechaSeleccionadaString)}`}
      endDate={`${convertirFecha(agendarInfo[0].fechaSeleccionadaString)}`}
      startTime={`${agendarInfo[0].horaInicio}`}
      endTime={`${agendarInfo[0].horaFin}`}
      timeZone="America/Santiago"
      language="es"
      id="css-part-example"
      buttonsList
      styleLight="--buttonslist-gap: 8px"
      styleDark="--buttonslist-gap: 8px"
    ></AddToCalendarButton>
  );
}

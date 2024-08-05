import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  obtenerFechaSantiago,
  convertirFechaAFechaSantiago,
  formatDateWithoutTimezoneOffset,
} from "../../../utils";

export default function FechasCalendar({
  handleDateChange,
  selectedDate,
  fechasFuturas,
  fechas,
}) {
  return (
    <>
      <Calendar
        onChange={(date) => {
          const localDate = date;
          handleDateChange(localDate);
        }}
        value={selectedDate ? selectedDate : null}
        // minDate={obtenerFechaSantiago()}
        tileClassName={({ date }) => {
          const localDateISO = formatDateWithoutTimezoneOffset(date);
          return fechasFuturas.some((fecha) => {
            const databaseDateISO = formatDateWithoutTimezoneOffset(
              new Date(fecha.fecha)
            );
            return localDateISO === databaseDateISO;
          })
            ? "blue-date"
            : "";
        }}
        tileDisabled={({ date }) => {
          const localDateISO = formatDateWithoutTimezoneOffset(date);
          return !fechas.some((fecha) => {
            const databaseDateISO = formatDateWithoutTimezoneOffset(
              new Date(fecha.fecha)
            );
            return localDateISO === databaseDateISO;
          });
        }}
      />
    </>
  );
}

import React from "react";
import Reveal from "../../../utils/Reveal";

export default function AgendasCard({
  fecha,
  handleHabilitarHoraAgendada,
  setSelectedFechaToModify,
}) {
  const handleHabilitarHoraClick = (hora) => {
    setSelectedFechaToModify({ fecha, hora });
    handleHabilitarHoraAgendada(fecha);
  };

  // Función para comparar las horas
  const compareHours = (a, b) => {
    const [hourA, minuteA] = a.horaInicio.split(":").map(Number);
    const [hourB, minuteB] = b.horaInicio.split(":").map(Number);

    if (hourA !== hourB) {
      return hourA - hourB;
    }
    return minuteA - minuteB;
  };

  console.log(fecha);

  // Ordenar las horas antes de renderizarlas
  const sortedHorasAgendadas = [...fecha.horasAgendadas].sort(compareHours);

  return (
    <Reveal className="grid grid-cols-2 gap-4">
      {sortedHorasAgendadas.map((hora) => (
        <div
          key={hora._id}
          className="flex flex-col items-center justify-center gap-2 p-2 py-5 w-full h-full bg-gray-200 rounded-lg border border-transparent"
        >
          <h3 className="text-base font-bold break-words text-center">
            {hora.horaInicio} - {hora.horaFin}
          </h3>
          <p className="break-words w-full my-0 mx-auto text-center text-base">
            {hora.nombre}
          </p>
          <p className="break-words w-full my-0 mx-auto text-center text-base">
            {hora.email}
          </p>
          <p className="break-words w-full my-0 mx-auto text-center">
            {hora.servicio}
          </p>
          {/* <button
            className="text-sm text-[#646464] font-bold"
            onClick={() => handleHabilitarHoraClick(hora)}
          >
            Habilitar
          </button> */}
          <button
            className="text-white bg-gray-400 p-2 rounded-lg text-sm font-semibold"
            onClick={() => handleHabilitarHoraClick(hora)}
          >
            Habilitar
          </button>
        </div>
      ))}
    </Reveal>
  );
}

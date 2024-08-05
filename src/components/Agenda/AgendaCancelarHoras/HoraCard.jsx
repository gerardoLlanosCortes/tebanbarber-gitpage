import React from "react";
import { FormatearFecha } from "../../../utils";

export default function HoraCard({
  hora,
  fecha,
  barbero,
  setHoraToDelete,
  ConfirmCancelarModal,
  confirmReagendarModal,
}) {
  const handleCancelarClick = () => {
    setHoraToDelete({
      hora,
      fecha,
      barbero,
    });
    // setAgendaToDelete(agendasUsuario[index]);
    ConfirmCancelarModal();
  };

  const handleReagendarClick = () => {
    setHoraToDelete({
      hora,
      fecha,
      barbero,
    });
    // setAgendaToDelete(agendasUsuario[index]);
    confirmReagendarModal();
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-[400px] flex flex-col items-start justify-center gap-1 shadow-md">
      <p>
        <b>Servicio:</b> {hora.servicio}
      </p>
      <p>
        <b>Fecha:</b> {FormatearFecha(fecha.fecha)}
      </p>
      <p>
        <b>Hora:</b> {hora.horaInicio} - {hora.horaFin}
      </p>
      <p>
        <b>Barbero:</b> {barbero.nombre}
      </p>
      <div className="flex w-full gap-3 justify-between">
        <button
          className="mt-1 w-full py-2 px-1 border-none rounded-lg bg-red-600 text-white text-sm font-semibold"
          onClick={handleCancelarClick}
        >
          Cancelar Hora
        </button>

        <button
          className="mt-1 w-full py-2 px-1 border-none rounded-lg bg-agenda-primary text-white text-sm font-semibold"
          onClick={handleReagendarClick}
        >
          Reagendar Hora
        </button>
      </div>
    </div>
  );
}

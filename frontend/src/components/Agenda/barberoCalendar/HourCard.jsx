import React, { useEffect, useState } from "react";
import Reveal from "../../../utils/Reveal";

export default function HourCard({
  fecha,
  handleSaveChanges,
  // onHabilitarHoraClick,
}) {
  // Set de hora de inicio y fin
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // Cambiar las horas al seleccionar otra fecha
  useEffect(() => {
    setHoraInicio(fecha?.horaInicio);
    setHoraFin(fecha?.horaFin);
  }, [fecha]);

  return (
    <Reveal className="w-full flex flex-col gap-4">
      <div className="flex justify-between gap-2 items-center flex-col sm:flex-row">
        <div className="w-full ">
          <p>Hora de Inicio</p>
          <input
            className=" w-full p-2 text-base border border-[#CCC] rounded-lg"
            type="time"
            placeholder="Ingresa la nueva hora (HH:MM)"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p>Hora de Fin</p>
          <input
            className="w-full p-2 text-base border border-[#CCC] rounded-lg"
            type="time"
            placeholder="Ingresa la nueva hora (HH:MM)"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={() =>
          handleSaveChanges({ fecha: fecha._id, horaInicio, horaFin })
        }
        className="bg-agenda-primary text-white border-none text-base py-3 px-4 w-full rounded-lg"
      >
        Guardar Cambios
      </button>
    </Reveal>
  );
}

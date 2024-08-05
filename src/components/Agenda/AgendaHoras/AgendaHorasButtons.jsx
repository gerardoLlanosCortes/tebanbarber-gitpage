import React, { useEffect, useState } from "react";
import SpecificLoader from "../Loaders/SpecificLoader";
import {
  obtenerFechaFromAGivenDate,
  obtenerFechaSantiago,
  obtenerHoraEnTexto,
} from "../../../utils";
import Reveal from "../../../utils/Reveal";

export default function AgendaHorasButtons({
  fecha,
  calendario,
  selectedHora,
  setSelectedHora,
  agendarInfo,
  intervalo,
}) {
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [isLoadingHours, setIsLoadingHours] = useState(true);

  useEffect(() => {
    setIsLoadingHours(true);

    if (!intervalo) {
      setIsLoadingHours(false);
      return;
    }

    const horaInicio = fecha.horaInicio;
    const horaFin = fecha.horaFin;
    const fechaEvento = new Date(fecha.fecha).toLocaleString("en-US", {
      timeZone: "America/Santiago",
    });
    const fechaActual = new Date(obtenerFechaSantiago());

    const fechaConHoraInicio = new Date(
      `${fechaEvento.split(",")[0]} ${horaInicio}`
    );
    const fechaConHoraFinal = new Date(
      `${fechaEvento.split(",")[0]} ${horaFin}`
    );
    let horas = [];

    let horaDeEventoIterativa = new Date(fechaConHoraInicio);

    const agregarHoraSiCumpleCondiciones = (horaInicio, horaFin) => {
      const horaInicioFormato = obtenerHoraEnTexto(horaInicio);
      const horaFinFormato = obtenerHoraEnTexto(horaFin);
      horas.push({ inicio: horaInicioFormato, fin: horaFinFormato });
    };

    while (horaDeEventoIterativa < fechaConHoraFinal) {
      const horaMasIntervalo = new Date(horaDeEventoIterativa);
      horaMasIntervalo.setMinutes(horaMasIntervalo.getMinutes() + intervalo);

      if (horaMasIntervalo <= fechaConHoraFinal) {
        const horaActualIterativaTexto = obtenerHoraEnTexto(
          horaDeEventoIterativa
        );
        const horaDeEvento =
          horaDeEventoIterativa.getHours() * 60 +
          horaDeEventoIterativa.getMinutes();
        const esMismaFecha =
          fechaActual.toDateString() === new Date(fechaEvento).toDateString();
        let isHoraPasada = false;

        // if (esMismaFecha) {
        //   const horaActual =
        //     fechaActual.getHours() * 60 + fechaActual.getMinutes();
        //   console.log(horaActual);
        //   console.log(horaDeEvento);
        //   isHoraPasada = horaDeEvento < horaActual;
        // }

        if (esMismaFecha) {
          const horaActual =
            fechaActual.getHours() * 60 + fechaActual.getMinutes();

          // Sumar 30 minutos a la hora actual
          const horaActualMas30Minutos = new Date(fechaActual);
          horaActualMas30Minutos.setMinutes(
            horaActualMas30Minutos.getMinutes() + 30
          );
          const horaActualMas30MinutosEnMinutos =
            horaActualMas30Minutos.getHours() * 60 +
            horaActualMas30Minutos.getMinutes();

          // Comparar la hora del evento con la hora actual más 30 minutos
          isHoraPasada = horaDeEvento < horaActualMas30MinutosEnMinutos;
        }

        const eventosDelDia = calendario.filter((evento) => {
          const fechaEventoCalendario = new Date(evento.start.dateTime);
          return (
            new Date(fechaEvento).toDateString() ===
            fechaEventoCalendario.toDateString()
          );
        });

        const horaYaAgendada = eventosDelDia.some((evento) => {
          const start = new Date(evento.start.dateTime);
          const end = new Date(evento.end.dateTime);
          const eventStartHour = obtenerHoraEnTexto(start);
          const eventEndHour = obtenerHoraEnTexto(end);

          return (
            horaActualIterativaTexto >= eventStartHour &&
            horaActualIterativaTexto < eventEndHour
          );
        });

        const horaIntervaloSuperpuesta = eventosDelDia.some((evento) => {
          const start = new Date(evento.start.dateTime);
          const end = new Date(evento.end.dateTime);

          return horaMasIntervalo > start && horaDeEventoIterativa < end;
        });

        if (!horaYaAgendada && !horaIntervaloSuperpuesta && !isHoraPasada) {
          agregarHoraSiCumpleCondiciones(
            horaDeEventoIterativa,
            horaMasIntervalo
          );
        }
      }

      horaDeEventoIterativa.setMinutes(
        horaDeEventoIterativa.getMinutes() + intervalo
      );
    }

    setHorasDisponibles(horas);
    setIsLoadingHours(false);
  }, [fecha, calendario]);

  return (
    <div className="w-full">
      {isLoadingHours ? (
        <SpecificLoader />
      ) : horasDisponibles.length > 0 ? (
        <Reveal className={"grid grid-cols-2 gap-4"}>
          {horasDisponibles.map((hora, index) => (
            <button
              key={index}
              onClick={() => setSelectedHora(hora)}
              className={`border border-[#C6C6C6] rounded-lg w-full h-[50px] ${
                selectedHora === hora
                  ? "bg-agenda-primary text-white"
                  : "bg-transparent text-black"
              }`}
            >
              <h3 className="m-0 font-semibold">
                {intervalo > 30 ? `${hora.inicio} - ${hora.fin}` : hora.inicio}
              </h3>
            </button>
          ))}
        </Reveal>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-lg">No hay horas disponibles para esta fecha</p>
        </div>
      )}
    </div>
  );
}

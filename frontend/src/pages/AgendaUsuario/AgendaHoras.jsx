import React, { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import BtnContinuar from "../../components/Agenda/BtnContinuar";
import useFechas from "../../hooks/useFechas";
import "react-calendar/dist/Calendar.css";
import AgendaHorasButtons from "../../components/Agenda/AgendaHoras/AgendaHorasButtons";
import useCalendario from "../../hooks/useCalendario";
import FechasCalendar from "../../components/Agenda/AgendaHoras/FechasCalendar";
import { useNavigate } from "react-router-dom";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import {
  convertirFechaAFechaSantiago,
  obtenerFechaFromAGivenDate,
  obtenerFechaSantiago,
} from "../../utils";
import Reveal from "../../utils/Reveal";

export default function AgendaHoras() {
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedHora, setSelectedHora] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const { getFechasForClientsByUserId, fechas, agendarInfo, setAgendarInfo } =
    useFechas();
  const { calendario, getEventos } = useCalendario();
  const navigate = useNavigate();
  const intervalo = agendarInfo[0].duracion;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getFechasForClientsByUserId(agendarInfo[0].barberoId);
        await getEventos(agendarInfo[0].barberoId);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedHora("");
    const fechaASeleccionar = convertirFechaAFechaSantiago(date);
    const fechaASeleccionarISO = fechaASeleccionar.toISOString().split("T")[0];

    // Recorrer el arreglo de fechas para encontrar coincidencias
    fechas.forEach((fecha) => {
      const fechaSinHora = convertirFechaAFechaSantiago(new Date(fecha.fecha))
        .toISOString()
        .split("T")[0];
      if (fechaSinHora === fechaASeleccionarISO) {
        setSelectedFecha(fecha._id);
      }
    });

    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (!selectedHora) {
      console.log("Debes seleccionar una hora antes de agendar.");
      return;
    }

    if (!selectedFecha) {
      console.log("Fecha no encontrada.");
      return;
    }

    const updatedAgendarInfo = [...agendarInfo];
    updatedAgendarInfo[0].horaInicio = selectedHora.inicio;
    updatedAgendarInfo[0].fechaSeleccionada = selectedFecha;
    updatedAgendarInfo[0].horaFin = selectedHora.fin;

    setAgendarInfo(updatedAgendarInfo);

    navigate("/agenda/contacto");
  };

  const fechasFuturas = fechas.filter((fecha) => {
    const now = new Date(obtenerFechaSantiago());
    const nowWithoutTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const fechaDisponible = new Date(fecha.fecha);
    return fechaDisponible >= nowWithoutTime;
  });

  fechasFuturas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative h-full">
      <Header link={"agenda/servicios"} title={"Seleccione su hora"} />
      <Reveal className={"flex flex-col gap-8"}>
        <div className="flex flex-col gap-1">
          <h5 className="font-semibold">Seleccionar Día</h5>
          <Reveal className={"calendar-container"}>
            <FechasCalendar
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
              fechasFuturas={fechasFuturas}
              fechas={fechas}
            />
          </Reveal>
        </div>

        <div className="flex flex-col items-start justify-center gap-3">
          <h5 className="font-semibold flex flex-col">
            Seleccionar Hora{" "}
            <span className="text-sm">
              (Duración: {intervalo}min - Formato 24hrs)
            </span>
          </h5>
          {selectedFecha && (
            <AgendaHorasButtons
              fecha={fechas.find((fecha) => fecha._id === selectedFecha)}
              calendario={calendario}
              selectedHora={selectedHora}
              setSelectedHora={setSelectedHora}
              agendarInfo={agendarInfo}
              intervalo={intervalo}
            />
          )}
        </div>
      </Reveal>
      <BtnContinuar
        disabledCondition={!selectedHora}
        handleContinue={handleContinue}
      />
    </div>
  );
}

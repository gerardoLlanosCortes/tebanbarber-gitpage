import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Agenda/Navigation/Header";
import HoraCard from "../../components/Agenda/AgendaCancelarHoras/HoraCard";
import useCalendario from "../../hooks/useCalendario";
import useAgendas from "../../hooks/useAgendas";
import useFechas from "../../hooks/useFechas";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";

import dangerIcon from "../../assets/img/icons/danger__advice.png";
import {
  changeTime,
  FormatearFecha,
  formattedDateToDateAndHour,
  obtenerFechaSantiago,
} from "../../utils";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Modal from "../../components/Agenda/Modals/Modal";
import Reveal from "../../utils/Reveal";

export default function AgendaCancelarHoras() {
  const [eventoToDelete, setEventoToDelete] = useState({});
  const [horaToDelete, setHoraToDelete] = useState({});

  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [showReagendarModal, setShowReagendarModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const { email } = useParams();
  const navigate = useNavigate();

  const { fechas, eliminarHoraAgendada, getFechasForClientsByEmail } =
    useFechas();
  const { deleteEventoByFechaHoraSecond, deleteEvento } = useCalendario();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await getFechasForClientsByEmail(email);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Si es un error 404, no mostrar el modal
          setShowFailedModal(false);
        } else {
          // Si es otro tipo de error, mostrar el modal
          setShowFailedModal(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const ConfirmCancelarModal = () => {
    setShowCancelarModal(!showCancelarModal);
  };

  const handleConfirmCancelarHora = async () => {
    setIsLoadingAction(true);
    const data = await deleteEventoByFechaHoraSecond(horaToDelete.barbero._id);

    // Filtrar o mandar al bd y que me elimine altiro por fecha y hora
    // Filtrar el en frontend y eliminar por id simple pero menos optimizado
    const horaAgendadaDate = changeTime(
      horaToDelete.fecha.fecha,
      horaToDelete.hora.horaInicio
    );
    const eventoToDelete = data.filter((evento) => {
      const eventoDate = evento.start.dateTime; // Extraer solo la parte de la fecha
      if (horaAgendadaDate === formattedDateToDateAndHour(eventoDate)) {
        return evento;
      }
    });

    try {
      console.log(horaToDelete.barbero._id);
      await eliminarHoraAgendada(horaToDelete.fecha._id, {
        horaInicio: horaToDelete.hora.horaInicio,
        horaFin: horaToDelete.hora.horaFin,
      });

      await deleteEvento(horaToDelete.barbero._id, eventoToDelete[0].id);

      if (showReagendarModal) {
        setIsLoadingAction(false);
        setShowReagendarModal(!showReagendarModal);
        navigate("/agenda/servicios");
      }

      setShowCancelarModal(false);
    } catch (error) {
      console.log(error);
      setShowCancelarModal(false);
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const confirmReagendarModal = () => {
    setShowReagendarModal(!showReagendarModal);
  };

  if (isLoading) return <MainLoader />;

  return (
    <div>
      <Reveal
        className={
          "w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative"
        }
      >
        {isLoadingAction && <ActionLoader />}
        <Header link={"agenda/cancelar"} title={"Horas Agendadas"} />
        {!fechas.length > 0 ? (
          <p className="text-xl font-semibold text-center">
            No hay horas agendadas para este correo
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">
              Agendas de <span className="break-words">{email}</span>:
            </h2>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Administra tus horas agendadas</p>
              <div className="flex flex-col items-center justify-center gap-4">
                {fechas.map((fecha) =>
                  fecha.horasAgendadas.map((hora) => (
                    <HoraCard
                      key={hora._id}
                      hora={hora}
                      fecha={fecha}
                      barbero={fecha.creadoPor}
                      setHoraToDelete={setHoraToDelete}
                      ConfirmCancelarModal={ConfirmCancelarModal}
                      confirmReagendarModal={confirmReagendarModal}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Reveal>

      {console.log(horaToDelete)}

      {showCancelarModal && horaToDelete && (
        <DeleteModal
          Titulo={`¿Estás seguro de que deseas cancelar la hora del día ${FormatearFecha(
            horaToDelete.fecha.fecha
          )} a las ${horaToDelete.hora.horaInicio} hrs`}
          icono={dangerIcon}
          setShowModal={() => setShowCancelarModal(!showCancelarModal)}
          confirmDelete={handleConfirmCancelarHora}
        />
      )}

      {showReagendarModal && horaToDelete && (
        <DeleteModal
          Titulo={`¿Estás seguro de que deseas cancelar la hora del día ${FormatearFecha(
            horaToDelete.fecha.fecha
          )} a las ${horaToDelete.hora.horaInicio} hrs`}
          icono={dangerIcon}
          setShowModal={() => setShowReagendarModal(!showReagendarModal)}
          confirmDelete={handleConfirmCancelarHora}
        />
      )}

      {showFailedModal && (
        <Modal
          alt={"error icon"}
          source={dangerIcon}
          title={"¡Error!"}
          message={
            "Hubo un error al intentar cancelar la hora, intentelo nuevamente"
          }
          onClose={() => setShowFailedModal(false)}
          btnContent={"Volver"}
        />
      )}
    </div>
  );
}

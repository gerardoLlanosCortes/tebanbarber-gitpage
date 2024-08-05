import React, { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import useFechas from "../../hooks/useFechas";
import useAgendas from "../../hooks/useAgendas";
import useCalendario from "../../hooks/useCalendario";
import HourCard from "../../components/Agenda/barberoCalendar/HourCard";
import FechasCarousel from "../../components/Agenda/barberoCalendar/FechasCarousel";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";
import {
  FormatearFechaCard,
  isFechaPasada,
  obtenerTokenInfo,
} from "../../utils";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Modal from "../../components/Agenda/Modals/Modal";
import dangerIcon from "../../assets/img/icons/danger__advice.png";
import useAuth from "../../hooks/useAuth";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoGestionarFechas() {
  const [selectedHora, setSelectedHora] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedFechaToDelete, setSelectedFechaToDelete] = useState(null);
  const [selectedFechaToModify, setSelectedFechaToModify] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showDeletePastDatesModal, setShowDeletePastDatesModal] =
    useState(false);
  const [showDeleteHoraModal, setShowDeleteHoraModal] = useState(false);
  const [showHabilitarHoraModal, setShowHabilitarHoraModal] = useState(false);

  const {
    getFechas,
    getFechasByUserId,
    deleteFecha,
    fechas,
    deleteHora,
    habilitarHora,
    addHoraExtra,
    updateHoras,
  } = useFechas();
  const {
    getAgendas,
    agendas,
    deleteAgendasByFechaId,
    deleteAgendaByHoraId,
    deleteAgenda,
  } = useAgendas();
  const {
    getEventos,
    calendario,
    deleteEventosByFecha,
    deleteEventoByFechaHora,
  } = useCalendario();

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const userToken = obtenerTokenInfo();
        await getFechasByUserId(userToken.id);
      } catch (error) {
        console.error("Error al obtener las fechas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteFechaModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleConfirmDeleteFecha = async () => {
    setSelectedFecha(null);
    setShowDeleteModal(false);
    setIsLoadingAction(true);
    if (selectedFechaToDelete) {
      try {
        await deleteFecha(selectedFechaToDelete._id);
        await deleteAgendasByFechaId(selectedFechaToDelete._id);
        const userToken = obtenerTokenInfo();
        await deleteEventosByFecha(
          userToken.id,
          selectedFechaToDelete.fecha.split("T")[0]
        );
      } catch (error) {
        setShowFailedModal(true);
      } finally {
        setIsLoadingAction(false);
      }
    }
  };

  const handleSaveChanges = async (data) => {
    setIsLoadingAction(true);
    try {
      await updateHoras(data);
    } catch (error) {
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleCloseFailedModal = () => {
    setShowFailedModal(!showFailedModal);
  };

  const handleDeletePastDatesModal = () => {
    setShowDeletePastDatesModal(!showDeletePastDatesModal);
  };

  const handleConfirmDeletePastDates = async () => {
    setIsLoadingAction(true);
    setShowDeletePastDatesModal(false);

    try {
      for (const fecha of fechas) {
        if (isFechaPasada(fecha)) {
          try {
            await deleteFecha(fecha._id);
            await deleteAgendasByFechaId(fecha._id);
            const userToken = obtenerTokenInfo();
            await deleteEventosByFecha(userToken.id, fecha.fecha.split("T")[0]);
          } catch (error) {
            setShowFailedModal(true);
          }
        }
      }
    } finally {
      setIsLoadingAction(false);
    }
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className=" flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}
      <Header link={"barbero"} title={"Gestionar Fechas"} />

      <Reveal className="flex flex-col gap-6">
        <div className=""></div>
        <div className="flex flex-col gap-3">
          <h5 className="font-semibold">Seleccionar Día</h5>
          {fechas.length === 0 ? (
            <h3>No hay fechas para gestionar</h3>
          ) : (
            <FechasCarousel
              fechas={fechas.sort(
                (a, b) => new Date(a.fecha) - new Date(b.fecha)
              )}
              selectedFecha={selectedFecha}
              setSelectedFecha={setSelectedFecha}
              selectedHora={selectedHora}
              setSelectedHora={setSelectedHora}
              setShowModal={setShowDeleteModal}
              setSelectedFechaToDelete={setSelectedFechaToDelete}
              handleDeleteFechaModal={handleDeleteFechaModal}
              handleDeletePastDatesModal={handleDeletePastDatesModal}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="font-semibold">Gestión de horas</h5>
          {selectedFecha && (
            <HourCard
              fecha={fechas.find((fecha) => fecha._id === selectedFecha)}
              handleSaveChanges={handleSaveChanges}
            />
          )}
        </div>
      </Reveal>

      {showDeleteModal && selectedFechaToDelete && (
        <DeleteModal
          Titulo={`¿Estás seguro de eliminar la fecha ${FormatearFechaCard(
            selectedFechaToDelete.fecha
          )}?`}
          descripcion={
            "Esta acción no se podrá deshacer y eliminará la fecha y las horas así como también las agendas de la misma."
          }
          icono={dangerIcon}
          setShowModal={() => setShowDeleteModal(!showDeleteModal)}
          confirmDelete={handleConfirmDeleteFecha}
        />
      )}

      {showDeletePastDatesModal && (
        <DeleteModal
          Titulo={`¿Estás seguro de eliminar todas las fechas que ya pasaron?`}
          descripcion={
            "Esta acción no se podrá deshacer y eliminará las fecha y las horas así como también todas las agendas pasadas."
          }
          icono={dangerIcon}
          setShowModal={() =>
            setShowDeletePastDatesModal(!showDeletePastDatesModal)
          }
          confirmDelete={handleConfirmDeletePastDates}
        />
      )}

      {showFailedModal && (
        <Modal
          alt={"error icon"}
          source={dangerIcon}
          title={"¡Error!"}
          btnContent={"Volver"}
          message={
            "Se ha producido un error al ejecutar esta acción. Por favor, inténtelo de nuevo."
          }
          onClose={handleCloseFailedModal}
        />
      )}
    </div>
  );
}

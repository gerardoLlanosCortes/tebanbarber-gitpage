import React, { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import useFechas from "../../hooks/useFechas";
import useCalendario from "../../hooks/useCalendario";
import AgendarHoraInfoModal from "../../components/Agenda/Modals/AgendarHoraInfoModal";
import { Link, useNavigate } from "react-router-dom";
import {
  FormatearFecha,
  createCorreoData,
  createEventData,
  formatearPrecio,
  formattedDateTimeCalendar,
} from "../../utils";
import useAgendas from "../../hooks/useAgendas";
import useCorreos from "../../hooks/useCorreos";
import AddToCalendarBtn from "../../components/Agenda/Ui/AddToCalendarBtn";
import ModalHoraAgendada from "../../components/Agenda/Modals/ModalHoraAgendada";
import Modal from "../../components/Agenda/Modals/Modal";
import succesIcon from "../../assets/img/icons/success.png";
import dangerIcon from "../../assets/img/icons/danger__advice.png";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Reveal from "../../utils/Reveal";

export default function AgendaContacto() {
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [showAgendaInfoModal, setShowAgendaInfoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [correoInfo, setCorreoInfo] = useState({
    info: [],
  });
  const [fechaHoraInfo, setFechaAndHoraInfo] = useState(false);
  const {
    fechas,
    agendarHora,
    setAgendarInfo,
    agendarInfo,
    agregarHoraAgendada,
    // getFechas,
  } = useFechas();
  const { calendario, getEventos, createEvento } = useCalendario();
  const { createAgenda } = useAgendas();
  const { createCorreo } = useCorreos();
  const navigateTo = useNavigate();

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actualizar la información de agendarInfo
    const updatedAgendarInfo = agendarInfo.map((info) => {
      const fechaSeleccionada = fechas.find(
        (fecha) => fecha._id === info.fechaSeleccionada
      );

      return {
        ...info,
        nombre: nombre,
        email: email,
        fechaSeleccionadaString: FormatearFecha(fechaSeleccionada.fecha), // Actualiza la propiedad fechaSeleccionada con la nueva información
      };
    });

    // Actualizar el estado con la nueva información de agendarInfo
    setAgendarInfo(updatedAgendarInfo);

    setShowAgendaInfoModal(true);
  };

  const handleConfirmClick = () => {
    // Llamar a la función handleAgendarClick al confirmar
    handleAgendarClick();
    // Cerrar el modal
    setShowAgendaInfoModal(!showAgendaInfoModal);
  };

  const randomDelay = () => {
    return Math.floor(Math.random() * 2000); // Genera un número aleatorio entre 0 y 1000 (milisegundos)
  };

  const handleAgendarClick = async () => {
    try {
      setIsLoading(true);

      for (const [index, info] of agendarInfo.entries()) {
        if (
          !info.fechaSeleccionada ||
          !info.servicio ||
          !info.nombre ||
          !info.email
        ) {
          throw new Error("Falta información para poder agendar.");
        }

        const fechaSeleccionada = fechas.find(
          (fecha) => fecha._id === info.fechaSeleccionada
        );

        if (!fechaSeleccionada) {
          throw new Error("Fecha seleccionada no encontrada.");
        }

        const data = {
          horaInicio: info.horaInicio,
          horaFin: info.horaFin,
          nombre: info.nombre,
          email: info.email,
          servicio: info.servicio,
        };
        const fechaHoraDisponible = new Date(fechaSeleccionada.fecha);
        // Se agrega la hora al registro y se realizan validaciones
        await handleAddHoraAgendada(fechaSeleccionada._id, data);
        // Crea el evento en el calendario de google
        await handleCreateEvent(index, fechaHoraDisponible);
      }

      // sendEmail();
      // Si todas las iteraciones del bucle terminan sin errores, continuamos con estas acciones
      setShowSuccessModal(true);
    } catch (error) {
      console.log(error);
      setShowFailedModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHoraAgendada = async (fecha, data) => {
    try {
      await agregarHoraAgendada(fecha, data);
    } catch (error) {
      console.log("Error al crear el evento");
      throw error; // Lanza un nuevo error
    }
  };

  const handleCreateEvent = async (index, fecha) => {
    const data = createEventData(index, agendarInfo, fecha);

    try {
      await createEvento(agendarInfo[0].barberoId, data);
    } catch (error) {
      console.log("Error al crear el evento");
      throw error; // Lanza un nuevo error
    }
  };

  const sendEmail = async () => {
    const data = createCorreoData(agendarInfo[0]);
    try {
      await createCorreo(data);
    } catch (error) {
      console.log(error);
      console.log("Error al enviar correo");
    }
  };

  const handleHoraAgendadaClick = () => {
    setShowSuccessModal(false);
    navigateTo("/agenda?show=no");
  };

  const handleCloseFailedModal = () => {
    setShowFailedModal(false);
    navigateTo("/agenda?show=no");
  };

  console.log(agendarInfo);

  return (
    <div className="w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative">
      {isLoading && <ActionLoader />}

      <Header link={"agenda/horas"} title={"Datos de Contacto"} />

      <div className="flex flex-col gap-12">
        <Reveal className={"font-semibold"}>
          Ingresa tus datos de contacto
        </Reveal>
        <form className="agenda__contact__form" onSubmit={handleSubmit}>
          <Reveal className={"container__input"}>
            <div className="items">
              <input
                id="input-text"
                type="text"
                value={nombre}
                onChange={(e) => handleInputChange(e, setNombre)}
              />
              <span
                className={`placeholder placeholder__movement ${
                  nombre ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Nombre (preferible usuario de Instagram)
              </span>
            </div>
          </Reveal>

          <Reveal className={"container__input"}>
            <div className="items">
              <input
                id="input-email"
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
              <span
                className={`placeholder placeholder__movement  ${
                  email ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Correo
              </span>
            </div>
            <div className="mt-6">
              <p className="text-base">
                Al agendar hora, aceptas nuestros{" "}
                <Link
                  to={"/agenda/legal"}
                  className="underline text-agenda-primary font-semibold"
                >
                  términos y condiciones
                </Link>
                .
              </p>
            </div>
          </Reveal>
          <Reveal>
            <p className="font-bold text-red-500 text-lg">¡Aviso!</p>
            <p className="text-agenda-primary">
              Le recordamos que cambiamos de ubicación temporalmente, la nueva
              ubicación es <b>La Tenca 584, Maipú.</b>
            </p>
          </Reveal>
          <button
            disabled={!email || !nombre}
            type="submit"
            className="fixed bottom-0 w-mobile lg:w-[1000px] p-4 text-center cursor-pointer my-0 mx-auto mb-5 shadow-btn-agenda rounded-lg outline-none border-none bg-agenda-primary text-white disabled:bg-[#c6c6c6] disabled:text-white disabled:cursor-not-allowed"
          >
            Agendar
          </button>
        </form>
      </div>

      {showAgendaInfoModal && (
        <AgendarHoraInfoModal
          agendarInfo={agendarInfo}
          handleCancelClick={() => setShowAgendaInfoModal(!showAgendaInfoModal)}
          handleConfirmClick={handleConfirmClick}
        />
      )}

      {showSuccessModal && (
        <ModalHoraAgendada
          agendarInfo={agendarInfo}
          source={succesIcon}
          alt={"Icono de éxito"}
          onBtnClick={handleHoraAgendadaClick}
          title="¡Reserva exitosa!"
          message="Has solicitado con éxito nuestros servicios. En unos minutos, recibirás un mensaje en tu correo con la información de tu reserva. Si no lo encuentras, recuerda revisar tu carpeta de Spam."
          btnContent={"Volver al Inicio"}
        />
      )}

      {showFailedModal && (
        <Modal
          source={dangerIcon}
          title="¡Error!"
          message="Se ha producido un error al agendar hora o la hora ya ha sido agendada por alguien más. Por favor, inténtelo de nuevo."
          onClose={handleCloseFailedModal}
          btnContent={"Volver"}
        />
      )}
    </div>
  );
}

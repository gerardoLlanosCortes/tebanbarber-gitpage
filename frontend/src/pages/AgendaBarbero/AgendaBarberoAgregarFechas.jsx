import React, { useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import {
  format,
  addMinutes,
  addDays,
  isBefore,
  subMinutes,
  parseISO,
} from "date-fns";
import useFechas from "../../hooks/useFechas";
import Modal from "../../components/Agenda/Modals/Modal";
import succesIcon from "../../assets/img/icons/success.png";
import errorIcon from "../../assets/img/icons/danger__advice.png";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoAgregarFechas() {
  const [inputs, setInputs] = useState({
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    intervalo: 15,
    descansoHora: "",
    descansoDuracion: "",
  });
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { createFecha } = useFechas();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Desestructura los valores de los inputs del state
    const {
      fechaInicio,
      fechaFin,
      horaInicio,
      horaFin,
      descansoHora,
      descansoDuracion,
    } = inputs;

    // Calcula la fecha de inicio y fin con un día más para asegurar que se incluya el último día
    const start = addDays(new Date(fechaInicio), 1);
    const end = addDays(new Date(fechaFin), 1);

    let currentDate = start; // Inicializa la fecha actual con la fecha de inicio
    let successCount = 0; // Contador para fechas exitosas

    // Itera sobre cada día en el rango especificado
    while (currentDate <= end) {
      // Formatea la fecha actual en formato "yyyy-MM-dd"
      const formattedDate = format(currentDate, "yyyy-MM-dd");

      // Objeto para almacenar la información de la nueva fecha
      const nuevaFecha = {
        fecha: format(parseISO(formattedDate), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        horaInicio,
        horaFin,
        descansoHora,
        descansoDuracion,
      };

      try {
        // Intenta crear la fecha en la base de datos
        await createFecha(nuevaFecha);
        successCount++; // Incrementa el contador si la fecha se crea con éxito
      } catch (error) {
        console.log("Error al crear la fecha", error);
      }

      currentDate = addDays(currentDate, 1); // Avanza al siguiente día
    }

    setIsLoading(false);
    // Comprueba si todas las fechas se crearon exitosamente
    if (successCount === Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1) {
      // Mostrar el modal de éxito si todas las fechas se crearon exitosamente
      setSuccessModal(true);
    } else {
      // Mostrar el modal de fallo si al menos una fecha no se creó correctamente
      setErrorModal(true);
    }
  };

  return (
    <Reveal className="flex flex-col pb-32 text-agenda-black relative">
      {isLoading && <ActionLoader />}
      <Header link={"barbero"} title={"Agregar Fechas"} />

      <form
        className="flex flex-col justify-center gap-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Fecha de inicio: <span className="text-red-600">*</span>
          </label>
          <input
            className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
            type="date"
            name="fechaInicio"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Fecha de fin: <span className="text-red-600">*</span>
          </label>
          <input
            className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
            type="date"
            name="fechaFin"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Hora de inicio: <span className="text-red-600">*</span>
          </label>
          <input
            className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
            type="time"
            name="horaInicio"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Hora de fin: <span className="text-red-600">*</span>
          </label>
          <input
            className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
            type="time"
            name="horaFin"
            required
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label>Hora de descanso:</label>
          <input
            className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
            type="time"
            name="descansoHora"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Duración de descanso (minutos):</label>
          <input
            className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
            type="number"
            name="descansoDuracion"
            onChange={handleChange}
          />
        </div> */}
        <div>
          <button
            className="w-full bg-agenda-primary text-white p-4 text-center rounded-lg border-none outline-none shadow-btn-agenda "
            type="submit"
          >
            Agregar Fechas
          </button>
        </div>
      </form>

      {successModal && (
        <Modal
          source={succesIcon}
          alt={"succes icon"}
          title="Fechas creadas satisfactoriamente"
          message="Las fechas se agregaron correctamente."
          onClose={() => setSuccessModal(!successModal)}
          btnContent={"Volver"}
        />
      )}

      {errorModal && (
        <Modal
          source={errorIcon}
          alt={"error icon"}
          title="¡Error!"
          message="Se ha producido un error al ejecutar esta acción. Por favor, inténtelo de nuevo."
          onClose={() => setErrorModal(!errorModal)}
          btnContent={"Volver"}
        />
      )}
    </Reveal>
  );
}

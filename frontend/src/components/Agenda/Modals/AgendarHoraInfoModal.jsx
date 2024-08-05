import React from "react";
import { formatearPrecio } from "../../../utils/index";
import calendarIcon from "../../../assets/img/icons/calendar.svg";
import Timer from "../../../assets/img/icons/timer.svg";
import User from "../../../assets/img/icons/user.svg";
import Reveal from "../../../utils/Reveal";

export default function AgendarHoraInfoModal({
  agendarInfo,
  handleCancelClick,
  handleConfirmClick,
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center">
      <Reveal
        y={-10}
        className="w-mobile lg:w-[30%] bg-white px-8 py-6 rounded-lg shadow-md flex flex-col items-center gap-4"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center">
            ¿Estás seguro/a de agendar esta hora?
          </h2>
          {agendarInfo.map((info, index) => (
            <div key={index} className="modal__info__contacto">
              <div className="w-[180px] flex flex-col items-center justify-center mx-auto gap-1 pb-4">
                <div className="flex items-center gap-1 w-full ">
                  <img
                    className="w-[15px]"
                    src={calendarIcon}
                    alt="icono calendario"
                  />
                  <span className="text-base font-semibold ">
                    {info.fechaSeleccionadaString}
                  </span>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <img
                    className="w-[15px]"
                    src={Timer}
                    alt="icono calendario"
                  />
                  <span className="text-base">
                    {info.horaInicio} - {info.horaFin}
                  </span>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <img className="w-[15px]" src={User} alt="icono calendario" />
                  <span className="text-base">{info.barberoNombre}</span>
                </div>
              </div>
              <div className="border-b border-t border-[#C7C9D9] py-4 flex items-center justify-between text-base">
                <p>{info.servicio}</p>
                <p>{info.precio}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-3">
            <button
              className="py-2 px-2 xs:px-3 border-none rounded-lg text-white bg-red-600"
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
            <button
              className="py-2 px-2 xs:px-3 border-none rounded-lg text-white bg-agenda-primary"
              onClick={handleConfirmClick}
            >
              Confirmar
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

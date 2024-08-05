import React from "react";
import { formatearPrecio } from "../../../utils/index";
import Reveal from "../../../utils/Reveal";

export default function Servicio({
  servicio,
  handleSelectService,
  selectedButtons,
}) {
  return (
    <Reveal>
      <button
        className={`p-4 flex flex-col items-start justify-center text-left  rounded-lg border border-agenda-gray w-full min-h-24
      ${
        selectedButtons.includes(servicio._id)
          ? "bg-agenda-primary text-white"
          : "bg-transparent text-agenda-black"
      }
      `}
        onClick={() => handleSelectService(servicio._id)}
      >
        <h3 className="font-bold text-lg flex flex-col">
          {servicio.servicio}{" "}
          <span className="text-base font-semibold">
            {servicio.duracion} minutos
          </span>
        </h3>
        <p
          className={`text-xl font-extrabold text-agenda-green 
         ${
           selectedButtons.includes(servicio._id)
             ? "text-white"
             : "text-agenda-black"
         }`}
        >
          {formatearPrecio(servicio.precio)}
        </p>
      </button>
    </Reveal>
  );
}

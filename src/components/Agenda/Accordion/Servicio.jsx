import React from "react";
import Clock from "../../../assets/img/icons/timer.svg";
import { formatearPrecio } from "../../../utils";

export default function Servicio({servicio}) {
  return (
    <div className="px-1 text-agenda-black flex flex-col gap-1">
      <p className="text-lg font-semibold">{servicio.servicio}</p>
      <div className="flex flex-col gap-1">
        <span className="text-sn">{servicio.descripcion}</span>
        <span className="text-sm">{formatearPrecio(servicio.precio)}</span>
        <span className="flex items-center gap-1 text-sm">
          <img className="w-4" src={Clock} alt="icono tiempo" />
          <span>{servicio.duracion} mins</span>
        </span>
      </div>
    </div>
  );
}

import React from "react";
import deleteTrashIcon from "../../../../assets/img/icons/delete__trash.svg";
import editIcon from "../../../../assets/img/icons/pencil-outline.svg";
import { formatearPrecio } from "../../../../utils";

export default function Servicio({
  servicio,
  handleDeleteServicio,
  handleEditServicio,
}) {
  return (
    <div className="flex items-start justify-between bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-xl text-balance font-semibold">
          {servicio.servicio}
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-sm italic">{servicio.tipo.nombre}</p>
          <p className="text-base text-pretty">{servicio.descripcion}</p>
          <p className="text-base">{formatearPrecio(servicio.precio)}</p>
          <p className="text-base">{servicio.duracion} minutos</p>
        </div>
      </div>
      <div className="flex w-[40px] flex-col items-center justify-center gap-2">
        <a onClick={() => handleDeleteServicio(servicio)}>
          <img src={deleteTrashIcon} className="w-full" alt="icono eliminar" />
        </a>
        <a onClick={() => handleEditServicio(servicio)}>
          <img src={editIcon} className="w-full" alt="icono editar" />
        </a>
      </div>
    </div>
  );
}

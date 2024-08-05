import React from "react";
import deleteTrashIcon from "../../../../assets/img/icons/delete__trash.svg";
import editIcon from "../../../../assets/img/icons/pencil-outline.svg";

export default function TipoServicio({
  tipoServicio,
  handleDeleteTipoServicio,
  handleEditTipoServicio,
}) {
  return (
    <div className="flex items-start justify-between bg-white p-5 rounded-lg shadow-sm">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{tipoServicio.nombre}</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <a onClick={() => handleDeleteTipoServicio(tipoServicio)}>
          <img src={deleteTrashIcon} width={"30px"} alt="icono eliminar" />
        </a>
        <a onClick={() => handleEditTipoServicio(tipoServicio)}>
          <img src={editIcon} width={"30px"} alt="icono editar" />
        </a>
      </div>
    </div>
  );
}

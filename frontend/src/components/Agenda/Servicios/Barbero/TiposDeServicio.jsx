import React from "react";
import TipoServicio from "./TipoServicio";

export default function TiposDeServicio({
  tiposServicios,
  handleDeleteTipoServicio,
  handleEditTipoServicio,
}) {
  return (
    <div className="flex flex-col gap-4 pb-16">
      <h2 className="text-center text-2xl">Tipos de Servicio</h2>
      <div className="flex flex-col gap-4">
        {tiposServicios.length <= 0 ? (
          <p className="text-center text-xl font-semibold">No hay Tipos de Servicios Creados</p>
        ) : (
          tiposServicios.map((tipoServicio) => (
            <TipoServicio
              key={tipoServicio._id}
              tipoServicio={tipoServicio}
              handleDeleteTipoServicio={handleDeleteTipoServicio}
              handleEditTipoServicio={handleEditTipoServicio}
            />
          ))
        )}
      </div>
    </div>
  );
}

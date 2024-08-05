import React from "react";
import Accordion from "./Accordion";

export default function ServicioCategoria({ tiposServicios }) {
  return (
    <div className="flex flex-col gap-6">
      {tiposServicios.map((tipoServicio) => (
        <div className="py-2 rounded-sm border-b-[1px] border-black" key={tipoServicio._id}>
          <Accordion title={tipoServicio?.nombre} servicios={tipoServicio.servicios} />
        </div>
      ))}
    </div>
  );
}

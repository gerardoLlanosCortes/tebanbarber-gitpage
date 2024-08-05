import React from "react";
import Servicio from "./Servicio";

export default function Servicios({
  servicios,
  handleDeleteServicio,
  handleEditServicio,
}) {
  return (
    <div className="flex flex-col gap-4 pb-16">
      <h2 className="text-center text-2xl">Servicios</h2>
      <div className="flex flex-col gap-4">
        {servicios.map((servicio) => (
          <Servicio
            key={servicio._id}
            servicio={servicio}
            handleDeleteServicio={handleDeleteServicio}
            handleEditServicio={handleEditServicio}
          />
        ))}
      </div>
    </div>
  );
}

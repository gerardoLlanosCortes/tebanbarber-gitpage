import React, { useState } from "react";
import Close from "../../../assets/img/icons/close.svg";
import Reveal from "../../../utils/Reveal";

export default function EditServicioModal({
  servicioToEdit,
  setShowModal,
  handleSubmitEdit,
  tiposServicios,
}) {
  const [updatedInputs, setUpdatedInputs] = useState({
    _id: servicioToEdit._id || "",
    servicio: servicioToEdit.servicio || "",
    tipo: servicioToEdit.tipo._id || "",
    descripcion: servicioToEdit.descripcion || "",
    precio: servicioToEdit.precio || "",
    duracion: servicioToEdit.duracion || "",
  });

  const handleChange = (e) => {
    setUpdatedInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center">
      <Reveal
        y={-10}
        className="w-mobile lg:w-[30%] bg-white px-8 py-6 rounded-lg shadow-md flex flex-col items-center gap-4"
      >
        <div
          className="self-end absolute text-lg font-semibold text-agenda-primary"
          onClick={() => setShowModal(false)}
        >
          <img width={20} src={Close} alt="close icon" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-balance pt-6">
          Editar Tipo de Servicio: {servicioToEdit.servicio}
        </h2>
        <form
          className="w-full flex flex-col items-start justify-center gap-5"
          onSubmit={(e) => handleSubmitEdit(e, updatedInputs)}
        >
          <div>
            <label>Servicio:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              name="servicio"
              required
              value={updatedInputs.servicio}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Tipo de Servicio:</label>
            <select
              onChange={handleChange}
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              name="tipo"
              value={updatedInputs.tipo}
            >
              <option value="">-- Seleccionar Opción --</option>
              {tiposServicios?.map((tipo) => (
                <option key={tipo?._id} value={tipo?._id}>
                  {tipo?.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Descripción: </label>
            <input
              type="text"
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              name="descripcion"
              value={updatedInputs.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="number"
              name="precio"
              required
              value={updatedInputs.precio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Duración (minutos):</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="number"
              name="duracion"
              required
              value={updatedInputs.duracion}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex items-center justify-between py-4">
            <button
              className="px-2 py-2  xs:py-3 xs:px-5 border-none rounded-lg text-white bg-red-600"
              onClick={setShowModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-2 py-2 xs:py-3 xs:px-5border-none rounded-lg text-white bg-agenda-primary"
            >
              Guardar
            </button>
          </div>
        </form>
      </Reveal>
    </div>
  );
}

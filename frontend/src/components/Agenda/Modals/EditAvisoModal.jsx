import React, { useState } from "react";
import Close from "../../../assets/img/icons/close.svg";
import Reveal from "../../../utils/Reveal";

export default function EditAvisoModal({
  avisoToEdit,
  setShowModal,
  handleSubmitEdit,
}) {
  const [titulo, setTitulo] = useState(avisoToEdit.titulo);
  const [contenido, setContenido] = useState(avisoToEdit.contenido);

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
          Editar Aviso: {avisoToEdit.titulo}
        </h2>
        <form
          className="w-full flex flex-col items-start justify-center gap-5"
          onSubmit={(e) =>
            handleSubmitEdit(e, avisoToEdit._id, { titulo, contenido })
          }
        >
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label className="text-center">Título del aviso:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              value={titulo}
              required
              type="text"
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label className="text-center">Contenido del aviso:</label>
            <textarea
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              value={contenido}
              required
              type="text"
              onChange={(e) => setContenido(e.target.value)}
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

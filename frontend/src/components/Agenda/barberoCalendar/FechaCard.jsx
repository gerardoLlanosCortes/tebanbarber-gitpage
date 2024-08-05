import React from "react";
import { FormatearFechaCard, isFechaPasada } from "../../../utils";
import deleteTrashIcon from "../../../assets/img/icons/delete__trash.svg";

export default function FechaCard({
  fecha,
  selectedFecha,
  setSelectedFecha,
  selectedHora,
  setSelectedHora,
  handleDeleteFechaModal,
  setSelectedFechaToDelete,
}) {
  const handleHoraClick = (fechaId) => {
    if (!isFechaPasada(fecha)) {
      setSelectedFecha(fechaId);
      setSelectedHora(null); // Reiniciar la hora seleccionada al cambiar la fecha
    }
  };

  const handleDeleteClick = () => {
    setSelectedFechaToDelete(fecha);
    handleDeleteFechaModal();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 h-full">
        <h1
          id={fecha._id}
          onClick={() => {
            handleHoraClick(fecha._id);
          }}
          className={`border border-[#C3C3C3] rounded-lg py-3 px-2 text-3xl text-center w-full font-semibold 
          ${
            fecha._id === selectedFecha
              ? "bg-agenda-primary text-white border-[#C6C6C6]"
              : isFechaPasada(fecha)
              ? "bg-transparent text-[#C6C6C6] border-[#C6C6C6]"
              : "bg-transparent text-black border-[#A5A5A5]"
          }
          `}
        >
          {FormatearFechaCard(fecha.fecha).split(" ")[0]}
          <br />
          {FormatearFechaCard(fecha.fecha).split(" ")[1]}
        </h1>
        <button
          className="flex items-center justify-center w-full p-[6px] rounded-lg border border-[#C3C3C3] bg-[#F8F8F8]"
          onClick={handleDeleteClick}
        >
          <img className="w-[30px]" src={deleteTrashIcon} alt="delete icon" />
        </button>
      </div>
    </>
  );
}

import React from "react";
import AddToCalendarBtn from "../Ui/AddToCalendarBtn";
import Reveal from "../../../utils/Reveal";

function ModalHoraAgendada({
  agendarInfo,
  source,
  alt,
  title,
  message,
  onBtnClick,
  btnContent,
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center">
      <Reveal
        y={-10}
        className="w-mobile lg:w-[30%] bg-white px-8 py-6 rounded-lg shadow-md flex flex-col items-center gap-4 "
      >
        <img className="-mb-8" src={source} alt={alt} />
        <h2 className="text-center text-xl font-semibold text-balance">
          {title}
        </h2>
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <p className="text-center text-base text-pretty">{message}</p>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col justify-between items-center w-full gap-2">
              <h3 className="text-center font-semibold">
                Añade el evento a tu calendario
              </h3>
              <AddToCalendarBtn agendarInfo={agendarInfo} />
            </div>
            <button
              className="py-4 px-6 w-full bg-agenda-primary border-none rounded-lg text-white"
              onClick={onBtnClick}
            >
              {btnContent}
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default ModalHoraAgendada;

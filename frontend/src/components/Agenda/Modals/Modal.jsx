import React from "react";

import Reveal from "../../../utils/Reveal";

function Modal({ source, alt, title, message, onClose, btnContent }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center">
      <Reveal
        className="w-mobile lg:w-[30%] bg-white px-8 py-6 rounded-lg shadow-md flex flex-col items-center gap-4"
        y={-10}
      >
        <img className="-mb-8" src={source} alt={alt} />
        <h2 className="text-center text-xl font-semibold text-balance">
          {title}
        </h2>
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-center text-base text-pretty">{message}</p>
          <button
            className="py-4 px-6 w-full bg-agenda-primary border-none rounded-lg text-white"
            onClick={onClose}
          >
            {btnContent}
          </button>
        </div>
      </Reveal>
    </div>
  );
}

export default Modal;

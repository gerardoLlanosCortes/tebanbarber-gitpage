import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../../utils/Reveal";

function TimedModalDinamico({
  source,
  alt,
  title,
  content,
  onClose,
  btnContent,
}) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center">
      <Reveal
        y={-10}
        className="w-mobile lg:w-[30%] bg-white px-8 py-6 rounded-lg shadow-md flex flex-col items-center gap-4"
      >
        <img className="-mb-8" src={source} alt={alt} />
        <h2 className="text-center text-xl font-semibold text-balance">
          {title}
        </h2>
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-center text-base text-pretty">{content}</p>

          <button
            className="py-4 px-6 w-full bg-agenda-primary border-none rounded-lg text-white disabled:bg-[#c6c6c6] disabled:text-white disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={isDisabled}
          >
            {btnContent}
          </button>
        </div>
      </Reveal>
    </div>
  );
}

export default TimedModalDinamico;

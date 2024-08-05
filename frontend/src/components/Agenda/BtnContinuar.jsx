import React from "react";
export default function BtnContinuar({ handleContinue, disabledCondition }) {
  return (
    <button
      disabled={disabledCondition}
      className="fixed bottom-0 w-mobile lg:w-[1000px] p-4 text-center cursor-pointer my-0 mx-auto mb-5 shadow-btn-agenda rounded-lg outline-none border-none bg-agenda-primary text-white disabled:bg-[#c6c6c6] disabled:text-white disabled:cursor-not-allowed"
      onClick={handleContinue}
    >
      Continuar
    </button>
  );
}

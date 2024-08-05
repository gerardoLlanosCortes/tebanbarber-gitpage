import React, { useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import { useNavigate } from "react-router-dom";
import Reveal from "../../utils/Reveal";

export default function AgendaCancelar() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/agenda/cancelar/${email}`);
  };

  return (
    <div className="w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative">
      <Header link={"agenda?show=no"} title={"Revisar Hora"} />

      <div className="flex flex-col gap-12">
        <Reveal className={"font-semibold"}>
          Ingresa tu correo para ver o cancelar tus horas{" "}
        </Reveal>
        <form className="agenda__contact__form" onSubmit={handleSubmit}>
          <div className="container__input">
            <Reveal className={"items"}>
              <input
                id="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span
                className={`placeholder placeholder__movement  ${
                  email ? "active" : ""
                }`}
              >
                Ingresa tu correo
              </span>
            </Reveal>

            <button
              type="submit"
              className="fixed bottom-0 w-mobile lg:w-[1000px] p-4 text-center cursor-pointer my-0 mx-auto mb-5 shadow-btn-agenda rounded-lg outline-none border-none bg-agenda-primary text-white "
            >
              Ver Horas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import Header from "../../components/Agenda/Navigation/Header";
import locationIcon from "../../assets/img/icons/location.svg";

export default function AgendaUbicacion() {
  return (
    <>
      <div className="w-mobile lg:w-dekstop mx-auto flex flex-col text-agenda-black relative">
        <Header link={"agenda?show=no"} title={"Ubicación"} />
      </div>
      <div className="flex flex-col gap-8 text-agenda-black">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.186276519703!2d-70.7479417!3d-33.470500699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c30e69b3d135%3A0x3fd6384e7f4d3a04!2sLa%20Tenca%20584%2C%209290472%20Santiago%2C%20Maip%C3%BA%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1718322072661!5m2!1ses-419!2scl"
          width="100%"
          height="450"
          style={{ border: "0" }} // Corregir la línea de estilo aquí
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="w-mobile mx-auto flex flex-col items-start justify-center gap-2">
          <div className="flex items-center justify-center gap-1">
            <img className="w-8" src={locationIcon} alt="location icon" />
            <h3 className="text-xl font-semibold">
              TEBANBARBERSHOP | Ubicación Temporal
            </h3>
          </div>
          <div className="pl-2">
            <p>La Tenca 584, 9290472 Santiago, Maipú, Región Metropolitana</p>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import useAuth from "../../hooks/useAuth";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Error from "../../components/Agenda/Ui/Error";
import NavLinks from "../../components/Agenda/Navigation/Barbero/NavLinks";

import iconAdd from "../../assets/img/icons/add-outline.svg";
import iconCalendar from "../../assets/img/icons/calendar-number-outline.svg";
import iconCut from "../../assets/img/icons/cut-outline.svg";
import iconOptions from "../../assets/img/icons/construct-outline.svg";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoHomeAdministrar() {
  return (
    <div className="flex flex-col pb-32 text-agenda-black relative">
      <Header link={"barbero"} title={"Adminstración"} />

      <Reveal className="flex flex-col items-center justify-center mt-8">
        <NavLinks
          link={"/barbero/administrar/servicios"}
          icon={iconOptions}
          alt={"icono herramienta"}
          text={"Administrar Servicios"}
        />
        <NavLinks
          link={"/barbero/administrar/tipo-servicio"}
          icon={iconOptions}
          alt={"icono herramienta"}
          text={"Administrar Tipos de Servicio"}
        />
        <NavLinks
          link={"/barbero/administrar/productos"}
          icon={iconOptions}
          alt={"icono herramienta"}
          text={"Administrar Productos"}
        />
        <NavLinks
          link={"/barbero/administrar/usuarios"}
          icon={iconOptions}
          alt={"icono herramienta"}
          text={"Administrar Usuarios"}
        />
        <NavLinks
          link={"/barbero/administrar/acceso"}
          icon={iconOptions}
          alt={"icono herramienta"}
          text={"Administrar Accesos"}
        />
        <NavLinks
          link={"/barbero/administrar/avisos"}
          icon={iconOptions}
          alt={"icono herramienta"}
          text={"Administrar Avisos"}
        />
      </Reveal>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import tebanBarberLogo from "../../assets/img/teban-logo-black.jpeg";
import iconLogout from "../../assets/img/icons/log-out-outline.svg";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import NavAdmin from "../../components/Agenda/Navigation/Barbero/NavAdmin";
import NavBarbero from "../../components/Agenda/Navigation/Barbero/NavBarbero";
import { obtenerTokenInfo } from "../../utils";
import ReactSwitch from "react-switch";
import useUsuarios from "../../hooks/useUsuarios";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoHome() {
  // Obtener info del usuario
  const nombre = localStorage.getItem("nombre");
  const userToken = obtenerTokenInfo();

  // Obtener y manejar el estado isActive
  const [isActive, setIsActive] = useState(false);

  const { cerrarSesionAuth } = useAuth();
  const { changeStatus, getUser } = useUsuarios();

  const handleLogoutClick = () => {
    cerrarSesionAuth();
  };

  useEffect(() => {
    const getStatusData = async () => {
      const data = await getUser(userToken.id);
      setIsActive(data.activo);
    };
    getStatusData();
  }, []);

  const handleStatusChange = async () => {
    const newStatus = !isActive;
    // Realizar los cambios en la base de datos
    try {
      //SI TODO SALE BIEN ENTONCES SE CAMBIA EN EL USUARIO
      await changeStatus(userToken.id);
      setIsActive(newStatus);
      localStorage.setItem("activo", newStatus.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Reveal className="flex flex-col pb-32 text-agenda-black relative">
      <div className="my-16 mb-8 flex flex-col gap-6">
        <h1 className="text-center text-3xl">Inicio Barbero</h1>
        <div className="flex flex-col items-center justify-center gap-2">
          <figure className="w-[100px]">
            <img
              className="w-full rounded-full"
              src={tebanBarberLogo}
              alt="tebanbarber logo"
            />
          </figure>
          <h3 className="text-xl">{nombre}</h3>
          <div className="flex justify-center w-full">
            <div className="flex gap-1 items-center">
              <p>Estado:</p>
              <p
                className={`${
                  isActive ? "text-green-600" : "text-red-600"
                } font-semibold`}
              >
                {isActive ? "Activo" : "Inactivo"}
              </p>
              <ReactSwitch
                onChange={handleStatusChange}
                checked={isActive}
                onColor="#324b4c"
                height={18}
                width={36}
              />
            </div>
          </div>
        </div>
      </div>

      <nav className="flex flex-col items-center justify-center mt-8">
        {/* SEPARAR EN NAV ADMIN Y NAV BARBERO */}
        {userToken.rol === "admin" ? <NavAdmin /> : <NavBarbero />}
        <Link
          className="w-full border-t border-t-[#ccc] h-20 flex justify-start items-center no-underline text-xl p-4 py-8 gap-2"
          onClick={handleLogoutClick}
        >
          <img className="w-6" src={iconLogout} alt={"icono logout"} />
          Cerrar Sesión
        </Link>
      </nav>
    </Reveal>
  );
}

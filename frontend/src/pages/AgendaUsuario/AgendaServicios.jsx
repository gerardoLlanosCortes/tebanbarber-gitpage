import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Servicio from "../../components/Agenda/Servicios/Servicio";
import Header from "../../components/Agenda/Navigation/Header";
import BtnContinuar from "../../components/Agenda/BtnContinuar";
import useServicios from "../../hooks/useServicios";
import useFechas from "../../hooks/useFechas";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import iconUser from "../../assets/img/icons/user.svg";
import Reveal from "../../utils/Reveal";

export default function AgendaServicios() {
  const { setAgendarInfo } = useFechas();
  const { getServiciosFromUsers, userAndServicesInfo } = useServicios();
  const [selectedButtons, setSelectedButtons] = useState([]); // Cambio a array para almacenar múltiples selecciones
  const [selectedUser, setSelectedUser] = useState({});
  const [servicios, setServicios] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setAgendarInfo([]); // Establecer un arreglo vacío

    const fetchData = async () => {
      try {
        // Todo: Ver si se agrega el que venga el primero por defecto como seleccionado
        await getServiciosFromUsers();
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(userAndServicesInfo);

  const handleSelectService = (id) => {
    // Verificar si el botón ya está seleccionado
    const index = selectedButtons.indexOf(id);
    if (index === -1) {
      // Si no está seleccionado, eliminar el servicio anterior y seleccionar este
      setSelectedButtons([id]);
    } else {
      // Si ya está seleccionado, deseleccionarlo
      setSelectedButtons([]);
    }
  };

  const handleContinue = () => {
    if (selectedButtons.length === 0) {
      console.log("Seleccione su servicio.");
      return;
    }

    // Obtener los servicios seleccionados en el orden en que se seleccionaron
    const selectedServices = selectedButtons.map((id) =>
      servicios.find((servicio) => servicio._id === id)
    );

    // Manejo de los servicios
    setAgendarInfo(() => {
      const updatedServices = selectedServices.map((selectedService) => ({
        barberoId: selectedUser.id,
        barberoNombre: selectedUser.nombre,
        servicio: selectedService.servicio,
        precio: selectedService.precio,
        duracion: selectedService.duracion,
        nombre: "",
        email: "",
        fechaSeleccionada: "",
        horaSeleccionada: null,
      }));

      return updatedServices;
    });

    navigate("/agenda/horas");
  };

  const handleBarberoClick = (id) => {
    setSelectedButtons([]);
    const user = userAndServicesInfo.filter((user) => user._id === id);
    const userSelectedInfo = {
      id: user[0]._id,
      nombre: user[0].nombre,
    };
    setSelectedUser(userSelectedInfo);
    setServicios(user[0].servicios);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative">
      <Header link={"agenda?show=no"} title={"Seleccione sus Servicios"} />

      <Reveal className="flex flex-col gap-3">
        {userAndServicesInfo.length === 0 ? (
          <span className="text-lg font-bold text-center">
            Actualmente no hay Barberos y/o Servicios, vuelva a intentarlo más
            tarde
          </span>
        ) : (
          <>
            <h5 className="font-semibold">Selecciona tu Barbero</h5>
            <Reveal className={"flex gap-4"}>
              {userAndServicesInfo.map((userInfo) => (
                <div
                  className={` flex flex-col gap-1 ${
                    selectedUser.id === userInfo._id
                      ? "opacity-100"
                      : "opacity-50"
                  }`}
                  key={userInfo._id}
                  onClick={() => handleBarberoClick(userInfo._id)}
                >
                  <div className=" rounded-full p-2 border-2 border-agenda-primary w-max mx-auto cursor-pointer">
                    <img className="w-12" src={iconUser} alt="icono barbero" />
                  </div>
                  <p className="text-center text-agenda-primary font-semibold">
                    {userInfo.nombre.toUpperCase()}
                  </p>
                </div>
              ))}
            </Reveal>

            <h5 className="font-semibold">Selecciona tu Servicio</h5>
            <div className="flex flex-col gap-5">
              {servicios.length > 0 ? (
                servicios.map((servicio) => (
                  <Servicio
                    key={servicio._id}
                    servicio={servicio}
                    handleSelectService={handleSelectService}
                    selectedButtons={selectedButtons}
                  />
                ))
              ) : (
                <p>
                  <i>Debes seleccionar un barbero para ver los servicios</i>
                </p>
              )}
            </div>
          </>
        )}
      </Reveal>

      <BtnContinuar
        handleContinue={handleContinue}
        disabledCondition={selectedButtons.length === 0}
      />
    </div>
  );
}

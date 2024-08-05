import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Servicio from "../../components/Agenda/Servicios/Servicio";
import Header from "../../components/Agenda/Navigation/Header";
import BtnContinuar from "../../components/Agenda/BtnContinuar";
import useServicios from "../../hooks/useServicios";
import useFechas from "../../hooks/useFechas";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import useUsuarios from "../../hooks/useUsuarios";

export default function AgendaBarberos() {
  const { setAgendarInfo } = useFechas();
  const { getServicios, servicios } = useServicios();
  const { getUsersInfo, usersInfo } = useUsuarios();
  const [selectedButtons, setSelectedButtons] = useState([]); // Cambio a array para almacenar múltiples selecciones
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setAgendarInfo([]); // Establecer un arreglo vacío

    const fetchData = async () => {
      try {
        await getUsersInfo();
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        barberoId: "",
        servicio: "",
        precio: "",
        duracion: "",
        nombre: "",
        email: "",
        fechaSeleccionada: "",
        horaSeleccionada: null,
      }));

      return updatedServices;
    });

    navigate("/servicios");
  };

  console.log(usersInfo);

  if (isLoading) {
    return <MainLoader />;
  }

  if (usersInfo.length === 0)
    return (
      <div className="w-mobile mx-auto flex flex-col pb-32 text-agenda-black relative">
        <Header link={""} title={"Seleccione su Barbero"} />

        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-bold text-center">
            Actualmente no hay barberos disponibles
          </h1>
        </div>
      </div>
    );

  return (
    <div className="w-mobile mx-auto flex flex-col pb-32 text-agenda-black relative">
      <Header link={"?show=no"} title={"Seleccione sus Servicios"} />

      <div className="flex flex-col gap-3">
        <h5 className="font-semibold">Selecciona tu Barbero</h5>
        <div className="flex flex-col gap-5"></div>
      </div>

      <BtnContinuar
        handleContinue={handleContinue}
        disabledCondition={selectedButtons.length === 0}
      />
    </div>
  );
}

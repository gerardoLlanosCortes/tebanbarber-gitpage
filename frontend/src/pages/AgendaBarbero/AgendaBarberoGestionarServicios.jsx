import { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import Switch from "react-switch";
import useTipoServicio from "../../hooks/useTipoServicio";
import useServicios from "../../hooks/useServicios";
import useUsuarios from "../../hooks/useUsuarios";
import { obtenerTokenInfo } from "../../utils";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoGestionarServicios() {
  const { getServicios, servicios } = useServicios();
  const {
    userServices,
    getUserServiceData,
    addServiceToUser,
    RemoveServiceFromUser,
  } = useUsuarios();
  const [serviciosUser, setServiciosUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const userToken = obtenerTokenInfo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getServicios();
        await getUserServiceData(userToken.id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Inicializar serviciosUser con los servicios del usuario
    const userServiciosMap = userServices.reduce((acc, servicio) => {
      acc[servicio._id] = true;
      return acc;
    }, {});
    setServiciosUser(userServiciosMap);
  }, [userServices]);

  const handleChange = (id) => async (checked) => {
    setServiciosUser((prevServicios) => ({
      ...prevServicios,
      [id]: checked,
    }));

    console.log("id del servicio", id);

    if (checked) {
      // Si es true agregar a la base de datos
      await addServiceToUser(userToken.id, id);
    } else {
      // Si es false quitar de la base de datos
      console.log("Eliminando de la db");
      await RemoveServiceFromUser(userToken.id, id);
    }
  };

  if (isLoading) return <MainLoader />;

  return (
    <div className="flex flex-col pb-32 text-agenda-black relative">
      <Header link={"barbero"} title={"Gestionar Servicios"} />

      <Reveal className="flex flex-col gap-3">
        <h5 className="font-semibold">Gestiona los servicios que realizarás</h5>
        <div className="flex flex-col gap-1">
          {servicios.map((servicio) => (
            <div
              className="flex justify-between gap-2 items-center mt-4 p-6 rounded-lg border border-agenda-primary border-opacity-40 text-agenda-primary"
              key={servicio._id}
            >
              <div className="flex flex-col flex-1 min-w-0">
                <h1 className="text-xl font-semibold">{servicio.servicio}</h1>
                <p className="text-sm text-gray-600">{servicio.tipo.nombre}</p>
              </div>
              <div>
                <Switch
                  onChange={handleChange(servicio._id)}
                  checked={serviciosUser[servicio._id] || false}
                  onColor="#324b4c"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

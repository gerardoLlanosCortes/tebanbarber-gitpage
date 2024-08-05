import React, { useEffect, useState } from "react";
import useServicios from "../../../hooks/useServicios";
import useUsuarios from "../../../hooks/useUsuarios";
import Switch from "react-switch";
import Error from "../Ui/Error";
import Close from "../../../assets/img/icons/close.svg";
import Reveal from "../../../utils/Reveal";

export default function EditUsuarioModal({
  usuarioToEdit,
  setShowModal,
  setIsLoadingAction,
  setShowFailedModal,
}) {
  const { getServicios, servicios } = useServicios();
  const {
    userServices,
    getUserServiceData,
    addServiceToUser,
    RemoveServiceFromUser,
    updateUser,
  } = useUsuarios();
  const [serviciosUser, setServiciosUser] = useState({});
  // const [isLoadingAction, setIsLoadingAction] = useState(true);
  const [error, setError] = useState(true);

  const [updatedInputs, setUpdatedInputs] = useState({
    _id: usuarioToEdit._id || "",
    nombre: usuarioToEdit.nombre || "",
    email: usuarioToEdit.email || "",
  });

  const handleChange = (e) => {
    setUpdatedInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getServicios();
        await getUserServiceData(usuarioToEdit._id);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Optional: Implement retry logic here
      }
    };
    fetchData();
  }, [usuarioToEdit._id]);

  useEffect(() => {
    // Inicializar serviciosUser con los servicios del usuario
    const userServiciosMap = userServices.reduce((acc, servicio) => {
      acc[servicio._id] = true;
      return acc;
    }, {});
    setServiciosUser(userServiciosMap);
  }, [userServices]);

  const handleChangeSwitch = (id) => async (checked) => {
    setServiciosUser((prevServicios) => ({
      ...prevServicios,
      [id]: checked,
    }));

    console.log("id del servicio", id);

    try {
      if (checked) {
        // Si es true agregar a la base de datos
        await addServiceToUser(usuarioToEdit._id, id);
      } else {
        // Si es false quitar de la base de datos
        console.log("Eliminando de la db");
        await RemoveServiceFromUser(usuarioToEdit._id, id);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      // Optional: Revert state change if necessary
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar campos obligatorios
    if ([updatedInputs.nombre, updatedInputs.email].includes("")) {
      setError("Todos los datos son obligatorios");
      return;
    }

    setIsLoadingAction(true);
    try {
      await updateUser(updatedInputs._id, {
        nombre: updatedInputs.nombre,
        email: updatedInputs.email,
      });
    } catch (error) {
      setShowModal(false);

      console.log(error);
    } finally {
      setShowModal(false);
      setIsLoadingAction(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center overflow-auto">
      <Reveal
        y={-10}
        className="w-mobile lg:w-[30%] max-h-[90vh] bg-white px-8 py-6 rounded-lg shadow-md flex flex-col items-center gap-4 overflow-y-auto"
      >
        <div
          className="self-end absolute text-lg font-semibold text-agenda-primary"
          onClick={() => setShowModal(false)}
        >
          <img width={20} src={Close} alt="close icon" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-balance pt-6">
          Editar Barbero: {usuarioToEdit.nombre}
        </h2>
        <form
          className="w-full flex flex-col items-start justify-center gap-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label>Nombre:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              name="nombre"
              required
              value={updatedInputs.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="email"
              name="email"
              required
              value={updatedInputs.email}
              onChange={handleChange}
            />
          </div>
          {error && <Error msg={error} />}
          <div className="w-full flex items-center justify-between py-4">
            <button
              className="px-2 py-2 xs:py-3 xs:px-5 border-none rounded-lg text-white bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-2 py-2 xs:py-3 xs:px-5 border-none rounded-lg text-white bg-agenda-primary"
            >
              Guardar
            </button>
          </div>
        </form>

        <div className="w-full flex flex-col">
          <h5 className="text-base">
            Gestiona los servicios que realizará el barbero
          </h5>
          <div className="flex flex-col gap-1">
            {servicios.map((servicio) => (
              <div
                className="flex justify-between gap-2 items-center mt-4 p-3 rounded-lg border border-agenda-primary border-opacity-40 text-agenda-primary"
                key={servicio._id}
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <h1 className="text-xl font-semibold">{servicio.servicio}</h1>
                  <p className="text-sm text-gray-600">
                    {servicio.tipo.nombre}
                  </p>
                </div>
                <div>
                  <Switch
                    onChange={handleChangeSwitch(servicio._id)}
                    checked={serviciosUser[servicio._id] || false}
                    onColor="#324b4c"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

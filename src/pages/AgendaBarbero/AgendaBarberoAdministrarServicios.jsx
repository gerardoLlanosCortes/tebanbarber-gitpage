import React, { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import Servicios from "../../components/Agenda/Servicios/Barbero/Servicios";
import useTipoServicio from "../../hooks/useTipoServicio";
import Modal from "../../components/Agenda/Modals/Modal";
import useServicios from "../../hooks/useServicios";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";

import succesIcon from "../../assets/img/icons/success.png";
import DangerIcon from "../../assets/img/icons/danger__advice.png";
import EditServicioModal from "../../components/Agenda/Modals/EditServicioModal";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoAdministrarServicios() {
  const [inputs, setInputs] = useState({
    servicio: "",
    tipo: "",
    descripcion: "",
    precio: "",
    duracion: "",
  });
  const [servicioToDelete, setServicioToDelete] = useState();
  const [servicioToEdit, setServicioToEdit] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const { getTiposServicios, tiposServicios } = useTipoServicio();
  const {
    getServicios,
    createServicio,
    deleteServicio,
    editServicio,
    servicios,
  } = useServicios();

  useEffect(() => {
    setIsLoading(true);
    const obtenerData = async () => {
      try {
        await Promise.all([getServicios(), getTiposServicios()]);
      } catch (error) {
        console.error("Error al obtener los tipos de servicio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    obtenerData();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDeleteServicio = (servicio) => {
    setServicioToDelete(servicio);
    setShowDeleteModal(true);
  };

  const handleEditServicio = (servicio) => {
    setServicioToEdit(servicio);
    setShowEditModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(!showDeleteModal);
    setIsLoadingAction(true);
    try {
      await deleteServicio(servicioToDelete._id);
    } catch (error) {
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleSubmitEdit = async (e, servicioEdit) => {
    setIsLoadingAction(true);
    e.preventDefault();
    try {
      await editServicio(servicioEdit);
      setShowEditModal(!showEditModal);
    } catch (error) {
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoadingAction(true);
    e.preventDefault();
    try {
      await createServicio(inputs);

      setInputs({
        servicio: "",
        tipo: "",
        descripcion: "",
        precio: "",
        duracion: "",
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.log("error", error);
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
    }
  };

  {
    if (isLoading) return <MainLoader />;
  }

  return (
    <div className=" flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}
      <Header link={"barbero/administrar"} title={"Administrar Servicios"} />

      <Reveal className="flex flex-col gap-16">
        <form
          className="flex flex-col justify-center gap-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label>Servicio:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              name="servicio"
              required
              value={inputs.servicio}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Tipo de Servicio:</label>
            <select
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-[40px] w-full bg-transparent"
              name="tipo"
              value={inputs.tipo}
              onChange={handleChange}
            >
              <option value={""}>-- Seleccionar opción --</option>
              {tiposServicios.map((tipo) => (
                <option key={tipo._id} value={tipo._id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Descripción: </label>
            <input
              type="text"
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              name="descripcion"
              value={inputs.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="number"
              name="precio"
              required
              value={inputs.precio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Duración (minutos):</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="number"
              name="duracion"
              required
              value={inputs.duracion}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="w-full bg-agenda-primary text-white p-4 text-center rounded-lg border-none outline-none shadow-btn-agenda "
              type="submit"
            >
              Agregar Tipo de Servicio
            </button>
          </div>
        </form>

        {servicios && (
          <Servicios
            servicios={servicios}
            handleDeleteServicio={handleDeleteServicio}
            handleEditServicio={handleEditServicio}
          />
        )}
      </Reveal>

      {showSuccessModal && (
        <Modal
          source={succesIcon}
          alt={"success icon"}
          title="Servicio creado satisfactoriamente"
          message="El Servicio se agregó correctamente, ya puedes agregar uno nuevo"
          onClose={() => setShowSuccessModal(!showSuccessModal)}
          btnContent={"Volver"}
        />
      )}

      {showFailedModal && (
        <Modal
          source={DangerIcon}
          alt={"error icon"}
          title="¡Error!"
          message="Se ha producido un error al ejecutar esta acción. Por favor, inténtelo de nuevo."
          onClose={() => setShowFailedModal(!showFailedModal)}
          btnContent={"Volver"}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          icono={DangerIcon}
          Titulo={`¿Estás seguro de eliminar el servicio ${servicioToDelete.servicio}?`}
          descripcion={
            "Esta acción no se podrá deshacer y eliminará para siempre este servicio."
          }
          setShowModal={() => setShowDeleteModal(!showDeleteModal)}
          confirmDelete={handleConfirmDelete}
        />
      )}

      {showEditModal && (
        <EditServicioModal
          servicioToEdit={servicioToEdit}
          setShowModal={() => setShowEditModal(!showEditModal)}
          handleSubmitEdit={handleSubmitEdit}
          tiposServicios={tiposServicios}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import TiposDeServicio from "../../components/Agenda/Servicios/Barbero/TiposDeServicio";
import useTipoServicio from "../../hooks/useTipoServicio";
import Modal from "../../components/Agenda/Modals/Modal";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";
import EditTipoServicioModal from "../../components/Agenda/Modals/EditTipoServicioModal";
import succesIcon from "../../assets/img/icons/success.png";
import DangerIcon from "../../assets/img/icons/danger__advice.png";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoAdministrarTiposServicios() {
  const [nombre, setNombre] = useState("");
  const [tipoServicioToDelete, setTipoServicioToDelete] = useState();
  const [tipoServicioToEdit, setTipoServicioToEdit] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const {
    getTiposServicios,
    createTipoServicio,
    deleteTipoServicio,
    editTipoServicio,
    tiposServicios,
  } = useTipoServicio();

  useEffect(() => {
    setIsLoading(true);
    const obtenerTiposServicios = async () => {
      try {
        await getTiposServicios();
      } catch (error) {
        console.error("Error al obtener los tipos de servicio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    obtenerTiposServicios();
  }, []);

  const handleDeleteTipoServicio = (tipoServicio) => {
    setTipoServicioToDelete(tipoServicio);
    setShowDeleteModal(true);
  };

  const handleEditTipoServicio = (tipoServicio) => {
    setTipoServicioToEdit(tipoServicio);
    setShowEditModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(!showDeleteModal);
    setIsLoadingAction(true);
    try {
      await deleteTipoServicio(tipoServicioToDelete._id);
    } catch (error) {
      setShowFailedModal(!showFailedModal);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleSubmitEdit = async (e, tipoServicioEdit) => {
    setIsLoadingAction(true);
    e.preventDefault();
    try {
      await editTipoServicio(tipoServicioEdit);
      setShowEditModal(!showEditModal);
    } catch (error) {
      setShowFailedModal(!showFailedModal);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoadingAction(true);
    e.preventDefault();
    try {
      await createTipoServicio(nombre);
      setNombre("");
      setShowSuccessModal(true);
    } catch (error) {
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
    }
  };

  if (isLoading) return <MainLoader />;

  return (
    <div className=" flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}
      <Header
        link={"barbero/administrar"}
        title={"Administrar Tipos de Servicios"}
      />

      <Reveal className="flex flex-col gap-16">
        <form
          className="flex flex-col justify-center gap-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label>Nombre del Tipo de Servicio:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
        {tiposServicios && (
          <TiposDeServicio
            tiposServicios={tiposServicios}
            handleDeleteTipoServicio={handleDeleteTipoServicio}
            handleEditTipoServicio={handleEditTipoServicio}
          />
        )}
      </Reveal>

      {showSuccessModal && (
        <Modal
          source={succesIcon}
          alt={"success icon"}
          title="Tipo de Servicio creado satisfactoriamente"
          message="El tipo de servicio se agregó correctamente, ya puedes agregar uno nuevo"
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
          Titulo={`¿Estás seguro de eliminar el tipo de servicio ${tipoServicioToDelete.nombre}?`}
          descripcion={
            "Esta acción no se podrá deshacer y eliminará para siempre este tipo de servicio."
          }
          setShowModal={() => setShowDeleteModal(!showDeleteModal)}
          confirmDelete={handleConfirmDelete}
        />
      )}

      {showEditModal && (
        <EditTipoServicioModal
          tipoServicioToEdit={tipoServicioToEdit}
          setShowModal={() => setShowEditModal(!showEditModal)}
          handleSubmitEdit={handleSubmitEdit}
        />
      )}
    </div>
  );
}

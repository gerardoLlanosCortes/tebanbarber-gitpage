import React, { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";

import Modal from "../../components/Agenda/Modals/Modal";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";
import EditTipoServicioModal from "../../components/Agenda/Modals/EditTipoServicioModal";
import succesIcon from "../../assets/img/icons/success.png";
import DangerIcon from "../../assets/img/icons/danger__advice.png";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";

import useAviso from "../../hooks/useAviso";

import Aviso from "../../components/Agenda/Avisos/Aviso";
import EditAvisoModal from "../../components/Agenda/Modals/EditAvisoModal";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoAdministrarAviso() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [avisoToDelete, setAvisoToDelete] = useState({});
  const [avisoToEdit, setAvisoToEdit] = useState({});

  const {
    avisos,
    getAvisos,
    createAviso,
    deleteAviso,
    changeAvisoStatus,
    updateAviso,
  } = useAviso();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        await getAvisos();
      } catch (error) {
        console.log("error al obtener los avisos", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleStatusChange = async (id) => {
    try {
      await changeAvisoStatus(id);
    } catch (error) {
      setShowFailedModal(true);
      console.log("error al cambiar el estado", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);
    try {
      await createAviso({ titulo, contenido });
      setTitulo("");
      setContenido("");
      setShowSuccessModal(true);
    } catch (error) {
      setShowFailedModal(true);
      console.log("error al crear el aviso", error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleDeleteModal = (aviso) => {
    setAvisoToDelete(aviso);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAviso(avisoToDelete._id);
      setShowDeleteModal(false);
    } catch (error) {
      setShowFailedModal(true);
      console.log("error al eliminar el aviso", error);
    }
  };

  const handleEditModal = (aviso) => {
    setAvisoToEdit(aviso);
    setShowEditModal(true);
  };

  const handleSubmitEdit = async (e, id, data) => {
    e.preventDefault();
    setIsLoadingAction(true);
    try {
      await updateAviso(id, data);
    } catch (error) {
      console.log("error al editar el aviso");
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
      setShowEditModal(false);
    }
  };

  if (isLoading) return <MainLoader />;
  return (
    <div className="flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}
      <Header link={"barbero/administrar"} title={"Administrar Avisos"} />

      <Reveal className="flex flex-col gap-16">
        <form
          className="flex flex-col justify-center gap-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label>Título del aviso:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              name="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contenido del aviso:</label>
            <textarea
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              className="w-full bg-agenda-primary text-white p-4 text-center rounded-lg border-none outline-none shadow-btn-agenda "
              type="submit"
            >
              Crear Aviso
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-1">
          {avisos?.map((aviso) => (
            <Aviso
              key={aviso._id}
              aviso={aviso}
              handleStatusChange={handleStatusChange}
              handleDeleteModal={handleDeleteModal}
              handleEditModal={handleEditModal}
            />
          ))}
        </div>
      </Reveal>

      {showSuccessModal && (
        <Modal
          source={succesIcon}
          alt={"success icon"}
          title="Aviso creado satisfactoriamente"
          message="El aviso se agregó correctamente, ya puedes agregar uno nuevo"
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
          Titulo={`¿Estás seguro de eliminar el aviso ${avisoToDelete.titulo}?`}
          descripcion={
            "Esta acción no se podrá deshacer y eliminará para siempre el aviso."
          }
          setShowModal={() => setShowDeleteModal(!showDeleteModal)}
          confirmDelete={handleConfirmDelete}
        />
      )}

      {showEditModal && (
        <EditAvisoModal
          avisoToEdit={avisoToEdit}
          setShowModal={() => setShowEditModal(!showEditModal)}
          handleSubmitEdit={handleSubmitEdit}
        />
      )}
    </div>
  );
}

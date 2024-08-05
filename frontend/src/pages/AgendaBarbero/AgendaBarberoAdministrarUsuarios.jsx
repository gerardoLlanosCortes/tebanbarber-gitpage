import { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import Switch from "react-switch";
import useUsuarios from "../../hooks/useUsuarios";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import editIcon from "../../assets/img/icons/pencil-outline.svg";
import deleteTrashIcon from "../../assets/img/icons/delete__trash.svg";
import DangerIcon from "../../assets/img/icons/danger__advice.png";
import succesIcon from "../../assets/img/icons/success.png";

import EditUsuarioModal from "../../components/Agenda/Modals/EditUsuarioModal";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Modal from "../../components/Agenda/Modals/Modal";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoAdministrarUsuarios() {
  const { usersInfo, getUsersInfo, changeStatus, deleteUser } = useUsuarios();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [userToDelete, setUserToDelete] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        await getUsersInfo();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [getUsersInfo]);

  const handleStatusChange = async (userInfo) => {
    try {
      //SI TODO SALE BIEN ENTONCES SE CAMBIA EN EL USUARIO
      await changeStatus(userInfo._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModal = (userInfoToEdit) => {
    setUserToEdit(userInfoToEdit);
    setShowEditModal(!showEditModal);
  };

  const handleDeleteModal = (userInfoToDelete) => {
    setUserToDelete(userInfoToDelete);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleConfirmDelete = async () => {
    setIsLoadingAction(true);
    try {
      await deleteUser(userToDelete._id);
    } catch (error) {
      console.log(error);
      setShowFailedModal(true);
    } finally {
      setIsLoadingAction(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) return <MainLoader />;

  return (
    <div className="flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}
      <Header link={"barbero/administrar"} title={"Administrar Usuarios"} />

      <Reveal className="flex flex-col gap-3">
        <h5 className="font-semibold">Administra todos los usuarios</h5>
        <div className="flex flex-col gap-1">
          {usersInfo?.map((userInfo) => (
            <div
              className="flex justify-between gap-2 mt-4 p-6 rounded-lg border border-agenda-primary border-opacity-40 text-agenda-primary w-full"
              key={userInfo._id}
            >
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-semibold break-words">
                  {userInfo.nombre}
                </h1>
                <p className="text-sm text-gray-600 break-words">
                  {userInfo.email}
                </p>
                <p className="text-sm break-words">
                  Servicios: {userInfo.servicios.length}
                </p>
                <p className="text-sm break-words">
                  Estado:{" "}
                  <span
                    className={` ${
                      userInfo.activo ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {userInfo.activo ? "Activo" : "Inactivo"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Switch
                  onChange={() => handleStatusChange(userInfo)}
                  checked={userInfo.activo}
                  onColor="#324b4c"
                  height={18}
                  width={36}
                />
                <a onClick={() => handleEditModal(userInfo)}>
                  <img src={editIcon} width={"30px"} alt="edit icon" />
                </a>
                <a onClick={() => handleDeleteModal(userInfo)}>
                  <img src={deleteTrashIcon} width={"30px"} alt="delete icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {showEditModal && (
        <EditUsuarioModal
          usuarioToEdit={userToEdit}
          setShowModal={setShowEditModal}
          setIsLoadingAction={setIsLoadingAction}
          setShowFailedModal={setShowFailedModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          icono={DangerIcon}
          Titulo={`¿Estás seguro de eliminar al barbero ${userToDelete.nombre}?`}
          descripcion={
            "Esta acción no se podrá deshacer y eliminará para siempre este usuario."
          }
          setShowModal={() => setShowDeleteModal(!showDeleteModal)}
          confirmDelete={handleConfirmDelete}
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
    </div>
  );
}

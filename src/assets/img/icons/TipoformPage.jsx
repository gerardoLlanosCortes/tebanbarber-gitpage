import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTiposServicio } from "../../context/tipoServicioContext";
import "../../css/serviciosFormPage.css";
import deleteTrashIcon from "../../assets/img/icons/delete__trash.svg";
import editIcon from "../../assets/img/icons/packBarbero/pencil-outline.svg";
import dangerIcon from "../../assets/img/icons/danger__advice.png";
import { ClipLoader } from "react-spinners";
import Modal from "../../components/Modal";
import successIcon from "../../assets/img/icons/success.png";
import { Link } from "react-router-dom";
import MainLoader from "../../../components/Agenda/Loaders/MainLoader";

function TipoServicioFormPage() {
  const {
    register: registerNew,
    handleSubmit: handleSubmitNew,
    reset: resetNew,
    setValue: setValueNew,
    formState: { errors: errorsNew },
  } = useForm();

  const {
    tiposServicio,
    createTipoServicio,
    getTiposServicio,
    deleteTipoServicio,
    updateTipoServicio,
  } = useTiposServicio();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tipoServicioToDelete, setTipoServicioToDelete] = useState(null);
  const [tipoServicioToEdit, setTipoServicioToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const onSubmit = handleSubmitNew(async (data) => {
    setIsLoadingAction(true);
    try {
      await createTipoServicio(data);
      await getTiposServicio();
      setShowSuccessModal(true);
      setIsLoadingAction(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAction(false);
      setShowFailedModal(true);
    }
    resetNew();
  });

  const handleDeleteTipoServicio = (tipoServicio) => {
    setTipoServicioToDelete(tipoServicio);
    setShowModal(true);
  };

  const handleEditTipoServicio = (tipoServicio) => {
    setTipoServicioToEdit(tipoServicio);
    setShowEditModal(true);

    setValueNew("nombre", tipoServicio.nombre);
  };

  const confirmDelete = async () => {
    setShowModal(false);
    setIsLoadingAction(true);
    if (tipoServicioToDelete) {
      try {
        await deleteTipoServicio(tipoServicioToDelete._id);
        await getTiposServicio();
        setTipoServicioToDelete(null);
      } catch (error) {
        console.error("Error al eliminar el tipo de servicio:", error);
        setShowFailedModal(true);
      } finally {
        setIsLoadingAction(false);
      }
    }
  };

  const confirmEdit = async (data) => {
    if (tipoServicioToEdit && tipoServicioToEdit._id) {
      setShowEditModal(false);
      setIsLoadingAction(true);
      try {
        await updateTipoServicio(tipoServicioToEdit._id, data);
        await getTiposServicio();
        setShowEditModal(false);
        setTipoServicioToEdit(null);
        setIsLoadingAction(false);
      } catch (error) {
        console.error("Error al editar el tipo de servicio:", error);
        setIsLoadingAction(false);
        setTipoServicioToEdit(null);
        setShowFailedModal(true);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTiposServicio();
      } catch (error) {
        console.error("Error al obtener tipos de servicio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseFailedModal = () => {
    setShowFailedModal(false);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <>
      {isLoadingAction && (
        <div className="loader-spinner-overlay">
          <div className="loader-spinner">
            <ClipLoader color="#324b4c" />
          </div>
        </div>
      )}
      <div className="servicies__form__container">
        <Link to={"/barbero"} className="services__form__title__container">
          <h2 className="services__form__title">
            <span>{"<"}</span> Gestionar Tipos de Servicio
          </h2>
        </Link>

        <form className="services__form" onSubmit={handleSubmitNew(onSubmit)}>
          <div>
            <label>Nombre del Tipo de Servicio:</label>
            <input type="text" {...registerNew("nombre")} />
          </div>
          <div className="service__form__btn__container">
            <button type="submit" className="service__form__cta">
              Agregar Tipo de Servicio
            </button>
          </div>
        </form>

        <div className="sevices__section__main__container">
          <h2 className="services__section__title">Tipos de Servicio</h2>
          <div className="services__section__container">
            {tiposServicio.map((tipoServicio) => (
              <div
                className="service__section__container"
                key={tipoServicio._id}
                id={tipoServicio._id}
              >
                <div className="service__section__left">
                  <h1 className="service__section__title">
                    {tipoServicio.nombre}
                  </h1>
                </div>
                <div className="service__section__right">
                  <a
                    className="service__section__delete__cta"
                    onClick={() => handleDeleteTipoServicio(tipoServicio)}
                  >
                    <img
                      src={deleteTrashIcon}
                      width={"30px"}
                      alt="icono eliminar"
                    />
                  </a>
                  <a
                    className="service__section__edit__cta"
                    onClick={() => handleEditTipoServicio(tipoServicio)}
                  >
                    <img src={editIcon} width={"30px"} alt="icono editar" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showSuccessModal && (
          <Modal
            source={successIcon}
            title="Tipo de Servicio creado satisfactoriamente"
            message="El tipo de servicio se agregó correctamente, ya puedes agregar uno nuevo"
            onClose={handleCloseSuccessModal}
            btnContent={"Volver"}
          />
        )}

        {showFailedModal && (
          <Modal
            source={dangerIcon}
            title="¡Error!"
            message="Se ha producido un error al ejecutar esta acción. Por favor, inténtelo de nuevo."
            onClose={handleCloseFailedModal}
            btnContent={"Volver"}
          />
        )}

        {showModal && (
          <div className="fecha__modal__overlay">
            <div className="fecha__modal__container">
              <img src={dangerIcon} alt="icono advertencia" />
              <h2>
                ¿Estás seguro de eliminar el tipo de servicio{" "}
                {tipoServicioToDelete.nombre}?
              </h2>
              <div className="fecha__modal__content">
                <p>
                  Esta acción no se podrá deshacer y eliminará para siempre el
                  tipo de servicio.
                </p>
              </div>

              <div className="fecha__modal__ctas">
                <button
                  className="fecha__modal__cta fecha__modal__cta--cancel"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="fecha__modal__cta fecha__modal__cta--confirm"
                  onClick={() => confirmDelete()}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditModal && tipoServicioToEdit && (
          <div className="fecha__modal__overlay">
            <div className="fecha__modal__container">
              <h2>Editar Tipo de Servicio: {tipoServicioToEdit.nombre}</h2>
              <form
                className="services__modal__form"
                onSubmit={handleSubmitNew(confirmEdit)}
              >
                <div className="service__modal__container">
                  <label>Nombre del Tipo de Servicio:</label>
                  <input
                    defaultValue={tipoServicioToEdit.nombre}
                    type="text"
                    {...registerNew("nombre", { required: true })}
                  />
                  {errorsNew.nombre && (
                    <p className="error-message">Este campo es obligatorio.</p>
                  )}
                </div>
                <div className="fecha__modal__ctas">
                  <button
                    className="fecha__modal__cta fecha__modal__cta--cancel"
                    onClick={() => {
                      setShowEditModal(false);
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="fecha__modal__cta fecha__modal__cta--confirm"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TipoServicioFormPage;

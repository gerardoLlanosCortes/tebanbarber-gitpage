import Header from "../../components/Agenda/Navigation/Header";
import WorldIcon from "../../assets/img/icons/world.svg";
import CopyIcon from "../../assets/img/icons/copy.svg";
import { useEffect, useState } from "react";
import useAccesos from "../../hooks/useAccesos";
import Error from "../../components/Agenda/Ui/Error";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import "animate.css";
import succesIcon from "../../assets/img/icons/success.png";
import DangerIcon from "../../assets/img/icons/danger__advice.png";
import Modal from "../../components/Agenda/Modals/Modal";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoAdministrarAcceso() {
  const registerLink = "http://localhost:5173/registro";
  const { getAccesos, accesos, createAcceso, deleteAcceso } = useAccesos();
  const [copyMsg, setCopyMsg] = useState("");
  const [animationClass, setAnimationClass] = useState("");
  const [error, setError] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [accesoToDelete, setAccesoToDelete] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        await getAccesos();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(registerLink)
      .then(() => {
        setCopyMsg("✅ Enlace copiado!");
        setAnimationClass("animate__fadeIn");
        setTimeout(() => {
          setAnimationClass("animate__fadeOut");
          setTimeout(() => {
            setCopyMsg("");
          }, 400); // El tiempo de duración de la animación de salida debe coincidir con el de animate__fadeOut
        }, 4000); // Muestra el mensaje durante 4 segundos antes de empezar la animación de salida
      })
      .catch((err) => {
        setCopyMsg("Error al copiar el enlace");
      });
  };

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, rol].includes("")) {
      setError("Todos los datos son obligatorios");
      return;
    }
    setIsLoadingAction(true);
    try {
      await createAcceso({ email, rol });
      setError("");
      setEmail("");
      setRol("");
      setShowSuccessModal(true);
    } catch (error) {
      setShowFailedModal(true);
      console.log(error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleDeleteModal = (accesso) => {
    setAccesoToDelete(accesso);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteAcceso = async () => {
    setIsLoadingAction(true);
    try {
      await deleteAcceso(accesoToDelete._id);
      console.log("eliminado");
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(!showDeleteModal);
      setIsLoadingAction(false);
    }
  };

  {
    if (isLoading) return <MainLoader />;
  }

  return (
    <div className="flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}

      <Header link={"barbero/administrar"} title={"Administrar Acceso"} />
      <Reveal className="flex flex-col gap-2">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="bg-slate-100 p-3 flex gap-2 rounded-lg">
              <div className="p-2 bg-white rounded-lg w-fit h-fit">
                <img src={WorldIcon} alt="world icon" width={50} height={50} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold">Compartir Acceso</h5>
                <p className="text-sm opacity-80">
                  Agrega un correo para permitir que cree una cuenta
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-sm">{registerLink}</p>
              <div className="w-fit h-fit" onClick={handleCopy}>
                <img src={CopyIcon} alt="copy icon" height={20} width={20} />
              </div>
            </div>
            <span
              className={`text-sm text-green-600 animate__animated ${animationClass}`}
            >
              {copyMsg}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <h5 className="text-lg font-semibold">Agregar Correo</h5>
            </div>
            <div className="flex flex-col gap-5">
              <form
                className="flex flex-col justify-center border rounded-lg p-3 gap-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col">
                  <label>Email:</label>
                  <input
                    className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] w-full text-base bg-transparent"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label>Tipo de Usuario:</label>
                  <select
                    className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-[40px] w-full bg-transparent"
                    name="rol"
                    value={rol}
                    onChange={(e) => handleInputChange(e, setRol)}
                  >
                    <option value={""}>-- Seleccionar opción --</option>
                    <option value={"admin"}>Administrador</option>
                    <option value={"barbero"}>Barbero</option>
                  </select>
                </div>
                {error && <Error msg={error} />}
                <button
                  className="bg-agenda-primary text-white rounded-lg w-full p-2"
                  type="submit"
                >
                  Añadir
                </button>
              </form>

              <div>
                <h5 className="text-lg font-semibold">Permisos</h5>
                <div className="flex flex-col gap-3">
                  {accesos?.map((acceso) => (
                    <div
                      className="flex flex-col gap-2 border p-3 justify-between rounded-lg"
                      key={acceso._id}
                    >
                      <p className="break-words">{acceso.email}</p>
                      <span className="text-sm">
                        {acceso.rol === "admin" ? "Adminstrador" : "Barbero"}
                      </span>
                      <div
                        className="self-end text-red-600 font-semibold text-sm"
                        onClick={() => handleDeleteModal(acceso)}
                      >
                        Eliminar
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {showSuccessModal && (
        <Modal
          source={succesIcon}
          alt={"success icon"}
          title="Correo creado satisfactoriamente"
          message="El correo se agregó correctamente, ya se puede crear una cuenta con ese correo"
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
          Titulo={`¿Estás seguro de eliminar el correo `}
          extra={`${accesoToDelete.email}?`}
          descripcion={
            "Esta acción no se podrá deshacer, eliminará para siempre este correo y no se podrá crear una cuenta con el mismo."
          }
          setShowModal={() => setShowDeleteModal(!showDeleteModal)}
          confirmDelete={handleDeleteAcceso}
        />
      )}
    </div>
  );
}

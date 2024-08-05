import { useEffect, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import useAuth from "../../hooks/useAuth";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import Error from "../../components/Agenda/Ui/Error";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";

export default function AgendaBarberoRestablecerPassword() {
  // tODO: MANEJAR LA EXPIRACION DEL TOKEN
  const { resetPassword, sendResetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("uid");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    if (!password || !password2) {
      console.log("Debes llenar todos los campos");
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== password2) {
      console.log("Las contraseñas no coinciden");
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setIsLoadingAction(true);
      await sendResetPassword(id, token, password, password2);
      console.log("contraseña cambiada");
    } catch (error) {
      setError(
        "Hubo un error al cambiar la contraseña, prueba nuevamente o vuelve a pedir el cambio de contraseña"
      );
      console.log(error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await resetPassword(id, token);
        setEmail(res.email);
      } catch (error) {
        console.log("Token expirado");
        console.log(error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="w-mobile mx-auto flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}
      <Header link={"login"} title={"Restablecer Contraseña"} />

      <div className="flex flex-col gap-12">
        <h5 className="font-semibold">
          Ingresa tu nueva contraseña para{" "}
          <span className="break-words">{email}</span>
        </h5>
        <form onSubmit={handleSubmit} className="agenda__contact__form">
          <div className="container__input">
            <div className="items">
              <input
                id="input-text"
                type="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              <span
                className={`placeholder placeholder__movement  ${
                  password ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Ingresar Contraseña
              </span>
            </div>
          </div>
          <div className="container__input">
            <div className="items">
              <input
                id="input-text"
                type="password"
                value={password2}
                onChange={(e) => handleInputChange(e, setPassword2)}
              />
              <span
                className={`placeholder placeholder__movement  ${
                  password2 ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Repetir Contraseña
              </span>
            </div>
          </div>
          {error && <Error msg={error} />}

          <button
            type="submit"
            className="fixed bottom-0 w-mobile lg:w-[800px] p-4 text-center cursor-pointer my-0 mx-auto mb-5 shadow-btn-agenda rounded-lg outline-none border-none bg-agenda-primary text-white "
          >
            Restablecer Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

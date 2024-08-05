import { useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import useAuth from "../../hooks/useAuth";
import { changePasswordCorreo } from "../../utils";
import useCorreos from "../../hooks/useCorreos";
import Error from "../../components/Agenda/Ui/Error";

export default function AgendaBarberoOlvidePassword() {
  const { forgotPassword } = useAuth();
  const { createCorreo } = useCorreos();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const sendEmail = async (info) => {
    const data = changePasswordCorreo(info);
    try {
      await createCorreo(data);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      console.log("Debes ingresar tu correo");
      setError("Debes ingresar tu correo");
      return;
    }

    try {
      setIsLoadingAction(true);
      const res = await forgotPassword(email);
      try {
        await sendEmail({ email, link: res.link });
        setIsLoadingAction(false);
      } catch (error) {
        setIsLoadingAction(false);
        console.log(error);
        setError("Error al enviar el correo, intenta nuevamente");
      }
    } catch (error) {
      setIsLoadingAction(false);
      console.log(error);
      setError("Hubo un error, vuelve a intentarlo nuevamente");
    }
  };

  return (
    <div className="w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative">
      {/* {isLoading && <ActionLoader />} */}
      <Header link={"login"} title={"Olvidé mi contraseña"} />

      <div className="flex flex-col gap-12">
        <h5 className="font-semibold">Recupera tu cuenta</h5>
        <form onSubmit={handleSubmit} className="agenda__contact__form">
          <div className="container__input">
            <div className="items">
              <input
                id="input-text"
                type="text"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
              <span
                className={`placeholder placeholder__movement  ${
                  email ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Ingresar correo
              </span>
            </div>
          </div>
          {error && <Error msg={error} />}

          <button
            type="submit"
            className="w-full  p-4 text-center cursor-pointer my-0 rounded-lg  bg-agenda-primary text-white "
          >
            Recuperar Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

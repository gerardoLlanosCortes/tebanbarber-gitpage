import React, { useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import useAuth from "../../hooks/useAuth";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Error from "../../components/Agenda/Ui/Error";
import { Link } from "react-router-dom";

export default function AgendaBarberoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { iniciarSesion } = useAuth();

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if ([email, password].includes("")) {
      setError("Todos los datos son obligatorios");
      return;
    }

    setIsLoading(true);

    try {
      await iniciarSesion(email, password);
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative">
      {isLoading && <ActionLoader />}
      <Header link={""} title={"Iniciar sesión"} />

      <div className="flex flex-col gap-12">
        <h5 className="font-semibold">Ingresa tus datos</h5>
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

          <div className="container__input">
            <div className="items">
              <input
                id="input-email"
                type="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              <span
                className={`placeholder placeholder__movement ${
                  password ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Ingresar contraseña
              </span>
            </div>
          </div>

          <Link
            className="text-sm text-center text-agenda-primary mx-auto underline"
            to={"/olvidar-contraseña"}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          {error && <Error msg={error} />}
          <button
            type="submit"
            className="w-full  p-4 text-center cursor-pointer my-0 rounded-lg  bg-agenda-primary text-white "
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

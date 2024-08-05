import React, { useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import useAuth from "../../hooks/useAuth";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import Error from "../../components/Agenda/Ui/Error";
import useAccesos from "../../hooks/useAccesos";
import { Link } from "react-router-dom";

export default function AgendaBarberoRegister() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noError, setNoError] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const { getAccesoByEmail, deleteAcceso } = useAccesos();

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar campos obligatorios
    if ([email, password].includes("")) {
      setError("Todos los datos son obligatorios");
      return;
    }

    // Validar coincidencia de contraseñas
    if (password !== secondPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      // Intentar obtener acceso por email
      const res = await getAccesoByEmail(email);
      if (!(res.length > 0)) {
        setError("El correo no tiene permisos para crear una cuenta");
        return;
      }

      // // Intentar registrar el usuario
      try {
        await signUp({ nombre, email, password, rol: res[0].rol });
        await deleteAcceso(res[0]._id);
        // Limpiar campos del formulario
        setNombre("");
        setEmail("");
        setPassword("");
        setSecondPassword("");
        setError("");
        setNoError(true);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.msg || "Error al registrar el usuario");
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.msg ||
          "Error al obtener los accesos, recargue la página"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-mobile lg:w-dekstop mx-auto flex flex-col pb-32 text-agenda-black relative">
      {isLoading && <ActionLoader />}
      <Header link={""} title={"Registrate"} />

      <div className="flex flex-col gap-12">
        <h5 className="font-semibold">Ingresa los datos de registro</h5>
        <form onSubmit={handleSubmit} className="agenda__contact__form">
          <div className="container__input">
            <div className="items">
              <input
                id="input-text"
                type="text"
                value={nombre}
                onChange={(e) => handleInputChange(e, setNombre)}
              />
              <span
                className={`placeholder placeholder__movement  ${
                  email ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Ingresar Nombre
              </span>
            </div>
          </div>
          <div className="container__input">
            <div className="items">
              <input
                id="input-email"
                type="email"
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
                id="input-password"
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
          <div className="container__input">
            <div className="items">
              <input
                id="input-secondPassword"
                type="password"
                value={secondPassword}
                onChange={(e) => handleInputChange(e, setSecondPassword)}
              />
              <span
                className={`placeholder placeholder__movement ${
                  password ? "active" : "" // Agrega la clase "active" si hay algo escrito
                }`}
              >
                Repetir Contraseña
              </span>
            </div>
          </div>
          <Link
            className="text-sm text-center text-agenda-primary mx-auto underline"
            to={"/login"}
          >
            ¿Ya create tu cuenta? Inicia sesión aquí
          </Link>
          {error && <Error msg={error} />}
          {noError && (
            <div className="text-green-600">Usuario creado correctamente</div>
          )}

          <button
            type="submit"
            className="w-full  p-4 text-center cursor-pointer my-0 rounded-lg  bg-agenda-primary text-white "
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

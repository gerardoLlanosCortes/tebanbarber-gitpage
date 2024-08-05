import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/perfil`,
          config
        );
        setAuth(data);
      } catch (error) {
        console.log(error);
        setAuth({});
      } finally {
        setCargando(false);
      }
    };
    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
    localStorage.removeItem("nombre");
    localStorage.removeItem("email");
    localStorage.removeItem("activo");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const iniciarSesion = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("email", data.email);
      localStorage.setItem("activo", data.activo);
      localStorage.setItem("accessToken", data.token.accessToken);
      localStorage.setItem("refreshToken", data.token.refreshToken);
      setAuth(data);
      navigate("/barbero");
    } catch (error) {
      // setAlerta({
      //   msg: error.response.data.error,
      //   error: true,
      // });
      throw error;
    }
  };

  const signUp = async (user) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth`, user);
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          email,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (id, token) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/${id}/${token}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const sendResetPassword = async (id, token, password, password2) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/${id}/${token}`,
        { password, password2 }
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        iniciarSesion,
        auth,
        cerrarSesionAuth,
        cargando,
        signUp,
        forgotPassword,
        resetPassword,
        sendResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

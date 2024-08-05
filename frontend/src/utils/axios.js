import axios from "axios";

const axiosWithAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Obtén la URL de la API de las variables de entorno
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            refreshToken,
          }
        );

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return axiosWithAuth(originalRequest);
      } catch (refreshError) {
        // Maneja el error de renovación de tokens
        // Puedes redirigir a la página de inicio de sesión o hacer otras acciones aquí
        console.error("Error al renovar los tokens:", refreshError);
        // Lanza el error para que pueda ser manejado por la función que hizo la solicitud originalmente
        throw refreshError;
      }
    }

    // Si no es un error de token expirado o no se puede renovar el token, simplemente devuelve el error original
    return Promise.reject(error);
  }
);

export default axiosWithAuth;

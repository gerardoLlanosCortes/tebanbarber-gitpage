import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AgendaBarberoRutaProtegidaAdmin() {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";

  return (
    <>{auth?.rol === "admin" ? <Outlet /> : <Navigate to={"/barbero"} />}</>
  );
}

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AgendaBarberoRutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";

  return (
    <div className="w-mobile lg:w-dekstop mx-auto">
      {auth?._id ? <Outlet /> : <Navigate to={"/login"} />}
    </div>
  );
}

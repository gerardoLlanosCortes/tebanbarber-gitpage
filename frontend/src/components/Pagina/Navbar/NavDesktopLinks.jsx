import { Link } from "react-router-dom";

export default function NavDesktopLinks() {
  return (
    <li className="uppercase">
      <Link
        to="/"
        className="py-7 px-3 inline-block underline-offset-8 hover:underline"
      >
        Inicio
      </Link>
      <Link
        to="/agenda"
        className="py-7 px-3 inline-block underline-offset-8 hover:underline"
      >
        Agenda
      </Link>

      <Link
        to="/servicios"
        className="py-7 px-3 inline-block underline-offset-8 hover:underline"
      >
        Servicios
      </Link>
      <Link
        to="/galeria"
        className="py-7 px-3 inline-block underline-offset-8 hover:underline"
      >
        Galería
      </Link>
      <Link
        to="/ubicacion"
        className="py-7 px-3 inline-block underline-offset-8 hover:underline"
      >
        Ubicación
      </Link>
      <Link
        to="/tienda"
        className="py-7 px-3 inline-block underline-offset-8 hover:underline"
      >
        Tienda
      </Link>
    </li>
  );
}

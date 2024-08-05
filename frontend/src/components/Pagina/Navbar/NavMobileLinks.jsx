import { Link } from "react-router-dom";

export default function NavMobileLinks() {
  return (
    <li className="w-mobile mx-auto flex flex-col text-xl">
      <Link to="/" className="inline-block hover:bg-gray-100 py-7 rounded">
        Inicio
      </Link>
      <Link
        to="/agenda"
        className="inline-block hover:bg-gray-100 py-7 rounded"
      >
        Agenda
      </Link>
      <Link
        to="/servicios"
        className="inline-block hover:bg-gray-100 py-7 rounded"
      >
        Servicios
      </Link>
      <Link
        to="/galeria"
        className="inline-block hover:bg-gray-100 py-7 rounded"
      >
        Galería
      </Link>
      <Link
        to="/ubicacion"
        className="inline-block hover:bg-gray-100 py-7 rounded"
      >
        Ubicación
      </Link>
      <Link
        to="/tienda"
        className=" inline-block hover:bg-gray-100 py-7 rounded"
      >
        Tienda
      </Link>
    </li>
  );
}

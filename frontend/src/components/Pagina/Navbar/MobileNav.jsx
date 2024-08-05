import { Link } from "react-router-dom";

export default function MobileNav() {
  return (
    <ul
      className={`
  md:hidden bg-agenda-bg-color fixed w-full top-0 overflow-y-auto bottom-0 mt-[120px] 
  duration-200 ${open ? "left-0" : "left-[-100%]"} z-50
  `}
    >
      <li className="w-mobile mx-auto flex flex-col text-xl">
        <Link to="/web" className="inline-block hover:bg-gray-100 py-7 rounded">
          Inicio
        </Link>

        <Link
          to="/web/servicios"
          className="inline-block hover:bg-gray-100 py-7 rounded"
        >
          Servicios
        </Link>
        <Link
          to="/web/galeria"
          className="inline-block hover:bg-gray-100 py-7 rounded"
        >
          Galería
        </Link>
        <Link
          to="/web/ubicacion"
          className="inline-block hover:bg-gray-100 py-7 rounded"
        >
          Ubicación
        </Link>
        <Link
          to="/web/tienda"
          className=" inline-block hover:bg-gray-100 py-7 rounded"
        >
          Tienda
        </Link>
      </li>
    </ul>
  );
}

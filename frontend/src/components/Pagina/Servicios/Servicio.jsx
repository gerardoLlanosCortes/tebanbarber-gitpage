import Tijera from "../../../assets/img/icons/tijera_servicios.png";
import { formatearPrecio } from "../../../utils";

export default function Servicio({ servicio }) {
  return (
    <>
      <picture>
        <img
          className="w-[60px] lg:w-[80px] -mb-3"
          src={Tijera}
          alt="icono tijeras"
        />
      </picture>
      <div className="flex flex-col gap-2 ">
        <h3 className="font-semibold text-lg text-balance">
          {servicio.servicio}
        </h3>
        <span className="font-bold text-xl">
          {formatearPrecio(servicio.precio)}
        </span>
        <p className="text-pretty text-sm">{servicio.descripcion}</p>
      </div>
    </>
  );
}

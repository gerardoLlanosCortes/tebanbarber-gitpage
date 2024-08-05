import Tijera from "../../../assets/img/icons/tijera_servicios.png";
import { formatearPrecio } from "../../../utils";
import Reveal from "../../../utils/Reveal";

export default function Servicio({ servicio }) {
  return (
    <Reveal className={"col-span-4 lg:col-span-2 flex"}>
      <div className="flex-shrink-0 w-[100px] h-[100px]">
        <img className="w-full h-full" src={Tijera} alt="icono tijeras" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg">{servicio.servicio}</h3>
        <span className="font-bold text-xl">
          {formatearPrecio(servicio.precio)}
        </span>
      </div>
    </Reveal>
  );
}

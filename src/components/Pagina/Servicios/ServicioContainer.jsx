import Servicio from "./Servicio";
import Reveal from "../../../utils/Reveal";

export default function ServicioContainer({ servicio }) {
  return (
    <Reveal className="flex flex-col col-span-6 lg:col-span-2 w-full h-auto ">
      <div className="flex flex-col w-full border border-agenda-primary border-opacity-30 rounded p-6 flex-grow">
        <Servicio servicio={servicio} />
      </div>
    </Reveal>
  );
}

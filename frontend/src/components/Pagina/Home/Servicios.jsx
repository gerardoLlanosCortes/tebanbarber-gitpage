import Bigote from "../../../assets/img/icons/bigote_no_optimizado.png";
import BgNavaja from "../../../assets/img/pagina/bg_navaja.png";
import BgTijera from "../../../assets/img/pagina/bg_tijera.png";
import Servicio from "./Servicio";
import BtnWebHome from "../Ui/BtnWebHome";
import Barber from "../../../assets/img/pagina/barber_2.png";
import Reveal from "../../../utils/Reveal";

export default function Servicios({ servicios }) {
  return (
    <Reveal className={" pb-32 relative"}>
      <div className="absolute top-0 right-0 -mr-40 -mt-36 opacity-80 -z-10">
        <img className="w-[400px]" src={BgTijera} alt="background tijera" />
      </div>

      <section className="flex flex-col gap-6 lg:gap-10 w-full z-10">
        <Reveal className={"flex flex-col gap-2 items-center"}>
          <h2 className="mx-4 text-2xl font-bold uppercase text-center text-balance">
            Servicios
          </h2>
          <div className="flex items-center w-full">
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
            <img src={Bigote} alt="icono bigotes" width={50} />
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
          </div>
        </Reveal>
        <div className="flex gap-6 relative items-center">
          <Reveal className={"w-full hidden lg:block"}>
            <img
              className="w-full"
              src={Barber}
              alt="imagen barberia tebanbarber"
            />
          </Reveal>

          {/* Todo: Arreglar navaja para que se vea en desktop */}
          <Reveal className="absolute -bottom-28 -left-28 lg:left-[400px]  -z-10 ">
            <img className="w-[400px]" src={BgNavaja} alt="background navaja" />
          </Reveal>

          <div className="grid grid-cols-4 gap-5 relative">
            {servicios.slice(0, 6).map((servicio) => (
              <Servicio key={servicio._id} servicio={servicio} />
            ))}
          </div>
        </div>

        <Reveal delay={0}>
          <BtnWebHome text={"Ver Todos Los Servicios"} link={"/servicios"} />
        </Reveal>
      </section>
    </Reveal>
  );
}

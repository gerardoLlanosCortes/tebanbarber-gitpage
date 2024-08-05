import BgNavaja from "../../assets/img/pagina/bg_navaja.png";
import BgTijera from "../../assets/img/pagina/bg_tijera.png";
import BtnWebHome from "../../components/Pagina/Ui/BtnWebHome";
import Reveal from "../../utils/Reveal";
import ServicioContainer from "../../components/Pagina/Servicios/ServicioContainer";
import PageHeader from "../../components/PageHeader";
import useServicios from "../../hooks/useServicios";
import { useEffect } from "react";

export default function WebServicios() {
  const { getServicios, servicios } = useServicios();

  useEffect(() => {
    const getData = async () => {
      try {
        await getServicios();
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="overflow-hidden">
      <PageHeader Title={"Nuestros Servicios"} />
      <div className="w-mobile lg:w-dekstop mx-auto py-20 md:py-32">
        <div className="flex flex-col gap-12 relative">
          <Reveal
            className={"absolute top-0 right-0 -mr-40 -mt-36 opacity-80 "}
          >
            <img
              className="w-[400px]"
              src={BgTijera}
              alt="background tijeras"
            />
          </Reveal>
          <Reveal className={"absolute -bottom-28 -left-40 -z-10"}>
            <img
              className="w-[400px]"
              src={BgNavaja}
              alt="background navajas"
            />
          </Reveal>

          <section className="flex flex-col gap-6 lg:gap-10 w-full z-10 ">
            <div className={"w-full relative mx-auto grid grid-cols-6 gap-6 "}>
              {servicios.map((servicio) => (
                <ServicioContainer key={servicio._id} servicio={servicio} />
              ))}
            </div>
          </section>

          <Reveal delay={0}>
            <BtnWebHome text={"Agendar Hora"} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

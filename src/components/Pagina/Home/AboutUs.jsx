import Instagram from "../../../assets/img/icons/instagram.svg";
import Wsp from "../../../assets/img/icons/whatsapp.svg";
import TikTok from "../../../assets/img/icons/tiktok.svg";
import Barber from "../../../assets/img/pagina/barber_2.png";
import Reveal from "../../../utils/Reveal";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className=" pb-32">
      <section className="flex flex-col gap-6 w-full">
        <Reveal className={"block md:hidden"}>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex-grow border-t-2 border-agenda-primary"></div>
              <h2 className="ml-4 text-2xl font-bold uppercase self-end text-end">
                Sobre Nosotros
              </h2>
            </div>
          </div>
        </Reveal>

        <section className="flex flex-col gap-6 md:flex-row md:items-center ">
          <div>
            <article className="flex flex-col gap-4 w-full md:w-10/12">
              <Reveal className={"hidden md:block"}>
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-grow border-t-2 border-agenda-primary"></div>
                    <span className="ml-4 text-2xl font-bold uppercase self-end text-end">
                      Sobre Nosotros
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal className={"flex flex-col"}>
                <h3 className="font-bold uppercase">LATEBANBARBER -</h3>
                <h3 className="font-bold uppercase">BARBERIA PROFESIONAL</h3>
              </Reveal>

              <Reveal className={"flex flex-col gap-2 w-full"}>
                <p className="text-pretty">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  molestiae voluptatem doloribus ducimus architecto laboriosam
                  quibusdam quos.
                </p>
                <p className="text-pretty">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur asperiores amet, reiciendis architecto perferendis
                  adipisci.
                </p>
              </Reveal>

              <Reveal className={"flex gap-2"}>
                <Link
                  to={
                    "https://www.instagram.com/tebanbarber/reels/?locale=en_US%2Cen_GB%2Cen_US%2Cen_GB%2Cen_US%2Cen_GB%2Cen_US%2Cen_GB"
                  }
                  target="_blank"
                >
                  <img
                    className="cursor-pointer"
                    src={Instagram}
                    alt="icono instagram"
                    width={40}
                  />
                </Link>
                <Link to={""}>
                  <img
                    className="cursor-pointer"
                    src={Wsp}
                    alt="icono whatsapp"
                    width={40}
                  />
                </Link>
                <Link to={""}>
                  <img
                    className="cursor-pointer"
                    src={TikTok}
                    alt="icono tik tok"
                    width={40}
                  />
                </Link>
              </Reveal>
            </article>
          </div>
          <Reveal className={"w-full pt-6 md:pt-0 relative h-full"}>
            <picture className="block w-full relative z-10 h-full">
              <img
                className=" block w-full rounded h-full object-cover"
                src={Barber}
                alt="imágen tebanbarber"
              />
            </picture>
            <div className="w-11/12 h-36 absolute bg-agenda-primary opacity-10 top-0 mt-2 left-1/2 transform -translate-x-1/2 z-0 rounded md:left-0 md:-translate-x-10 md:translate-y-10 md:h-5/6"></div>
          </Reveal>
        </section>
      </section>
    </div>
  );
}

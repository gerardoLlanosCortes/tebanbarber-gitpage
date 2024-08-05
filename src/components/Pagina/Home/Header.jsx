import { Link } from "react-router-dom";
import BarberNavaja from "../../../assets/img/pagina/barber_navaja_dibujo.png";
import Reveal from "../../../utils/Reveal";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center gap-1 bg-agenda-hero-img-web text-agenda-font-white w-full bg-no-repeat bg-center bg-cover relative h-[calc(100vh-8rem)] lg:h-[600px]">
      {/* Capa oscura sobre la imagen */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="w-mobile lg:w-dekstop flex flex-col lg:flex-row mx-auto relative z-10 justify-between items-center">
        {/* Columna 1 */}
        <Reveal
          className={
            "w-full lg:w-1/2 flex flex-col gap-1 mx-auto text-center lg:text-start justify-center"
          }
        >
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold uppercase">
              Barbería Profesional
            </span>
            <h1
              className="font-bold uppercase"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
            >
              LaTebanBarber
            </h1>
          </div>
          <div className="flex flex-col gap-7">
            <p className="leading-7 text-base sm:text-lg text-pretty">
              ¡Bienvenido a LaTebanBarber en Maipú! Ofrecemos cortes y servicios
              de barbería de primera, con la mejor atención y precios que te
              encantarán. Reserva tu hora en nuestra web y vive la experiencia.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to={"/agenda"}
                className="p-2 rounded bg-agenda-primary text-agenda-bg-color w-full mx-auto lg:w-full lg:mx-0 animate-pulse-brightness text-center"
              >
                Agenda tu Hora
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Columna 2 */}
        <Reveal className={"w-full h-full hidden lg:block  mx-auto opacity-80"}>
          <img
            className="block w-[220px] h-full object-cover rotate-6 mx-auto"
            src={BarberNavaja}
            alt="Navaja Background"
          />
        </Reveal>
      </div>
    </header>
  );
}

import React, { useEffect, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import instagramIcon from "../../assets/img/icons/instagram.svg";
import wspIcon from "../../assets/img/icons/whatsapp.svg";
import locationIcon from "../../assets/img/icons/location.svg";
import arrowFO from "../../assets/img/icons/arrow-forward-outline.svg";
import useTipoServicio from "../../hooks/useTipoServicio";
import SpecificLoader from "../../components/Agenda/Loaders/SpecificLoader";
import TimedModalDinamico from "../../components/Agenda/Modals/TimedModalDinamico";
import dangerIcon from "../../assets/img/icons/danger__advice.png";
import useAviso from "../../hooks/useAviso";
import Reveal from "../../utils/Reveal";

// Import lazy component
const ServicioCategoria = React.lazy(() =>
  import("../../components/Agenda/Accordion/ServicioCategoria")
);

export default function AgendaHome() {
  const { getTiposServiciosAndServicios, tiposServicios } = useTipoServicio();
  const { getActiveAviso, activeAviso } = useAviso();
  const queryParams = new URLSearchParams(location.search);
  const showModalParam = queryParams.get("show");
  const [showModal, setShowModal] = useState(false);
  const [loadingAviso, setLoadingAviso] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getActiveAviso(), getTiposServiciosAndServicios()]);
      setLoadingAviso(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loadingAviso && activeAviso && showModalParam !== "no") {
      setShowModal(true);
    }
  }, [loadingAviso, activeAviso, showModalParam]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col gap-16 pb-32 ">
        <div className="flex flex-col gap-6 w-full">
          <div className="bg-black w-full">
            <header
              className={`w-mobile lg:w-dekstop mx-auto  flex flex-col justify-center items-center gap-1 bg-agenda-hero-img text-agenda-font-white bg-no-repeat bg-center bg-cover relative h-[200px] lg:h-[300px]`}
            >
              <div className="absolute inset-0 bg-black opacity-80"></div>
              <div className="relative z-10 ">
                <div className="w-full mx-auto text-center justify-center">
                  <Reveal className={"w-full mx-auto text-center"}>
                    <h1
                      className="font-bold uppercase"
                      style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                    >
                      Agenda
                    </h1>
                    <div className="flex flex-col gap-0 text-sm md:text-base md:flex-row md:items-center md:gap-[6px] text-center mx-auto w-full md:justify-center ">
                      <p>Horario de atención</p>
                      <span className="hidden md:block w-[4px] h-[4px] rounded-[4px] bg-agenda-font-white"></span>
                      <p>Lun - Sab de 10:00 a 21:00 hrs</p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </header>
          </div>

          <Reveal className={"w-mobile mx-auto flex flex-col"}>
            <section className="flex justify-center items-center gap-10">
              <Link
                to="https://www.instagram.com/tebanbarber/?hl=en"
                target="_blank"
                className="w-10"
              >
                <img
                  className="contact__icon"
                  src={instagramIcon}
                  alt="icono instagram"
                />
              </Link>
              <Link to="#" className="contact__link">
                <img className="w-10" src={wspIcon} alt="icono whatsapp" />
              </Link>
              <Link to="ubicacion" className="contact__link">
                <img
                  className="w-10"
                  src={locationIcon}
                  alt="icono ubicacion"
                />
              </Link>
            </section>
          </Reveal>
        </div>
        <Reveal className={"w-mobile lg:w-dekstop mx-auto flex flex-col"}>
          <main className="flex flex-col gap-16">
            <section className="flex flex-col gap-3">
              <p className="text-2xl text-center font-bold text-agenda-black">
                ¿Necesitas agendar una hora?
              </p>
              <Link
                to="servicios"
                className="flex bg-agenda-primary w-full items-center justify-center text-agenda-bg-color py-4 rounded-lg gap-2"
              >
                <p className="font-semibold">Ir a Agendar Hora</p>
                <div>
                  <img className="w-6" src={arrowFO} alt="flecha icono" />
                </div>
              </Link>
            </section>

            <section className="flex flex-col gap-3">
              <p className="text-2xl text-center font-bold text-agenda-black">
                ¿Ya agendaste una hora?
              </p>
              <Link
                to="cancelar"
                className="flex bg-agenda-primary w-full items-center justify-center text-agenda-bg-color py-4 rounded-lg gap-2"
              >
                <p className="font-semibold">Revisar/Cancelar Hora</p>
                <div>
                  <img className="w-6" src={arrowFO} alt="flecha icono" />
                </div>
              </Link>
            </section>

            <Reveal className="flex flex-col gap-3">
              <p className="text-2xl text-center font-bold text-agenda-black">
                Nuestros Servicios
              </p>

              <Suspense fallback={<SpecificLoader />}>
                <ServicioCategoria tiposServicios={tiposServicios} />
              </Suspense>
            </Reveal>
          </main>
        </Reveal>

        {activeAviso && showModal && (
          <TimedModalDinamico
            source={dangerIcon}
            title={activeAviso.titulo}
            content={activeAviso.contenido}
            onClose={handleCloseModal}
            btnContent={"Entendido"}
          />
        )}
      </div>
    </>
  );
}

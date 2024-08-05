import Resena from "./Resena";
import BtnWebHome from "../Ui/BtnWebHome";
import BgComillas from "../../../assets/img/pagina/bg_comillas.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Reveal from "../../../utils/Reveal";

const resenasData = [
  // contenido
  // Estrellas
  // nombre
  {
    id: 1,
    nombre: "Benjamin Aravena Arabe",
    contenido:
      "Excelente servicio de corte y barba en general, además de la atención",
  },
  {
    id: 2,
    nombre: "Jose Luis",
    contenido: "Muy buena atención y calidad de corte 10/10!, 100% recomendado",
  },
  {
    id: 3,
    nombre: "Benjamin Aravena Arabe",
    contenido:
      "Excelente servicio de corte y barba en general, además de la atención",
  },
  {
    id: 4,
    nombre: "Matias Perez",
    contenido: "Exelente atencion y servicio , barber confiable 👌🏼💯",
  },
  {
    id: 5,
    nombre: "Carlos",
    contenido:
      "Cortan el pelo excelente, la persona es súper profesional, amigable y detallista. Lo recomiendo al 100%, apuesta segura de buena calidad",
  },
];

export default function Resenas() {
  return (
    <Reveal className={" pb-32 flex flex-col gap-6 relative"}>
      <div className="absolute -top-20 -left-20 -z-20 rotate-[30deg] opacity-50">
        <img className="w-[200px]" src={BgComillas} alt="background comillas" />
      </div>
      <div className="absolute bottom-10 -right-20 -z-20 rotate-[30deg] scale-x-[-1] opacity-50">
        <img className="w-[200px]" src={BgComillas} alt="background comillas" />
      </div>
      <section className="flex flex-col gap-6 w-full ">
        <Reveal className={"flex flex-col gap-2 items-center"}>
          <div className="flex items-center w-full">
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
            <h2 className="mx-4 text-2xl font-bold uppercase text-center">
              Reseñas
            </h2>
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
          </div>
        </Reveal>

        <Reveal>
          <Swiper
            slidesPerView={1}
            cssMode={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="mySwiper"
            style={{
              "--swiper-navigation-color": "rgba(255, 255, 255, 0.600)",
              "--swiper-pagination-color": "rgba(255, 255, 255, 0.600)",
            }}
          >
            {resenasData.map((resena) => (
              <SwiperSlide key={resena.id}>
                <Resena resena={resena} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
        <Reveal delay={0}>
          <BtnWebHome
            text={"Ver Todas Las Reseñas"}
            link={
              "https://www.google.com/search?q=google+latebanbarber&oq=google+latebanbarber&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhAMgYIAhBFGDwyBggDEEUYPDIGCAQQRRg80gEIMjk3NWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x9662c3de56ebb883:0xa6e3743baabd5594,1,,,,"
            }
            target="_blank"
          />
        </Reveal>
      </section>
    </Reveal>
  );
}

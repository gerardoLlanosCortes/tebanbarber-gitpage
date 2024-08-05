import Barber1 from "../../../assets/img/pagina/barber_1.png";
import Barber2 from "../../../assets/img/pagina/barber_2.png";
import Barber3 from "../../../assets/img/pagina/barber_3.png";
import Barber4 from "../../../assets/img/pagina/barber_3.png";
import Barber5 from "../../../assets/img/pagina/barber_3.png";
import Reveal from "../../../utils/Reveal";
import BtnWebHome from "../Ui/BtnWebHome";

export default function Galeria() {
  return (
    <div className="pb-32">
      <section className="flex flex-col gap-6 w-full">
        <Reveal className={"flex flex-col gap-2 items-center"}>
          <div className="flex items-center w-full">
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
            <h2 className="mx-4 text-2xl font-bold uppercase text-center">
              Galería
            </h2>
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
          </div>
        </Reveal>

        <Reveal
          className={
            "grid grid-cols-4  md:grid-cols-12 gap-2 max-h-[80vh] md:grid-rows-2 grid-rows-4"
          }
        >
          <div className="md:row-span-2 col-span-4 md:col-span-3">
            <img
              src={Barber1}
              alt="Imagen 1"
              className="w-full h-full object-cover rounded"
            />
          </div>

          <div className="md:row-span-1 col-span-2 md:col-span-3">
            <img
              src={Barber2}
              alt="Imagen 2"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="md:row-span-1 col-span-2 md:col-span-6">
            <img
              src={Barber3}
              alt="Imagen 3"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="md:row-span-1 col-span-4 md:col-span-3">
            <img
              src={Barber4}
              alt="Imagen 4"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="md:row-span-1 col-span-4 md:col-span-6">
            <img
              src={Barber5}
              alt="Imagen 5"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </Reveal>

        <Reveal delay={0}>
          <BtnWebHome text={"Ver Todas Las Imágenes"} link={"/galeria"} />
        </Reveal>
      </section>
    </div>
  );
}

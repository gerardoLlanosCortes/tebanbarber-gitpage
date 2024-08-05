import Reveal from "../../utils/Reveal";
import Barber1 from "../../assets/img/pagina/barber_1.png";
import Barber2 from "../../assets/img/pagina/barber_2.png";
import Barber3 from "../../assets/img/pagina/barber_3.png";
import PageHeader from "../../components/PageHeader";
import Image from "../../components/Pagina/Galeria/Image";

export default function WebGaleria() {
  return (
    <div className="overflow-hidden">
      <PageHeader Title={"Galería"} />
      <div className="w-mobile lg:w-dekstop mx-auto py-20 md:py-32">
        <div className="flex h-full w-full items-center justify-center">
          <div className="gap-6 columns-1 lg:columns-3 ">
            <Image aspect={"video"} src={Barber1} />
            <Image aspect={"square"} src={Barber2} />
            <Image aspect={"square"} src={Barber1} />
            <Image aspect={"square"} src={Barber3} />
            <Image aspect={"video"} src={Barber1} />
            <Image aspect={"video"} src={Barber2} />
            <Image aspect={"square"} src={Barber2} />
            <Image aspect={"video"} src={Barber3} />
            <Image aspect={"square"} src={Barber1} />
            <Image aspect={"square"} src={Barber3} />
            <Image aspect={"video"} src={Barber2} />
            <Image aspect={"video"} src={Barber1} />
            <Image aspect={"square"} src={Barber2} />
            <Image aspect={"video"} src={Barber3} />
          </div>
        </div>
      </div>
    </div>
  );
}

import Product from "./Product";
import BtnWebHome from "../Ui/BtnWebHome";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Reveal from "../../../utils/Reveal";

export default function Products({
  productos,
  setSelectedProduct,
  setShowProductModal,
}) {
  return (
    <div className="py-32">
      <section className="flex flex-col gap-6 w-full">
        <Reveal className={"flex flex-col gap-2 items-center"}>
          <div className="flex items-center w-full">
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
            <h2 className="mx-4 text-2xl font-bold uppercase text-center">
              Tienda
            </h2>
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
          </div>
          <p className="text-center text-pretty">
            Explora nuestra selección de productos para tu cuidado personal.
            Todo lo que necesitas sentirte bien.
          </p>
        </Reveal>

        <Reveal>
          <Swiper
            slidesPerView={1}
            cssMode={true}
            navigation={true}
            pagination={false}
            loop={true}
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
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="mySwiper"
            style={{
              "--swiper-navigation-color": "rgba(255, 255, 255, 0.600)",
              "--swiper-pagination-color": "rgba(255, 255, 255, 0.600)",
            }}
          >
            {productos.slice(0, 8).map((producto) => (
              <SwiperSlide key={producto._id}>
                <Product
                  producto={producto}
                  setSelectedProduct={setSelectedProduct}
                  setShowProductModal={setShowProductModal}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
        <Reveal delay={0}>
          <BtnWebHome text={"Ver Todos Los Productos"} link={"/tienda"} />
        </Reveal>
      </section>
    </div>
  );
}

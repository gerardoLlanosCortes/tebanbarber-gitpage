import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FechaCard from "./FechaCard";
export default function FechasCarousel({
  fechas,
  selectedFecha,
  setSelectedFecha,
  selectedHora,
  setSelectedHora,
  setShowModal,
  setSelectedFechaToDelete,
  handleDeleteFechaModal,
  handleDeletePastDatesModal,
}) {
  return (
    <div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={true}
        containerClass="carousel__container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 300,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 300,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {fechas.map((fecha) => (
          <FechaCard
            fecha={fecha}
            key={fecha._id}
            selectedFecha={selectedFecha}
            setSelectedFecha={setSelectedFecha}
            selectedHora={selectedHora}
            setSelectedHora={setSelectedHora}
            handleDeleteFechaModal={handleDeleteFechaModal}
            setSelectedFechaToDelete={setSelectedFechaToDelete}
          />
        ))}
      </Carousel>
      <button
        className="text-red-700 border-red-700 border text-base py-3 px-4 w-full rounded-lg mt-3"
        onClick={handleDeletePastDatesModal}
      >
        Eliminar Fechas Pasadas
      </button>
    </div>
  );
}

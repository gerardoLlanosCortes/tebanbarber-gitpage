import Cart from "../../../assets/img/icons/cart.svg";
import { formatearPrecio } from "../../../utils";
import Reveal from "../../../utils/Reveal";

export default function WebTiendaProducto({
  producto,
  setSelectedProduct,
  setShowProductModal,
}) {
  const handleShowProductModal = () => {
    setSelectedProduct(producto);
    setShowProductModal(true);
  };

  return (
    <Reveal
      className={
        "w-full col-span-6 lg:col-span-4 rounded p-2 hover:shadow cursor-pointer h-full flex flex-col"
      }
      duracion={0.5}
      delay={0.1}
    >
      <img
        src={producto.img}
        alt={producto.nombre}
        className="rounded-t w-full"
        onClick={handleShowProductModal}
      />

      <div
        className="flex flex-col gap-1 lg:gap-2 h-full"
        onClick={handleShowProductModal}
      >
        <span className="text text-balance text-sm md:text-lg">
          {producto.nombre}
        </span>
        <div className="h-full lg:h-auto flex justify-between lg:items-center flex-col lg:flex-row gap-1 lg:gap-0">
          <div className="flex gap-2 items-center animate-pulse-brightness-less">
            {producto.descuento < 0 ? (
              <>
                <span className="font-semibold text-lg text-red-600">
                  {formatearPrecio(producto.precioFinal)}
                </span>
                <span className="border border-red-600 rounded px-1 text-sm text-red-600">
                  {producto.descuento}%
                </span>
              </>
            ) : (
              <span className="font-semibold text-lg text-agenda-primary">
                {formatearPrecio(producto.precioFinal)}
              </span>
            )}
          </div>

          <picture
            className={`px-2 lg:px-10 py-1 rounded ${
              producto.descuento < 0
                ? "button-rainbow-green"
                : "bg-agenda-primary"
            } hover:bg-agenda-primary-clear`}
          >
            <img
              src={Cart}
              alt="icono carrito"
              className="w-[15px] lg:w-[20px] mx-auto"
            />
          </picture>
        </div>
      </div>
    </Reveal>
  );
}

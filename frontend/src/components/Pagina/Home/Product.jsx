import Cart from "../../../assets/img/icons/cart.svg";
import { formatearPrecio } from "../../../utils";

export default function Product({
  producto,
  setSelectedProduct,
  setShowProductModal,
}) {
  const handleShowProductModal = () => {
    setSelectedProduct(producto);
    setShowProductModal(true);
  };

  return (
    <div className="w-full col-span-4 sm:col-span-2 lg:col-span-1 min-h-64 flex flex-col text-start">
      <div className="w-full flex-grow h-full relative overflow-hidden">
        <picture className="w-full">
          <img
            className="w-full h-full object-cover rounded-t"
            src={producto.img}
            alt={producto.nombre}
          />
        </picture>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-0 flex flex-col gap-1 text-agenda-font-white p-4">
          <h3
            className="font-semibold text-lg break-words"
            style={{ fontSize: "clamp(0.8rem, 1.2rem, 2rem)" }}
          >
            {producto.nombre}
          </h3>
          <span className="font-bold text-xl">
            {producto.descuento < 0 ? (
              <div className="flex gap-1 items-center">
                <span>{formatearPrecio(producto.precioFinal)}</span>
                <span className="border border-agenda-font-white rounded p-1 text-sm text-agenda-font-white border-opacity-50">
                  {producto.descuento}%
                </span>
              </div>
            ) : (
              formatearPrecio(producto.precioFinal)
            )}
          </span>
        </div>
      </div>
      <button
        className="bg-agenda-primary text-agenda-font-white w-full p-3 rounded-b hover:bg-agenda-primary-clear transition-all duration-200"
        onClick={handleShowProductModal}
      >
        <img
          className="text-center mx-auto"
          style={{
            width: "clamp(20px, 5vw, 30px)",
          }}
          src={Cart}
          alt="icono carrito"
        />
      </button>
    </div>
  );
}

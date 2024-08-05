import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Close from "../../../assets/img/icons/close.svg";
import { formatearPrecio } from "../../../utils";
import useCart from "../../../hooks/useCart";
import CartAddAlert from "../Cart/CartAddAlert";

import Reveal from "../../../utils/Reveal";

function ModalProducto({ producto, productImage, onClose }) {
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < Math.min(producto.stock, 10)) {
      setCount(count + 1);
    }
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const max = Math.min(producto.stock, 10);
    if (value >= 1 && value <= max) {
      setCount(value);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    setShowAlert(false);
    addToCart({ producto, count });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    setCount(1); // Reiniciar el estado count a 1 después de añadir al carrito
  };

  const maxCount = Math.min(producto.stock, 10);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <Reveal
        className="w-mobile lg:w-[800px] bg-white rounded shadow-md flex flex-col items-center gap-4 p-8 lg:p-12 relative max-h-[90vh] overflow-y-auto"
        y={-10}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          <img width={20} src={Close} alt="close icon" />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-6 text-agenda-primary ">
          <picture className="w-full h-[250px]   md:h-[500px]">
            <img
              src={producto.img}
              alt={producto.nombre}
              className="w-full object-cover sm:object-contain h-full rounded"
            />
          </picture>
          <div className="flex flex-col gap-4 h-full">
            <div className="overflow-y-auto max-h-[100px] md:max-h-[300px]">
              <span className="text-2xl font-semibold">{producto.nombre}</span>
              <p className="text-sm">{producto.descripcion}</p>
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              <>
                <span
                  className={`text-3xl font-bold ${
                    producto.descuento < 0
                      ? "text-red-600"
                      : "text-agenda-primary"
                  }`}
                >
                  {formatearPrecio(producto.precioFinal)}
                </span>
                {producto.descuento < 0 && (
                  <div className="flex gap-2 items-center">
                    <span className="text-agenda-primary opacity-70 line-through text-sm">
                      {formatearPrecio(producto.precioBase)}
                    </span>
                    <span className="border border-red-600 text-red-600 px-2">
                      {producto.descuento}%
                    </span>
                  </div>
                )}
              </>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <span className="text-agenda-primary">Cantidad:</span>
                <span className="text-agenda-primary text-opacity-70 text-xs">
                  (stock: {producto.stock})
                </span>
              </div>
              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                  className="bg-agenda-bg-color text-agenda-primary hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none"
                  onClick={handleDecrement}
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  className="outline-none focus:outline-none text-center w-full bg-agenda-bg-color font-semibold text-md md:text-basecursor-default flex items-center text-agenda-primary"
                  name="custom-input-number"
                  value={count}
                  min="1"
                  max={maxCount}
                  onChange={handleChange}
                />
                <button
                  className="bg-agenda-bg-color text-agenda-primary hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer"
                  onClick={handleIncrement}
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
            <button
              className="bg-agenda-primary w-full text-white p-2 rounded mt-2"
              onClick={handleAddToCart}
            >
              Agregar Al Carro
            </button>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {showAlert && <CartAddAlert key="cartAddAlert" />}
      </AnimatePresence>
    </div>
  );
}

export default ModalProducto;

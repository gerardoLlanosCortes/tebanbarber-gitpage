import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../../../utils";
import NavCartProduct from "./NavCartProduct";
import CartLogo from "../../../assets/img/icons/cart_black.svg";

export default function NavCart({ cart, removeFromCart, setOpenCart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 5 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="shadow bg-agenda-bg-color rounded absolute z-[99] top-5 -left-40 sm:-left-48 w-[250px] p-3 flex flex-col gap-3"
    >
      <div className="absolute top-[-5px] left-44 sm:left-52 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-agenda-bg-color"></div>
      {cart.length > 0 ? (
        <div>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <NavCartProduct
                key={item._id}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between pt-3">
              <span>Total:</span>
              <span>
                {formatearPrecio(
                  cart.reduce(
                    (total, item) => total + item.precioFinal * item.cantidad,
                    0
                  )
                )}
              </span>
            </div>
            <Link
              to={"/carro"}
              onClick={() => setOpenCart(false)}
              className="w-full bg-agenda-primary text-white p-2 rounded text-center hover:bg-agenda-primary-clear transition-all"
            >
              Ir al Carro
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-2 p-4 pb-2 text-center items-center font-normal">
          <picture className="w-16 mx-auto">
            <img
              src={CartLogo}
              alt="logo de carrito"
              className="block w-full"
            />
          </picture>
          <div className="flex flex-col gap-4 w-ful">
            <div>
              <p>Tu carro está vacío</p>
              <p className="text-sm text-pretty">
                ¡Descubre todos los productos que tenemos para ti!
              </p>
            </div>
            <Link
              to={"/tienda"}
              className="bg-agenda-primary hover:bg-agenda-primary-clear transition-all text-white p-3 w-full rounded"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

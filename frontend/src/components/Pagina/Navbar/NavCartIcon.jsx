import React, { useEffect, useRef } from "react";
import NavCart from "../Cart/NavCart";
import { motion, AnimatePresence } from "framer-motion";

export default function NavCartIcon({
  setOpenCart,
  openCart,
  cart,
  removeFromCart,
  getItemCount,
  cartImg,
}) {
  const navCartRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navCartRef.current && !navCartRef.current.contains(event.target)) {
        setOpenCart(false);
      }
    }

    if (openCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCart, setOpenCart]);

  return (
    <>
      <div
        onClick={() => setOpenCart(!openCart)}
        className="cursor-pointer relative"
      >
        <img
          src={cartImg}
          alt="icono carrito"
          className="w-20 xs:w-16 sm:w-12 md:w-10 lg:w-7"
        />
        <div className="bg-agenda-primary text-white text-center rounded-full text-sm absolute px-2 -bottom-2 -left-1">
          {getItemCount()}
        </div>
      </div>
      <AnimatePresence>
        {openCart && (
          <div ref={navCartRef}>
            <NavCart
              cart={cart}
              removeFromCart={removeFromCart}
              setOpenCart={setOpenCart}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Link } from "react-router-dom";
import Logo from "../../../assets/img/teban-logo-black.jpeg";
import Cart from "../../../assets/img/icons/cart_black.svg";
import MobileNav from "./MobileNav";
import { useState } from "react";
import NavCartProduct from "../Cart/NavCartProduct";
import useCart from "../../../hooks/useCart";
import { formatearPrecio } from "../../../utils";
import NavCart from "../Cart/NavCart";
import NavMenuIcon from "./NavMenuIcon";
import NavCartIcon from "./NavCartIcon";
import NavDesktopLinks from "./NavDesktopLinks";
import NavMobileLinks from "./NavMobileLinks";

export default function Navbar({ open, setOpen }) {
  const [openCart, setOpenCart] = useState(false);
  const { getItemCount, removeFromCart, cart } = useCart();

  return (
    // <nav className="bg-agenda-bg-color border-b-agenda-primary border-b-4 w-full text-agenda-primary h-32 fixed top-0 z-40">
    <nav className="bg-agenda-bg-color w-full text-agenda-primary h-32 fixed top-0 z-40">
      <div className="flex items-center font-medium justify-between w-mobile  lg:w-dekstop mx-auto">
        <div className="z-50 py-5 md:w-auto w-full flex justify-between items-center">
          <Link to={"/"}>
            <img
              src={Logo}
              alt="logo"
              className="md:cursor-pointer w-20 rounded"
            />
          </Link>
        </div>
        <div className="flex gap-8">
          <ul className="lg:flex hidden  items-center gap-8">
            <NavDesktopLinks />
          </ul>
          <div className=" flex items-center gap-4">
            <div
              className="block relative "
              onMouseEnter={() => setOpenCart(true)}
              onMouseLeave={() => setOpenCart(false)}
            >
              <NavCartIcon
                cart={cart}
                cartImg={Cart}
                getItemCount={getItemCount}
                openCart={openCart}
                removeFromCart={removeFromCart}
                setOpenCart={setOpenCart}
              />
            </div>
            <div
              className="text-3xl lg:hidden block cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <NavMenuIcon open={open} />
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <ul
          className={`
        lg:hidden bg-agenda-bg-color fixed w-full top-0 overflow-y-auto bottom-0 mt-[120px] 
        duration-200 ${open ? "left-0" : "left-[-100%]"} z-50
        `}
        >
          <NavMobileLinks />
        </ul>
      </div>
    </nav>
  );
}

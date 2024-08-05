import { motion } from "framer-motion";
import PopUpReveal from "../../../utils/PopUpReveal";

export default function CartAddAlert() {
  return (
    <PopUpReveal className="fixed bottom-5 sm:right-5 max-w-full transform bg-agenda-primary text-white p-4 rounded z-[99999] flex items-center gap-2 h-fit shadow-sm">
      <span className="text-sm">PRODUCTO AGREGADO AL CARRO</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12l4 4L20 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </PopUpReveal>
  );
}

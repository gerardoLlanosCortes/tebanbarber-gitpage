import React from "react";
import { Link } from "react-router-dom";

export default function NavLinks({link, icon, alt, text}) {
  return (
    <Link
      className="w-full border-t border-t-[#ccc] h-20 flex justify-start items-center no-underline text-xl p-4 py-8 gap-2"
      to={link}
    >
      <img className="w-6" src={icon} alt={alt} />
      {text}
    </Link>
  );
}

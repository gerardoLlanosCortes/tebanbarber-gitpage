import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../../../utils/Reveal";

export default function Header({ title, link = "#" }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (link === "#") {
      e.preventDefault(); // Previene la navegación predeterminada
      navigate(-1); // Navega a la página anterior
    }
  };

  return (
    <Link
      to={link === "#" ? "#" : `/${link}`}
      onClick={handleClick}
      className="inline-block my-16 cursor-pointer"
    >
      <Reveal className="text-2xl text-center">
        <span>{"<"}</span> {title}
      </Reveal>
    </Link>
  );
}

import { Link } from "react-router-dom";

export default function BtnWebHome({ text, link, target = "" }) {
  return (
    <Link to={link} target={target}>
      <button className="border border-agenda-primary p-4 rounded uppercase font-bold hover:bg-agenda-primary hover:text-agenda-font-white transition-all duration-200 z-10 w-full">
        {text}
      </button>
    </Link>
  );
}

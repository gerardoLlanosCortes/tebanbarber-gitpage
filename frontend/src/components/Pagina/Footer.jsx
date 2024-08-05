import Instagram from "../../assets/img/icons/instagram_white.svg";
import Wsp from "../../assets/img/icons/whatsapp_white.svg";
import TikTok from "../../assets/img/icons/tiktok_white.svg";
import { Link } from "react-router-dom";

export default function Footer({ pathname }) {
  const showIframe = pathname !== "/ubicacion";
  return (
    <footer className="relative  lg:pt-16">
      {showIframe && (
        <iframe
          className=" w-full h-[350px] block lg:hidden"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.186276519703!2d-70.7479417!3d-33.470500699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c30e69b3d135%3A0x3fd6384e7f4d3a04!2sLa%20Tenca%20584%2C%209290472%20Santiago%2C%20Maip%C3%BA%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1718322072661!5m2!1ses-419!2scl"
          style={{ border: "0" }} // Corregir la línea de estilo aquí
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
      <div className="bg-agenda-primary">
        <div className="flex flex-col">
          <div className="flex w-mobile lg:w-dekstop mx-auto relative">
            <div className="lg:flex-1/3 flex flex-col gap-6  text-white py-6">
              <div>
                <span className="text-xl font-bold">LATEBANBARBER</span>
                <p className="text-pretty">
                  BARBERÍA PROFESIONAL • Peluquería Profesional AIEP
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-lg">Dirección</h2>
                  <p className="text-sm">La Tenca 584, Maipú</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-lg">Contacto</h2>
                  <p className="text-sm break-all">latebanbarber@gmail.com</p>
                </div>
              </div>
              <div className="w-56">
                <h2 className="font-bold text-lg">Horario</h2>
                <div className="flex justify-between">
                  <span className="uppercase">LUN - SAB</span>
                  <span className="uppercase">9:00AM - 20:00PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase">DOMINGO</span>
                  <span className="uppercase">CERRADO</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  to={
                    "https://www.instagram.com/tebanbarber/reels/?locale=en_US%2Cen_GB%2Cen_US%2Cen_GB%2Cen_US%2Cen_GB%2Cen_US%2Cen_GB"
                  }
                  target="_blank"
                >
                  <img src={Instagram} alt="icono instagram" width={30} />
                </Link>
                <Link to={""}>
                  <img src={Wsp} alt="icono whatsapp" width={30} />
                </Link>
                <Link to={""}>
                  <img src={TikTok} alt="icono tik tok" width={30} />
                </Link>
              </div>
            </div>

            <iframe
              className=" lg:flex-2/3 w-[400px] h-[400px] absolute right-0 -top-28  hidden lg:block "
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.186276519703!2d-70.7479417!3d-33.470500699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c30e69b3d135%3A0x3fd6384e7f4d3a04!2sLa%20Tenca%20584%2C%209290472%20Santiago%2C%20Maip%C3%BA%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1718322072661!5m2!1ses-419!2scl"
              style={{ border: "0" }} // Corregir la línea de estilo aquí
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="lg:w-dekstop lg:mx-auto w-full">
          <div className="w-full border-t-2 border-agenda-font-white opacity-40"></div>
          <p className="w-mobile mx-auto text-white break-words py-2 text-center">
            &copy; {new Date().getFullYear()} TebanBarber. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

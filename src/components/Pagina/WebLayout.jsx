import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/NavBar";
import Scroll from "../../utils/Scroll";
import Footer from "./Footer";
import { useState } from "react";

export default function WebLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [location.pathname]);

  // Conditionally render Footer if the pathname is not '/agenda/*'
  const showFooter = !(
    location.pathname.startsWith("/agenda/") && location.pathname !== "/agenda"
  );

  return (
    <div className="w-full h-full text-agenda-primary relative">
      <div className="mt-32">
        <Navbar open={open} setOpen={setOpen} />
      </div>
      <Scroll>
        <Outlet />
      </Scroll>
      {showFooter && <Footer pathname={location.pathname} />}
    </div>
  );
}

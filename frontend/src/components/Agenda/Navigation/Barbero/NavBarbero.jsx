import iconAdd from "../../../../assets/img/icons/add-outline.svg";
import iconCalendar from "../../../../assets/img/icons/calendar-number-outline.svg";
import iconCalendarTwo from "../../../../assets/img/icons/calendarTwo.svg";
import iconCut from "../../../../assets/img/icons/cut-outline.svg";
import iconOptions from "../../../../assets/img/icons/construct-outline.svg";
import NavLinks from "../../../../components/Agenda/Navigation/Barbero/NavLinks";

export default function NavBarbero() {
  return (
    <>
      <NavLinks
        link={"/barbero/agregar-fechas"}
        icon={iconAdd}
        alt={"icono agregar"}
        text={"Agregar Fechas"}
      />
      <NavLinks
        link={"/barbero/gestionar-fechas"}
        icon={iconCalendar}
        alt={"icono calendario"}
        text={"Gestionar Fechas"}
      />
      <NavLinks
        link={"/barbero/calendario"}
        icon={iconCalendarTwo}
        alt={"icono calendario"}
        text={"Calendario"}
      />
      <NavLinks
        link={"/barbero/gestionar-servicios"}
        icon={iconCut}
        alt={"icono tijera"}
        text={"Gestionar Servicios"}
      />
    </>
  );
}

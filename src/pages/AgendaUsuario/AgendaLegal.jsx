import Header from "../../components/Agenda/Navigation/Header";
import Reveal from "../../utils/Reveal";

export default function AgendaLegal() {
  return (
    <Reveal className="flex flex-col m-0 w-mobile lg:w-dekstop mx-auto gap-6 pb-32">
      <Header title={"Términos y Condiciones"} />
      <div className="flex flex-col gap-1 -mt-6">
        <h3 className="text-xl font-semibold">Términos y Condiciones</h3>
        <p className="text-pretty">
          Al agendar una hora en nuestro sitio web, aceptas automáticamente
          nuestros Términos y Condiciones. Por favor, asegúrate de leer
          detenidamente los términos antes de continuar con tu agendamiento.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">1. Introducción</h3>
        <p className="text-pretty">
          Bienvenido a LaTebanBarber. Al utilizar nuestro sitio para agendar
          citas, aceptas los siguientes Términos y Condiciones en su totalidad.
          Si no estás de acuerdo con estos términos, por favor, no uses nuestro
          sitio.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-balance">
          2. Recolección y Uso de Datos Personales
        </h3>
        <p className="text-pretty">
          Recolectamos tu usuario de Instagram y correo electrónico para los
          siguientes propósitos:
          <br />
          <strong>Identificación:</strong> Utilizamos tu usuario de Instagram
          para identificarte en nuestro sistema.
          <br />
          <strong>Envío de información:</strong> Usamos tu correo electrónico
          para enviarte los detalles y confirmaciones de tu cita agendada.
          <br />
          Nos comprometemos a proteger tu información personal y no compartirla
          con terceros
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-balance">
          3. Uso del Sitio Web
        </h3>
        <p className="text-pretty">
          Puedes usar nuestro sitio web para agendar citas de manera personal y
          no comercial. No debes usar nuestro sitio web de ninguna manera que
          cause, o pueda causar, daño al sitio web o su accesibilidad.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">4. Propiedad Intelectual</h3>
        <p className="text-pretty">
          Todo el contenido del sitio web, incluyendo texto, gráficos,
          logotipos, íconos, imágenes y software, es propiedad de LaTebanBarber
          o sus proveedores de contenido y está protegido por las leyes de
          derechos de autor y otras leyes de propiedad intelectual.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">
          5. Limitación de Responsabilidad
        </h3>
        <p className="text-pretty">
          En la medida máxima permitida por la ley aplicable, LaTebanBarber no
          será responsable de ninguna pérdida o daño directo, indirecto o
          consecuente que surja del uso de nuestro sitio web o de los servicios
          proporcionados.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">6. Modificaciones</h3>
        <p className="text-pretty">
          Nos reservamos el derecho de modificar estos términos en cualquier
          momento. Las modificaciones serán efectivas inmediatamente después de
          su publicación en esta página. Te recomendamos revisar esta página
          regularmente para estar al tanto de cualquier cambio.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">7. Ley Aplicable</h3>
        <p className="text-pretty">
          Estos Términos y Condiciones se rigen e interpretan de acuerdo con las
          leyes de Chile, y cualquier disputa relacionada con estos términos
          estará sujeta a la jurisdicción exclusiva de los tribunales de Chile.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">8. Contacto</h3>
        <p className="text-pretty">
          Si tienes alguna pregunta sobre estos Términos y Condiciones, por
          favor contáctanos en tebanbarber@gmail.com.
        </p>
      </div>
    </Reveal>
  );
}

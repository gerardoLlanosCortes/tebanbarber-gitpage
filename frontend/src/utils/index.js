// utils.js
import moment from "moment-timezone";
import { jwtDecode } from "jwt-decode";

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(precio);
};

const FormatearFecha = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleDateString("es-CL", options);
  // Convierte la primera letra en mayúscula
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const FormatearFechaCard = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "short",
    day: "numeric",
    timeZone: "America/Santiago",
  };
  const formattedDate = date.toLocaleDateString("es-CL", options);
  return formattedDate;
};

const isFechaPasada = (fecha) => {
  const now = obtenerFechaSantiago();
  const nowWithoutTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ); // Crear un objeto Date para la fecha actual sin la hora

  // Convierte la fecha de la fecha disponible a un objeto Date
  const fechaDisponible = new Date(fecha.fecha);

  // Comprueba si la fecha ya ha pasado
  return fechaDisponible < nowWithoutTime;
};

export const monthsMap = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

const formattedDateTimeCalendar = (dateString, timeString) => {
  // Divide la cadena de fecha en palabras y extrae el día, el mes y el año
  const dateWords = dateString.split(" ");
  const day = dateWords[1];
  const month = monthsMap[dateWords[3].toLowerCase()];
  const year = new Date().getFullYear(); // Usa el año actual

  // Divide la cadena de hora en palabras y extrae las horas y los minutos
  const timeWords = timeString.split(":");
  const hours = timeWords[0];
  const minutes = timeWords[1];

  // Formatea la cadena de fecha y hora en el formato deseado
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;

  return formattedDateTime;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // El mes se indexa desde 0
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

const convertirFecha = (fecha) => {
  const partes = fecha.split(", ")[1].split(" ");
  const dia = parseInt(partes[0]);
  const mes = monthsMap[partes[2].toLowerCase()];
  const anio = 2024; // Asigna el año correcto según sea necesario

  const fechaObj = new Date(anio, mes - 1, dia);
  const fechaFormateada = fechaObj.toISOString().split("T")[0];

  return fechaFormateada;
};

const createEventData = (index, agendarInfo, fecha) => {
  // Obtener la fecha y hora de inicio
  const fechaInicio = new Date(fecha);
  const horaInicio = agendarInfo[index].horaInicio.split(":");
  fechaInicio.setHours(parseInt(horaInicio[0]));
  fechaInicio.setMinutes(parseInt(horaInicio[1]));
  const formattedStartDateTime = formatDate(fechaInicio);

  // Obtener la fecha y hora de finalización
  const fechaFin = new Date(fecha);
  const horaFin = agendarInfo[index].horaFin.split(":");
  fechaFin.setHours(parseInt(horaFin[0]));
  fechaFin.setMinutes(parseInt(horaFin[1]));
  const formattedEndDateTime = formatDate(fechaFin);

  const data = {
    summary: `${agendarInfo[index].nombre} - ${agendarInfo[index].servicio}`,
    description: `Contacto del Cliente: ${agendarInfo[index].email}`,
    start: {
      dateTime: formattedStartDateTime,
      timeZone: "America/Santiago",
    },
    end: {
      dateTime: formattedEndDateTime,
      timeZone: "America/Santiago",
    },
  };

  return data;
};

const createCorreoData = (info) => {
  const data = {
    email: info.email,
    asunto: `${info.nombre}, tu hora ha sido agendada!`,
    mensaje: `
        <html>
        <head>
          <style>
            /* Estilos generales */
            .body__mail {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
  
            .container__mail {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
  
            .logo__mail {
              width: 100px;
              border-radius: 50%;
            }
  
            .info__mail h3 {
              font-size: 24px;
              color: #333;
            }
  
            .info__mail p {
              font-size: 16px;
              color: #666;
              margin: 10px 0;
            }
  
            .button-container__mail {
              text-align: center;
              margin-top: 20px;
            }
  
            .button__mail {
              display: inline-block;
              padding: 10px 20px;
              background-color: #324b4c;
              color: #fff;
              text-decoration: none;
              border-radius: 4px;
              font-size: 16px;
            }
  
            .button__mail:hover {
              background-color: #213131;
            }

          </style>
        </head>
        <body class="body__mail">
          <div class="container__mail">
            <div class="info__mail">
              <h1 style="color: #324b4c;">💈✂TebanBarber✂💈</h1>
              <h3>¡${info.nombre} Tu hora a sido agendada!</h3>
              <p>Hola ${info.nombre},</p>
              <p>Tu hora ha sido agendada con éxito:</p>
              <p>Fecha: ${info.fechaSeleccionadaString}</p>
              <p>Hora: ${info.horaInicio} - ${info.horaFin} hrs</p>
              <p>Servicio: ${info.servicio}</p>
              <div class="button-container__mail">
              <p>En caso de no poder asistir, puedes cancelar o reagendar tu hora aquí</p>
              <a href="https://latebanbarber.com/cancelar" class="button__mail" style="color: #fff; text-decoration: none;">Cancelar/Reagendar Hora</a>
              </div>
            </div>
            <h5>En caso de necesitar más información, te recomendamos contactar directamente por instagram o whatsapp.</h5>
          </div>
        </body>
        </html>
      `,
  };

  return data;
};

const obtenerToken = () => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

const obtenerHoraEnTexto = (fecha) => {
  return fecha.toLocaleTimeString("es-CL", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

// const obtenerFechaSantiago = () => {
//   const fechaActual = new Date();
//   const options = {
//     timeZone: "America/Santiago",
//   };
//   return new Date(fechaActual.toLocaleString("en-US", options));
// };

// const obtenerFechaFromAGivenDate = (date) => {
//   const options = { timeZone: "America/Santiago" };
//   return new Date(date.toLocaleString("en-US", options));
// };

// Obtener la fecha y hora actual en la zona horaria de Santiago
// utils.js

const obtenerFechaSantiago = () => {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Santiago" })
  );
};

// Convertir una fecha dada a la zona horaria de Santiago
const obtenerFechaFromAGivenDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "America/Santiago",
  });
};

const convertirFechaAFechaSantiago = (date) => {
  const utcDate = new Date(date.toISOString());
  return new Date(
    utcDate.toLocaleString("en-US", { timeZone: "America/Santiago" })
  );
};

const formatDateWithoutTimezoneOffset = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const obtenerTokenInfo = () => {
  const token = localStorage.getItem("refreshToken");
  return jwtDecode(token);
};

const formattedDateToDateAndHour = (date) => {
  // Usando split para dividir la cadena en partes
  const [datePart, timePart] = date.split("T");
  const [hours, minutes] = timePart.split(":");

  // Combinando las partes relevantes
  const formattedDate = `${datePart}T${hours}:${minutes}`;

  return formattedDate; // Salida: 2024-07-15T04:00
};

const changeTime = (dateString, newTime) => {
  // Extraer la parte de la fecha antes de la 'T' y después
  let [datePart, timePart] = dateString.split("T");

  // Crear la nueva fecha con la nueva hora
  let newDateString = `${datePart}T${newTime}:00.000Z`;

  return formattedDateToDateAndHour(newDateString);
};

const changePasswordCorreo = (info) => {
  const data = {
    email: info.email,
    asunto: `Restablecer contraseña`,
    mensaje: `
        <html>
        <head>
          <style>
            /* Estilos generales */
            .body__mail {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
  
            .container__mail {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
  
            .logo__mail {
              width: 100px;
              border-radius: 50%;
            }
  
            .info__mail h3 {
              font-size: 24px;
              color: #333;
            }
  
            .info__mail p {
              font-size: 16px;
              color: #666;
              margin: 10px 0;
            }
  
            .button-container__mail {
              text-align: center;
              margin-top: 20px;
            }
  
            .button__mail {
              display: inline-block;
              padding: 10px 20px;
              background-color: #324b4c;
              color: #fff;
              text-decoration: none;
              border-radius: 4px;
              font-size: 16px;
            }
  
            .button__mail:hover {
              background-color: #213131;
            }

          </style>
        </head>
        <body class="body__mail">
          <div class="container__mail">
            <div class="info__mail">
              <h1 style="color: #324b4c;">Instrucciones para cambiar tu contraseña</h1>
              <p>Para cambiar tu contraseña haz click en el botón de "Restablecer Contraseña"</p>
              <p>Recuerda que dispones de 15 minutos antes de que el link deje de funcionar</p>
              <a href="${info.link}" class="button__mail" style="color: #fff; text-decoration: none;">Restablecer Contraseña</a>
              <h5>Si no solicitaste este cambio, por favor ignora este correo.</h5>
            </div>
          </div>
        </body>
        </html>
      `,
  };

  return data;
};

// utils.js

export {
  formatearPrecio,
  FormatearFecha,
  formattedDateTimeCalendar,
  createEventData,
  createCorreoData,
  FormatearFechaCard,
  isFechaPasada,
  obtenerToken,
  obtenerHoraEnTexto,
  obtenerFechaSantiago,
  obtenerFechaFromAGivenDate,
  convertirFecha,
  obtenerTokenInfo,
  formattedDateToDateAndHour,
  changeTime,
  changePasswordCorreo,
  convertirFechaAFechaSantiago,
  formatDateWithoutTimezoneOffset,
};

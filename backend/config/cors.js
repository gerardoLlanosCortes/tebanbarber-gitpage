// Configurar cors
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://latebanbarber.com",
  "https://www.latebanbarber.com",
  "https://tebanbaerbartest.000webhostapp.com",
  "https://www.tebanbaerbartest.000webhostapp.com",
];
export const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Si necesitas enviar cookies en las solicitudes
};

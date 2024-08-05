// Configurar cors
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://latebanbarber.com",
  "https://www.latebanbarber.com",
  "https://tebanbarber-gitpage.vercel.app.com",
  "https://www.tebanbarber-gitpage.vercel.app.com",
  "https://tebanbarber-gitpage.vercel.app/",
  "https:///www.tebanbarber-gitpage.vercel.app/",
];
export const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Si necesitas enviar cookies en las solicitudes
};

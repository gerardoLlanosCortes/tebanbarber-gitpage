import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import { corsOptions } from "./config/cors.js";
import authRoutes from "./routes/authRoutes.js";
import agendaRoute from "./routes/fechasRoute.js";
import serviciosRoute from "./routes/serviciosRoute.js";
import emailRoute from "./routes/emailRoute.js";
import tipoServicioRoute from "./routes/tipoServicioRoute.js";
import googleCalendarRoute from "./routes/googleCalendarRoute.js";
import accesosRoute from "./routes/accesosRoute.js";
import userRoute from "./routes/userRoute.js";
import productosRoute from "./routes/productosRoute.js";
import avisosRoute from "./routes/avisosRoute.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json({ limit: "50mb" }));

// USAMOS DOTENV
dotenv.config();

// CONECTAMOS LA DB
conectarDB();

// USAMOS CORS
app.use(cors(corsOptions));

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/fechas", agendaRoute);
app.use("/api/servicios", serviciosRoute);
app.use("/api/tipo-servicio", tipoServicioRoute);
app.use("/api/correos", emailRoute);
app.use("/api/google-calendar", googleCalendarRoute);
app.use("/api/accesos", accesosRoute);
app.use("/api/productos", productosRoute);
app.use("/api/avisos", avisosRoute);
// app.use("/api", authRoutes);

// Definir puerto
const PORT = process.env.PORT || 4001;

// Arrancar la app
app.listen(PORT, () => {
  console.log("😎 Servidor Conectado en el puerto:", PORT);
});

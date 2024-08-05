import mongoose from "mongoose";
import Servicio from "./Servicios.js"; // Asegúrate de importar el modelo de Servicio

const tipoServicioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }],
  },
  {
    timestamps: true,
  }
);

tipoServicioSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // Elimina todos los servicios asociados
      await Servicio.deleteMany({ _id: { $in: this.servicios } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const TipoServicio = mongoose.model("TipoServicio", tipoServicioSchema);

export default TipoServicio;

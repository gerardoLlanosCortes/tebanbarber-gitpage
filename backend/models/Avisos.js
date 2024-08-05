import mongoose from "mongoose";

const avisosSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    isActivo: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Avisos = mongoose.model("Avisos", avisosSchema);

export default Avisos;

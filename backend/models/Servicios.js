import mongoose from "mongoose";

const servicioSchema = mongoose.Schema(
  {
    servicio: { type: String, required: true },
    precio: { type: Number, required: true },
    tipo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoServicio",
      required: true,
    },
    duracion: { type: Number, default: 30 },
    descripcion: { type: String },
    imagen: { type: String }, // Agrega un campo para almacenar el nombre del archivo
  },
  {
    timestamps: true,
  }
);

const Servicio = mongoose.model("Servicio", servicioSchema);

export default Servicio;

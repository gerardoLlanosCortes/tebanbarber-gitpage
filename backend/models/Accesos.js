import mongoose from "mongoose";
const rolesPermitidos = ["admin", "barbero"];

const accesosSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    rol: {
      type: String,
      enum: rolesPermitidos, // Solo permite valores dentro de rolesPermitidos
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Accesos = mongoose.model("Accesos", accesosSchema);

export default Accesos;

import mongoose from "mongoose";

const barberiasSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Barberias = mongoose.model("Barberia", barberiasSchema);
export default Barberias;

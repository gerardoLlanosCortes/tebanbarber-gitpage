import mongoose from "mongoose";

const horaAgendadaSchema = mongoose.Schema({
  horaInicio: String,
  horaFin: String,
  nombre: String,
  email: String,
  servicio: String,
});

const fechaSchema = mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: true,
    },
    horaInicio: {
      type: String,
      required: true,
    },
    horaFin: {
      type: String,
      required: true,
    },
    descansoHora: {
      type: String,
    },
    descansoDuracion: {
      type: Number,
      default: 0,
    },
    horasAgendadas: [horaAgendadaSchema],
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Fechas = mongoose.model("Fechas", fechaSchema);

export default Fechas;

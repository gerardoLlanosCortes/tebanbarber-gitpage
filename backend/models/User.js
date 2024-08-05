import mongoose from "mongoose";
const rolesPermitidos = ["admin", "barbero"];

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    rol: {
      type: String,
      enum: rolesPermitidos, // Solo permite valores dentro de rolesPermitidos
      required: true,
      trim: true,
    },
    servicios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Servicio",
      },
    ],
    googleCredentials: {
      client_email: { type: String, default: "" },
      private_key: { type: String, default: "" },
      calendarId: { type: String, default: "" },
    },
    token: {
      type: String,
    },
    img: {
      type: String,
      trim: true,
    },
    activo: {
      type: Boolean,
      default: false,
    },
    // TODO: Ver Que hacer con el campo de barberia
    barberia: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barberia",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

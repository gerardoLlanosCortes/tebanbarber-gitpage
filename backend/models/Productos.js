import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0, // Asegúrate de que el stock no sea negativo
    },
    precioBase: {
      type: Number,
      required: true,
    },
    precioFinal: {
      type: Number,
      required: true,
    },
    descuento: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Productos = mongoose.model("Producto", productoSchema);
export default Productos;

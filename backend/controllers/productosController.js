import Productos from "../models/Productos.js";
import cloudinary from "../utils/cloudinary.js";
import { handleNotFoundError, validateObjectId } from "../utils/index.js";

//!==== POST ====
const createProducto = async (req, res) => {
  const {
    nombre,
    descripcion,
    stock,
    precioBase,
    precioFinal,
    descuento,
    img,
  } = req.body;

  if (
    !nombre ||
    stock === undefined ||
    precioBase === undefined ||
    precioFinal === undefined ||
    !img
  ) {
    return res.status(400).json({
      msg: "Todos los campos son obligatorios",
    });
  }

  // Crear la URL amigable basada en el nombre del producto
  const url = nombre
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "") // Eliminar caracteres no deseados
    .replace(/\s+/g, "-"); // Reemplazar espacios con guiones

  try {
    if (img) {
      const uploadRes = await cloudinary.uploader.upload(img, {
        folder: "test",
      });

      if (uploadRes) {
        const nuevoProducto = new Productos({
          nombre,
          descripcion,
          stock,
          precioBase,
          precioFinal,
          descuento,
          img: uploadRes.secure_url,
          url,
        });
        await nuevoProducto.save();
        res.json(nuevoProducto);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al crear el producto",
    });
  }
};

//! ==== GET ALL ====
const getProductos = async (req, res) => {
  try {
    const productos = await Productos.find();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener los productos",
    });
  }
};

//! ==== GET ONE ====
const getProducto = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  try {
    const producto = await Productos.findById(id);
    if (!producto) {
      return handleNotFoundError("No existe un producto con ese id", res);
    }
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener el producto",
    });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const producto = await Productos.findById(id);
  if (!producto) {
    return handleNotFoundError("El producto no existe", res);
  }

  try {
    // Extraer el public_id de la URL de la imagen
    const imageUrl = producto.img;
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0]; // Asumiendo que la URL de la imagen sigue el formato de Cloudinary

    // Eliminar la imagen de Cloudinary
    await cloudinary.uploader.destroy(`test/${publicId}`);

    // Eliminar el producto de la base de datos
    await producto.deleteOne();

    res.json({
      msg: "El producto se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar el producto",
    });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const producto = await Productos.findById(id);
  if (!producto) {
    return handleNotFoundError("El producto no existe", res);
  }

  // Actualizar campos del producto
  producto.nombre = req.body.nombre || producto.nombre;
  producto.stock = req.body.stock || producto.stock;
  producto.precioBase = req.body.precioBase || producto.precioBase;
  producto.precioFinal = req.body.precioFinal || producto.precioFinal;
  producto.descuento = req.body.descuento || producto.descuento;
  producto.descripcion = req.body.descripcion || producto.descripcion;

  // Actualizar la URL si el nombre ha cambiado
  if (req.body.nombre) {
    producto.url = req.body.nombre
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "") // Eliminar caracteres no deseados
      .replace(/\s+/g, "-"); // Reemplazar espacios con guiones
  }

  try {
    if (req.body.img) {
      // Eliminar la imagen anterior de Cloudinary
      const imageUrl = producto.img;
      const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0]; // Asumiendo que la URL de la imagen sigue el formato de Cloudinary
      await cloudinary.uploader.destroy(`test/${publicId}`);

      // Subir la nueva imagen a Cloudinary
      const uploadRes = await cloudinary.uploader.upload(req.body.img, {
        folder: "test",
      });

      if (uploadRes) {
        producto.img = uploadRes.secure_url;
      }
    }

    await producto.save();
    res.json(producto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export {
  createProducto,
  getProducto,
  getProductos,
  deleteProducto,
  updateProducto,
};

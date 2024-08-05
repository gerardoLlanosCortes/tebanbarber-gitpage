import axios from "axios";
import { createContext, useState } from "react";
import axiosWithAuth from "../utils/axios";

const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/productos`
      );
      setProductos(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getProductById = async (id) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/productos/${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createProducto = async (producto) => {
    try {
      const { data } = await axiosWithAuth.post("/productos", producto);
      setProductos([...productos, data]);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      // Puedes manejar el error de creación del servicio aquí, como mostrar un mensaje de error al usuario.
      throw error;
    }
  };

  const deleteProducto = async (id) => {
    try {
      await axiosWithAuth.delete(`/productos/${id}`);

      const filterProductos = productos.filter(
        (producto) => producto._id !== id
      );
      setProductos(filterProductos);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateProducto = async (id, productData) => {
    try {
      const { data } = await axiosWithAuth.put(`/productos/${id}`, productData);

      const EditedProductos = productos.map((productoMap) =>
        productoMap._id === data._id ? data : productoMap
      );
      setProductos(EditedProductos);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        getProductos,
        getProductById,
        createProducto,
        deleteProducto,
        updateProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export { ProductosProvider };

export default ProductosContext;

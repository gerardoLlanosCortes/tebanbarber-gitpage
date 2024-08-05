import { useContext } from "react";
import ProductosContext from "../context/ProductosContext";

const useProductos = () => {
  return useContext(ProductosContext);
};

export default useProductos;

// CartContext.js
import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const calculateUpdatedCart = (prevCart, info) => {
    const updatedCart = [...prevCart];
    const productIndex = updatedCart.findIndex(
      (item) => item._id === info.producto._id
    );

    if (productIndex > -1) {
      // Calcular la nueva cantidad
      const newQuantity = updatedCart[productIndex].cantidad + info.count;
      console.log("Cantidad anterior:", updatedCart[productIndex].cantidad);
      console.log("Cantidad a agregar:", info.count);
      console.log("Nueva cantidad:", newQuantity);

      // Verificar si la nueva cantidad no excede el stock
      updatedCart[productIndex].cantidad = Math.min(
        newQuantity,
        info.producto.stock
      );
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad inicial
      const data = {
        _id: info.producto._id,
        nombre: info.producto.nombre,
        precioFinal: info.producto.precioFinal,
        precioBase: info.producto.precioBase,
        descuento: info.producto.descuento,
        stock: info.producto.stock,
        img: info.producto.img,
      };
      updatedCart.push({
        ...data,
        cantidad: Math.min(info.count, info.producto.stock),
      });
    }

    return updatedCart;
  };

  const addToCart = (info) => {
    // Obtener el carrito actual del localStorage o del estado
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calcular el carrito actualizado
    const updatedCart = calculateUpdatedCart(currentCart, info);

    // Actualizar el estado y el localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateItemQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId ? { ...item, cantidad: quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };

export default CartContext;

import { formatearPrecio } from "../../../utils";
import { useState, useContext } from "react";
import CartContext from "../../../context/CartContext";

export default function NavCartProduct({ item, removeFromCart }) {
  const { updateItemQuantity } = useContext(CartContext);
  const [selectedQuantity, setSelectedQuantity] = useState(item.cantidad);

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setSelectedQuantity(newQuantity);
    updateItemQuantity(item._id, newQuantity);
  };

  const renderOptions = () => {
    const maxOptions = 10;
    const options = [];
    for (let i = 1; i <= Math.min(item.stock, maxOptions); i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="flex gap-2 border-b border-b-agenda-primary pb-3 border-opacity-45">
      <img src={item.img} alt={item.nombre} className="w-[80px] rounded" />
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <span>{item.nombre}</span>
          <span>{formatearPrecio(item.precioFinal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <label className="text-sm">Cant:</label>
            <select
              name="cantidad"
              className="bg-agenda-bg-color text-sm cursor-pointer"
              value={selectedQuantity}
              onChange={handleQuantityChange}
            >
              {renderOptions()}
            </select>
          </div>
          <span
            className="text-sm txt text-red-600 cursor-pointer"
            onClick={() => removeFromCart(item._id)}
          >
            eliminar
          </span>
        </div>
      </div>
    </div>
  );
}

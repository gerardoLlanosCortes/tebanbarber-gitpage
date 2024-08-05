import { useState } from "react";

import useCart from "../../../hooks/useCart";
import { formatearPrecio } from "../../../utils";

export default function CartProduct({ item, removeFromCart }) {
  const { updateItemQuantity } = useCart();
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
    <div className="flex gap-3 border border-agenda-primary rounded p-3 border-opacity-40">
      <picture className="w-20">
        <img
          src={item.img}
          alt={item.nombre}
          className="object-cover w-full rounded"
        />
      </picture>
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between w-full">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold">{item.nombre}</span>
          <div className="flex items-center gap-1 flex-wrap">
            <span className={`text-xl font-bold ${"text-agenda-primary"}`}>
              {formatearPrecio(item.precioFinal)}
            </span>
            {item.descuento > 0 && (
              <div className="flex gap-2 items-center">
                <span className="text-agenda-primary opacity-70 line-through text-sm">
                  {item.precioBase}
                </span>
                <span className="border border-red-600 text-red-600 px-2 text-sm">
                  -{item.descuento}%
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex lg:flex-col justify-between items-center">
          <div className="flex items-center">
            <label className="text-sm">Cantidad:</label>
            <select
              name="cantidad"
              className="bg-agenda-bg-color text-sm"
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

import deleteTrashIcon from "../../../assets/img/icons/delete__trash.svg";
import editIcon from "../../../assets/img/icons/pencil-outline.svg";
import { formatearPrecio } from "../../../utils";

export default function Producto({
  producto,
  handleDeleteProductoClick,
  handleEditProductoClick,
}) {
  return (
    <div className=" w-full flex justify-between border-b pb-2 border-agenda-primary border-opacity-15">
      <div className="flex gap-3">
        <img
          src={producto.img}
          alt={producto.nombre}
          className="object-cover w-16 rounded"
        />

        <div className="flex flex-col h-full text-sm">
          <span className="font-semibold">{producto.nombre}</span>
          <div className="flex flex-col">
            <span>{formatearPrecio(producto.precioFinal)}</span>
            <span>dcto: {producto.descuento}%</span>
          </div>
          <span>stock: {producto.stock}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <img
          src={deleteTrashIcon}
          width={"20px"}
          onClick={() => handleDeleteProductoClick(producto)}
        />
        <img
          src={editIcon}
          width={"20px"}
          onClick={() => handleEditProductoClick(producto)}
        />
      </div>
    </div>
  );
}

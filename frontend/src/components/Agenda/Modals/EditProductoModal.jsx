import React, { useRef, useState } from "react";
import Close from "../../../assets/img/icons/close.svg";
import Reveal from "../../../utils/Reveal";

export default function EditProductoModal({
  productoToEdit,
  setShowEditModal,
  handleEditProducto,
}) {
  const fileInputRef = useRef(null); // Referencia para el input de archivo
  const [imgPreview, setImgPreview] = useState(productoToEdit.img);

  const [inputs, setInputs] = useState({
    nombre: productoToEdit.nombre,
    stock: productoToEdit.stock,
    precioBase: productoToEdit.precioBase,
    precioFinal: productoToEdit.precioFinal,
    descripcion: productoToEdit.descripcion,
    img: null,
    descuento: 0, // Agregar el campo para el porcentaje de descuento
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setInputs((prev) => ({
        ...prev,
        [name]: file,
      }));

      setImgPreview(URL.createObjectURL(file));
    } else {
      setInputs((prev) => {
        const newInputs = { ...prev, [name]: value };

        // Recalcular el porcentaje de descuento si se cambian precioBase o precioFinal
        if (name === "precioBase" || name === "precioFinal") {
          const precioBase = parseFloat(newInputs.precioBase);
          const precioFinal = parseFloat(newInputs.precioFinal);

          if (!isNaN(precioBase) && !isNaN(precioFinal) && precioBase > 0) {
            const descuento = ((precioFinal - precioBase) / precioBase) * 100;
            newInputs.descuento = Math.round(descuento);
          } else {
            newInputs.descuento = 0;
          }
        }

        return newInputs;
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center items-center">
      <Reveal
        y={-10}
        className="w-mobile lg:w-[30%] bg-white px-8 py-6 rounded-lg shadow-md flex flex-col items-center gap-4  max-h-[90vh] overflow-y-auto"
      >
        <div
          className="self-end absolute text-lg font-semibold text-agenda-primary"
          onClick={() => setShowEditModal(false)}
        >
          <img width={20} src={Close} alt="close icon" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-balance pt-6">
          Editar Producto: {productoToEdit.nombre}
        </h2>
        <form
          className="w-full flex flex-col items-start justify-center gap-5"
          onSubmit={(e) => handleEditProducto(e, productoToEdit._id, inputs)}
        >
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label>Nombre del Producto:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              required
              name="nombre"
              value={inputs.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label>Descripcion del Producto:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              name="descripcion"
              value={inputs.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label>Precio Base:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="number"
              name="precioBase"
              required
              value={inputs.precioBase}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label>
              Precio Final:{" "}
              <span className="text-sm">({inputs.descuento}%)</span>
            </label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="number"
              name="precioFinal"
              required
              value={inputs.precioFinal}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label>Stock:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="number"
              name="stock"
              required
              value={inputs.stock}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <label>Imagen:</label>
            <input
              className="outline-none border-0 rounded-none h-10 w-full text-base bg-transparent"
              type="file"
              name="img"
              ref={fileInputRef} // Asignar la referencia al input de archivo
              onChange={handleChange}
            />
            {imgPreview && (
              <img
                src={imgPreview}
                alt="Vista previa"
                className="mt-4 w-20 rounded"
              />
            )}
          </div>

          <div className="w-full flex items-center justify-between py-4">
            <button
              className="px-2 py-2  xs:py-3 xs:px-5 border-none rounded-lg text-white bg-red-600"
              onClick={() => setShowEditModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-2 py-2 xs:py-3 xs:px-5border-none rounded-lg text-white bg-agenda-primary"
            >
              Guardar
            </button>
          </div>
        </form>
      </Reveal>
    </div>
  );
}

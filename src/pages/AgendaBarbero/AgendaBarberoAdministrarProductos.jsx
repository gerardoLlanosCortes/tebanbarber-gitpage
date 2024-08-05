import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Agenda/Navigation/Header";
import Producto from "../../components/Agenda/Productos/Producto";
import useProductos from "../../hooks/useProductos";
import Modal from "../../components/Agenda/Modals/Modal";
import DeleteModal from "../../components/Agenda/Modals/DeleteModal";
import ActionLoader from "../../components/Agenda/Loaders/ActionLoader";
import MainLoader from "../../components/Agenda/Loaders/MainLoader";
import succesIcon from "../../assets/img/icons/success.png";
import DangerIcon from "../../assets/img/icons/danger__advice.png";
import EditProductoModal from "../../components/Agenda/Modals/EditProductoModal";
import Reveal from "../../utils/Reveal";

export default function AgendaBarberoAdministrarProductos() {
  const {
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto,
    productos,
  } = useProductos();
  const [imgPreview, setImgPreview] = useState(null);
  const [inputs, setInputs] = useState({
    nombre: "",
    stock: "",
    precioBase: "",
    precioFinal: "",
    descripcion: "",
    img: null,
    descuento: 0, // Agregar el campo para el porcentaje de descuento
  });
  const fileInputRef = useRef(null); // Referencia para el input de archivo
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState({});
  const [productoToEdit, setProductoToEdit] = useState({});

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        await getProductos();
      } catch (error) {
        console.log("error al obtener los productos", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const resetInputs = () => {
    setInputs({
      nombre: "",
      stock: "",
      precioBase: "",
      precioFinal: "",
      descripcion: "",
      img: null,
      descuento: 0,
    });
    setImgPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reiniciar el valor del input de archivo
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);

    if (inputs.img) {
      try {
        const base64 = await convertBase64(inputs.img);

        // Actualizar el estado con la imagen en base64
        const data = {
          ...inputs,
          img: base64,
        };

        // Enviar la solicitud POST con la imagen y otros datos
        await createProducto(data);
        resetInputs();
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Error al crear el producto:", error);
        setShowFailedModal(true);
      } finally {
        setIsLoadingAction(false);
      }
    } else {
      console.error("No se ha seleccionado ninguna imagen.");
    }
  };

  const handleDeleteProductoClick = (producto) => {
    setProductoToDelete(producto);
    setShowDeleteModal(true);
  };

  const handleDeleteProducto = async () => {
    setIsLoadingAction(true);
    try {
      await deleteProducto(productoToDelete._id);
    } catch (error) {
      console.log("error al eliminar el producto", error);
      setShowFailedModal(true);
    } finally {
      setShowDeleteModal(false);
      setIsLoadingAction(false);
    }
  };

  const handleEditProductoClick = (producto) => {
    setProductoToEdit(producto);
    setShowEditModal(true);
  };

  const handleEditProducto = async (e, id, data) => {
    setIsLoadingAction(true);
    e.preventDefault();
    try {
      if (data.img) {
        const base64 = await convertBase64(data.img);
        const dataWithImgUpdated = {
          ...data,
          img: base64,
        };
        await updateProducto(id, dataWithImgUpdated);
      } else {
        await updateProducto(id, data);
      }
    } catch (error) {
      setShowFailedModal(true);
      console.log("error al editar el producto", error);
    } finally {
      setShowEditModal(false);
      setIsLoadingAction(false);
    }
  };

  {
    if (isLoading) return <MainLoader />;
  }

  return (
    <div className="flex flex-col pb-32 text-agenda-black relative">
      {isLoadingAction && <ActionLoader />}

      <Header link={"barbero/administrar"} title={"Administrar Productos"} />
      <Reveal className="flex flex-col gap-16">
        <form
          className="flex flex-col justify-center gap-10"
          onSubmit={handleSubmit}
        >
          <div>
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
          <div>
            <label>Descripcion del Producto:</label>
            <input
              className="outline-none border-0 rounded-none border-b-[1.5px] border-b-[#ccc] h-10 w-full text-base bg-transparent"
              type="text"
              name="descripcion"
              value={inputs.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
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
          <div>
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
          <div>
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
          <div>
            <label>Imagen:</label>
            <input
              className="outline-none border-0 rounded-none h-10 w-full text-base bg-transparent"
              type="file"
              name="img"
              ref={fileInputRef} // Asignar la referencia al input de archivo
              required
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

          <div>
            <button
              className="w-full bg-agenda-primary text-white p-4 text-center rounded-lg border-none outline-none shadow-btn-agenda "
              type="submit"
            >
              Agregar Producto
            </button>
          </div>
        </form>

        <div className="flex flex-col w-full mx-auto gap-3">
          {productos.map((producto) => (
            <Producto
              key={producto._id}
              producto={producto}
              handleDeleteProductoClick={handleDeleteProductoClick}
              handleEditProductoClick={handleEditProductoClick}
            />
          ))}
        </div>
      </Reveal>
      {showSuccessModal && (
        <Modal
          source={succesIcon}
          alt={"success icon"}
          title="Porducto creado satisfactoriamente"
          message="El producto se agregó a la tienda, ya se puedes añadir más"
          onClose={() => setShowSuccessModal(!showSuccessModal)}
          btnContent={"Volver"}
        />
      )}

      {showFailedModal && (
        <Modal
          source={DangerIcon}
          alt={"error icon"}
          title="¡Error!"
          message="Se ha producido un error al ejecutar esta acción. Por favor, inténtelo de nuevo."
          onClose={() => setShowFailedModal(!showFailedModal)}
          btnContent={"Volver"}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          icono={DangerIcon}
          Titulo={`¿Estás seguro de eliminar el producto ${productoToDelete.nombre}`}
          // extra={`${accesoToDelete.email}?`}
          descripcion={
            "Esta acción no se podrá deshacer, eliminará para siempre este producto"
          }
          setShowModal={() => setShowDeleteModal(!showDeleteModal)}
          confirmDelete={handleDeleteProducto}
        />
      )}

      {showEditModal && (
        <EditProductoModal
          productoToEdit={productoToEdit}
          setShowEditModal={setShowEditModal}
          handleEditProducto={handleEditProducto}
        />
      )}
    </div>
  );
}

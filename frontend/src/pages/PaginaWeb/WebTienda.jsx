import { useEffect, useState } from "react";
import WebTiendaProducto from "../../components/Pagina/Tienda/WebTiendaProducto";
import Reveal from "../../utils/Reveal";
import ModalProducto from "../../components/Pagina/Modal/ModalProducto";

import Polvo from "../../assets/img/pagina/polvo.jpg";
import Cart from "../../assets/img/icons/cart.svg";
import PageHeader from "../../components/PageHeader";
import useProductos from "../../hooks/useProductos";
import CartAddAlert from "../../components/Pagina/Cart/CartAddAlert";

export default function WebTienda() {
  const { getProductos, productos } = useProductos();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        await getProductos();
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <PageHeader Title={"Tienda"} />

      <section className="relative flex flex-col gap-6 w-mobile lg:w-dekstop mx-auto py-20 md:py-32">
        <Reveal className={"flex flex-col gap-2 items-center"}>
          <div className="flex items-center w-full">
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
            <h2 className="mx-4 text-2xl font-bold uppercase text-center">
              Productos
            </h2>
            <div className="flex-grow border-t-2 border-agenda-primary"></div>
          </div>
          <p className="text-center text-pretty">
            Explora nuestros productos, realiza tu compra en línea y recoge tus
            artículos directamente en nuestro local.
          </p>
        </Reveal>

        <section className="grid grid-cols-12 gap-y-4 text-agenda-primary">
          {productos.map((producto) => (
            <WebTiendaProducto
              key={producto._id}
              producto={producto}
              setSelectedProduct={setSelectedProduct}
              setShowProductModal={setShowProductModal}
            />
          ))}
        </section>

        {showProductModal && (
          <ModalProducto
            producto={selectedProduct}
            onClose={() => setShowProductModal(false)}
          />
        )}
      </section>
    </div>
  );
}

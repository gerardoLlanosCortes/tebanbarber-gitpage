import React, { useEffect, useState } from "react";
import Header from "../../components/Pagina/Home/Header";
import Products from "../../components/Pagina/Home/Products";
import Servicios from "../../components/Pagina/Home/Servicios";
import AboutUs from "../../components/Pagina/Home/AboutUs";
import Resenas from "../../components/Pagina/Home/Resenas";
import Galeria from "../../components/Pagina/Home/Galeria";
import useServicios from "../../hooks/useServicios";
import useProductos from "../../hooks/useProductos";
import ModalProducto from "../../components/Pagina/Modal/ModalProducto";
import Polvo from "../../assets/img/pagina/polvo.jpg";

export default function WebHome() {
  const { getServicios, servicios } = useServicios();
  const { getProductos, productos } = useProductos();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        await Promise.all([getServicios(), getProductos()]);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="w-mobile lg:w-dekstop mx-auto">
        <Products
          productos={productos}
          setSelectedProduct={setSelectedProduct}
          setShowProductModal={setShowProductModal}
        />

        <Servicios servicios={servicios} />

        <AboutUs />

        <Resenas />

        <Galeria />

        {showProductModal && (
          <ModalProducto
            producto={selectedProduct}
            productImage={Polvo}
            onClose={() => setShowProductModal(false)}
          />
        )}
      </div>
    </div>
  );
}

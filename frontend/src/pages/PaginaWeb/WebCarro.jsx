import { Link } from "react-router-dom";
import CartProduct from "../../components/Pagina/Cart/CartProduct";
import useCart from "../../hooks/useCart";
import { formatearPrecio } from "../../utils";
import CartLogo from "../../assets/img/icons/cart_black.svg";
import Webpay from "../../assets/img/icons/webpay.png";
import { motion } from "framer-motion";

export default function WebCarro() {
  const { getItemCount, removeFromCart, cart } = useCart();

  return (
    <motion.div
      className={
        "flex flex-col gap-6 w-mobile lg:w-dekstop mx-auto text-agenda-primary pb-32 min-h-screen"
      }
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="flex gap-2 bg-slate-100 p-6 rounded w-full">
        <h1 className="text-3xl font-semibold w-full">
          Carro de Compras <span>({getItemCount()})</span>
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        {cart.length > 0 ? (
          <div className="flex flex-col gap-3 flex-grow ">
            {cart.map((item) => (
              <CartProduct
                key={item._id}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2 p-4 pb-2 text-center items-center font-normal">
            <picture className="w-16 mx-auto">
              <img
                src={CartLogo}
                alt="logo de carrito"
                className="block w-full"
              />
            </picture>
            <div className="flex flex-col gap-4 w-full">
              <div>
                <p>Tu carro está vacío</p>
                <p className="text-sm text-pretty">
                  ¡Descubre todos los productos que tenemos para ti!
                </p>
              </div>
              <Link
                to={"/tienda"}
                className="bg-agenda-primary hover:bg-agenda-primary-clear transition-all text-white p-3 w-full rounded"
              >
                Ver Productos
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex flex-col bg-slate-100 p-6 w-full lg:w-[300px] gap-3 rounded">
            <h2 className="text-xl font-bold">Resumen</h2>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="font-bold">
                {formatearPrecio(
                  cart.reduce(
                    (total, item) => total + item.precioFinal * item.cantidad,
                    0
                  )
                )}
              </span>
            </div>
            <button
              className="w-full bg-agenda-primary text-white p-2 rounded hover:bg-agenda-primary-clear transition-all disabled:bg-agenda-gray"
              disabled={cart.length <= 0}
            >
              Continuar
            </button>
            <Link
              to={"/tienda"}
              className="text-center text-agenda-primary underline"
            >
              Seguir comprando
            </Link>
          </div>
          <div className="flex flex-col bg-slate-100 p-6 w-full lg:w-[300px] gap-3 rounded">
            <h2 className="text-xl font-bold">Aceptamos</h2>
            <img src={Webpay} alt="webpay" width={150} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

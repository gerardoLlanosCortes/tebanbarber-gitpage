import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/PaginaWeb/WebHome";
import AgendaHome from "./pages/AgendaUsuario/AgendaHome";
import AgendaServicios from "./pages/AgendaUsuario/AgendaServicios";
import AgendaHoras from "./pages/AgendaUsuario/AgendaHoras";
import AgendaContacto from "./pages/AgendaUsuario/AgendaContacto";
import AgendaUbicacion from "./pages/AgendaUsuario/AgendaUbicacion";
import AgendaCancelar from "./pages/AgendaUsuario/AgendaCancelar";
import AgendaCancelarHoras from "./pages/AgendaUsuario/AgendaCancelarHoras";
import AgendaLegal from "./pages/AgendaUsuario/AgendaLegal";
import AgendaBarberoHome from "./pages/AgendaBarbero/AgendaBarberoHome";
import AgendaBarberoAgregarFechas from "./pages/AgendaBarbero/AgendaBarberoAgregarFechas";
import AgendaBarberoGestionarFechas from "./pages/AgendaBarbero/AgendaBarberoGestionarFechas";
import AgendaBarberoPerfil from "./pages/AgendaBarbero/AgendaBarberoPerfil";
import AgendaBarberoLogin from "./pages/AgendaBarbero/AgendaBarberoLogin";
import AgendaBarberoAdministrarUsuarios from "./pages/AgendaBarbero/AgendaBarberoAdministrarUsuarios";
import AgendaBarberoRutaProtegida from "./pages/AgendaBarbero/AgendaBarberoRutaProtegida";
import AgendaBarberoCalendario from "./pages/AgendaBarbero/AgendaBarberoCalendario";
import AgendaBarberoRegister from "./pages/AgendaBarbero/AgendaBarberoRegister";
import AgendaBarberoGestionarServicios from "./pages/AgendaBarbero/AgendaBarberoGestionarServicios";
import NotFoundPage from "./components/NotFoundPage";
import { FechasProvider } from "./context/FechasContext";
import { TipoServicioProvider } from "./context/TipoServicioContext";
import { ServiciosProvider } from "./context/ServiciosContext";
import { CorreosProvider } from "./context/CorreosContext";
import { CalendarioGoogleProvider } from "./context/CalendarioGoogleContext";
import { AgendasProvider } from "./context/AgendasContext";
import { AuthProvider } from "./context/AuthContext";
import { UsuariosProvider } from "./context/UsuariosContext";

import "./formInputs.css";
import "./reactCalendar.css";
import "./carousel.css";
import AgendaBarberoAdministrarServicios from "./pages/AgendaBarbero/AgendaBarberoAdministrarServicios";
import AgendaBarberoAdministrarTiposServicios from "./pages/AgendaBarbero/AgendaBarberoAdministrarTiposServicios";
import AgendaBarberoAdministrarAcceso from "./pages/AgendaBarbero/AgendaBarberoAdministrarAcceso";
import { AccesosProvider } from "./context/AccesosContext";
import AgendaBarberoHomeAdministrar from "./pages/AgendaBarbero/AgendaBarberoHomeAdministrar";
import AgendaBarberoRutaProtegidaAdmin from "./pages/AgendaBarbero/AgendaBarberoRutaProtegidaAdmin";
import AgendaBarberoOlvidePassword from "./pages/AgendaBarbero/AgendaBarberoOlvidePassword";
import AgendaBarberoRestablecerPassword from "./pages/AgendaBarbero/AgendaBarberRestablecerPassword";

import WebServicios from "./pages/PaginaWeb/WebServicios";
import WebGaleria from "./pages/PaginaWeb/WebGaleria";
import WebTienda from "./pages/PaginaWeb/WebTienda";
import WebLayout from "./components/Pagina/WebLayout";
import WebUbicacion from "./pages/PaginaWeb/WebUbicacion";
import WebHome from "./pages/PaginaWeb/WebHome";
import WebCarro from "./pages/PaginaWeb/WebCarro";
import { ProductosProvider } from "./context/ProductosContext";
import { CartProvider } from "./context/CartContext";
import AgendaBarberoAdministrarProductos from "./pages/AgendaBarbero/AgendaBarberoAdministrarProductos";
import AgendaBarberoAdministrarAviso from "./pages/AgendaBarbero/AgendaBarberoAdministrarAviso";
import { AvisoProvider } from "./context/AvisosContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsuariosProvider>
          <AccesosProvider>
            <AvisoProvider>
              <AgendasProvider>
                <FechasProvider>
                  <CartProvider>
                    <ServiciosProvider>
                      <ProductosProvider>
                        <CorreosProvider>
                          <CalendarioGoogleProvider>
                            <TipoServicioProvider>
                              <Routes>
                                {/* Página Web */}
                                <Route
                                  path="/"
                                  element={<WebLayout></WebLayout>}
                                >
                                  <Route index element={<WebHome></WebHome>} />
                                  <Route
                                    path="/servicios"
                                    element={<WebServicios></WebServicios>}
                                  />
                                  <Route
                                    path="/galeria"
                                    element={<WebGaleria></WebGaleria>}
                                  />

                                  <Route
                                    path="/ubicacion"
                                    element={<WebUbicacion></WebUbicacion>}
                                  />
                                  <Route
                                    path="/tienda"
                                    element={<WebTienda></WebTienda>}
                                  />
                                  <Route
                                    path="/carro"
                                    element={<WebCarro></WebCarro>}
                                  />

                                  {/* Agenda */}
                                  <Route path="/agenda">
                                    <Route
                                      index
                                      element={<AgendaHome></AgendaHome>}
                                    />
                                    <Route
                                      path="/agenda/servicios"
                                      element={
                                        <AgendaServicios></AgendaServicios>
                                      }
                                    />
                                    <Route
                                      path="/agenda/horas"
                                      element={<AgendaHoras></AgendaHoras>}
                                    />
                                    <Route
                                      path="/agenda/contacto"
                                      element={
                                        <AgendaContacto></AgendaContacto>
                                      }
                                    />
                                    <Route
                                      path="/agenda/ubicacion"
                                      element={
                                        <AgendaUbicacion></AgendaUbicacion>
                                      }
                                    />
                                    <Route
                                      path="/agenda/cancelar"
                                      element={
                                        <AgendaCancelar></AgendaCancelar>
                                      }
                                    />
                                    <Route
                                      path="/agenda/cancelar/:email"
                                      element={
                                        <AgendaCancelarHoras></AgendaCancelarHoras>
                                      }
                                    />
                                    <Route
                                      path="/agenda/legal"
                                      element={<AgendaLegal></AgendaLegal>}
                                    />
                                  </Route>

                                  {/* Control se sesiones */}
                                  <Route
                                    path="/login"
                                    element={
                                      <AgendaBarberoLogin></AgendaBarberoLogin>
                                    }
                                  />

                                  <Route
                                    path="/registro"
                                    element={
                                      <AgendaBarberoRegister></AgendaBarberoRegister>
                                    }
                                  />

                                  <Route
                                    path="/olvidar-contraseña"
                                    element={
                                      <AgendaBarberoOlvidePassword></AgendaBarberoOlvidePassword>
                                    }
                                  />

                                  <Route
                                    path="/restablecer-contraseña"
                                    element={
                                      <AgendaBarberoRestablecerPassword></AgendaBarberoRestablecerPassword>
                                    }
                                  />
                                </Route>

                                {/* RUTE PROTEGIDA DE BARBERO */}
                                <Route
                                  path="/barbero"
                                  element={
                                    <AgendaBarberoRutaProtegida></AgendaBarberoRutaProtegida>
                                  }
                                >
                                  <Route
                                    index
                                    element={
                                      <AgendaBarberoHome></AgendaBarberoHome>
                                    }
                                  />
                                  <Route
                                    path="/barbero/agregar-fechas"
                                    element={
                                      <AgendaBarberoAgregarFechas></AgendaBarberoAgregarFechas>
                                    }
                                  />
                                  <Route
                                    path="/barbero/gestionar-servicios"
                                    element={
                                      <AgendaBarberoGestionarServicios></AgendaBarberoGestionarServicios>
                                    }
                                  />
                                  <Route
                                    path="/barbero/gestionar-fechas"
                                    element={
                                      <AgendaBarberoGestionarFechas></AgendaBarberoGestionarFechas>
                                    }
                                  />
                                  <Route
                                    path="/barbero/calendario"
                                    element={
                                      <AgendaBarberoCalendario></AgendaBarberoCalendario>
                                    }
                                  />
                                  <Route
                                    path="/barbero/perfil"
                                    element={
                                      <AgendaBarberoPerfil></AgendaBarberoPerfil>
                                    }
                                  />

                                  {/* RUTA PROTEGIDA DE Admin */}
                                  <Route
                                    path="/barbero/administrar"
                                    element={
                                      <AgendaBarberoRutaProtegidaAdmin></AgendaBarberoRutaProtegidaAdmin>
                                    }
                                  >
                                    <Route
                                      index
                                      element={
                                        <AgendaBarberoHomeAdministrar></AgendaBarberoHomeAdministrar>
                                      }
                                    />
                                    <Route
                                      path="/barbero/administrar/servicios"
                                      element={
                                        <AgendaBarberoAdministrarServicios></AgendaBarberoAdministrarServicios>
                                      }
                                    />
                                    <Route
                                      path="/barbero/administrar/tipo-servicio"
                                      element={
                                        <AgendaBarberoAdministrarTiposServicios></AgendaBarberoAdministrarTiposServicios>
                                      }
                                    />

                                    <Route
                                      path="/barbero/administrar/usuarios"
                                      element={
                                        <AgendaBarberoAdministrarUsuarios></AgendaBarberoAdministrarUsuarios>
                                      }
                                    />
                                    <Route
                                      path="/barbero/administrar/productos"
                                      element={
                                        <AgendaBarberoAdministrarProductos></AgendaBarberoAdministrarProductos>
                                      }
                                    />
                                    <Route
                                      path="/barbero/administrar/avisos"
                                      element={
                                        <AgendaBarberoAdministrarAviso></AgendaBarberoAdministrarAviso>
                                      }
                                    />
                                    <Route
                                      path="/barbero/administrar/acceso"
                                      element={
                                        <AgendaBarberoAdministrarAcceso></AgendaBarberoAdministrarAcceso>
                                      }
                                    />
                                  </Route>
                                </Route>

                                {/* Ruta 404 */}
                                <Route path="*" element={<NotFoundPage />} />
                              </Routes>
                            </TipoServicioProvider>
                          </CalendarioGoogleProvider>
                        </CorreosProvider>
                      </ProductosProvider>
                    </ServiciosProvider>
                  </CartProvider>
                </FechasProvider>
              </AgendasProvider>
            </AvisoProvider>
          </AccesosProvider>
        </UsuariosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

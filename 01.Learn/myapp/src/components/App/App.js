import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contacto from "../pages/Contacto";
import Producto from "../pages/Producto";
import NuevoProducto from "../pages/NuevoProducto";
import NoAutorizado from "../pages/NoAutorizado";
import NoEncontrado from "../pages/NoEncontrado";
import { estaAutenticado } from "../../utils/auth";
import { TemaProvider } from "../theme/TemaContext";

function App() {
  return (
    <TemaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path='/productos' element={<Producto />}>
            <Route path='nuevo'
              element={
                estaAutenticado() ?
                  <NuevoProducto /> :
                  <Navigate to="/no-autorizado" />}
            />
          </Route>
          <Route path="/no-autorizado" element={<NoAutorizado />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </BrowserRouter>
    </TemaProvider>
  );
}

export default App;

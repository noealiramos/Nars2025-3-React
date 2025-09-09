import { useContext } from "react";
import { TemaContext } from "./TemaContext";

function EstilosGlobales({ children }) {
  const { modoOscuro } = useContext(TemaContext);

  const estilos = {
    backgroundColor: modoOscuro ? "#333" : "#eee",
    color: modoOscuro ? "#eee" : "#333",
    padding: "2rem",
    minHeight: "100vh",
    transition: "all 0.3 ease"
  }

  return (
    <div style={estilos}>
      {children}
    </div>
  );
}

export default EstilosGlobales;
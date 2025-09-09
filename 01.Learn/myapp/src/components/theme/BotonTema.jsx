import { useContext } from "react";
import { TemaContext } from "./TemaContext";

function BotonTema() {
  const { modoOscuro, toggleTema } = useContext(TemaContext);

  return (
    <button onClick={toggleTema}>
      Cambiar a {modoOscuro ? "claro" : "oscuro"}
    </button>
  );
}

export default BotonTema;
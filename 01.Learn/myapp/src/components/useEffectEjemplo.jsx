import { useEffect } from "react";

function Ejemplo() {
  useEffect(() => {
    console.log("El componente se montó");

    //Limpieza
    return () => {
      console.log("El componente se desmontó");
    };
  }, []);

  return <p>Hola desde REACT</p>
}

export default Ejemplo;
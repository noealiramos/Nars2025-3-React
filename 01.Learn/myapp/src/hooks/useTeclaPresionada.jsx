import { useEffect, useState } from "react";

function useTeclaPresionada(teclaObjetivo) {
  const [presionada, setPresionada] = useState(false);

  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === teclaObjetivo) setPresionada(true);
    };

    const alLiberar = (e) => {
      if (e.key === teclaObjetivo) setPresionada(false);
    };

    window.addEventListener("keydown", alPresionar);
    window.addEventListener("keyup", alLiberar);
  }, [teclaObjetivo]);

  return presionada;
}

export default useTeclaPresionada;
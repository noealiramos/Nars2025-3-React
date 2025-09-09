import { useState } from "react";

function useContador(valorInicial = 0) {
  const [contador, setContador] = useState(valorInicial);

  const incrementar = () => setContador((c) => c + 1);
  const decrementar = () => setContador((c) => c - 1);
  const reiniciar = () => setContador(valorInicial);

  return { contador, incrementar, decrementar, reiniciar };
}

export default useContador;
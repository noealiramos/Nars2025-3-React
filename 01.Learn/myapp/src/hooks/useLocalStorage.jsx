import { useState, useEffect } from "react";

function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const item = window.localStorage.getItem(clave);
    return item ? JSON.parse(item) : valorInicial;
  });

  useEffect(() => {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  }, [clave, valor]);

  return [valor, setValor];
}

export default useLocalStorage;

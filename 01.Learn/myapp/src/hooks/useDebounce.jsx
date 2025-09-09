import { useState, useEffect } from "react";

function useDebounce(valor, retraso = 3000) {
  const [debounced, setDebounced] = useState(valor);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(valor), retraso);
    return () => clearTimeout(id);

  }, [valor, retraso]);

  return debounced;
}

export default useDebounce;
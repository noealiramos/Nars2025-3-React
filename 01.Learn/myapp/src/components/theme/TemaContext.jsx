import { createContext, useState } from "react";

export const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleTema = () => setModoOscuro(prev => !prev);

  return (
    <TemaContext.Provider value={{ modoOscuro, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
}
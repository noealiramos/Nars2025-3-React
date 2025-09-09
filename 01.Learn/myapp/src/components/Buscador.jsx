import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

function Buscador() {
  const [term, setTerm] = useState("");
  const debTerm = useDebounce(term);

  return (
    <div style={{ padding: 20 }}>
      <input placeholder="Buscar..."
        value={term}
        onChange={(e) => setTerm(e.target.value)} />
      <p>Buscaste: {debTerm}</p>
    </div>
  );
}

export default Buscador;
import { useState } from "react";

function NuevoProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Producto agregado: ${nombre} - ${precio}`);
    setNombre("");
    setPrecio("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo producto</h3>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="text"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  );
}

export default NuevoProducto;

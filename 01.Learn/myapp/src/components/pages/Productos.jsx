import { Outlet, Link } from "react-router-dom";

const productos = [
  { id: 1, nombre: "Camiseta", precio: "$150" },
  { id: 2, nombre: "Pantalón", precio: "$300" },
  { id: 3, nombre: "Zapatos", precio: "$500" },
];

function Productos() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos disponibles</h2>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.nombre} - {prod.precio}
          </li>
        ))}
      </ul>
      <Link to="nuevo">Agregar nuevo producto</Link>
      <hr />
      <Outlet />
    </div>
  );
}

export default Productos;

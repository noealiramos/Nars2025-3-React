import { useState, useEffect } from "react";

export default function ListaConFetch() {
  const [usuarios, setUsuarios] = useState();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la consulta de los datos");
        return res.json()
      })
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios", error);
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios && usuarios.map((u) => {
          return (
            <li key={u.id}>
              {u.name} | {u.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
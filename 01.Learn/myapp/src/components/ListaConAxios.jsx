import { useState, useEffect } from "react";
import axios from "axios";

export default function ListaConAxios() {
  const [posts, setPosts] = useState();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        setError("Error al obtener los posts")
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <h2>Publicaciones</h2>
      <ul>
        {posts && posts.map((p) => {
          return (<li key={p.id}>{p.title}</li>)
        })}
      </ul>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
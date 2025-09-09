import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("No fue posible cargar los productos");
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <p>❌ {error}</p>
  }
  if (loading) {
    return <p>🛒 Cargando Productos...</p>
  }

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      {(products && products.length > 0) ?
        <ul>
          {products.map((p) => {
            return (<li key={p.id}>
              <h3>{p.title}</h3>
              <img src={p.image} alt={p.title} width="150" />
              <p><strong>Precio:</strong> ${p.price}</p>
              <p><strong>Categoria:</strong> {p.category}</p>
              <p><strong>Descripcion:</strong> {p.description}</p>
              <p><strong>Rating:</strong> {p.rating.rate}⭐ ({p.rating.count} reviews)</p>
            </li>)
          })}
        </ul> :
        <p><strong>No hay productos para mostrar</strong></p>
      }

    </div>
  );
}

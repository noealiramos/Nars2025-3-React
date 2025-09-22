import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products as mock } from "../../data/products";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., fetching from API)
    const t = setTimeout(() => {
      setProducts(mock);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleAdd = (product) => {
    alert(`Agregado: ${product.name}`);
  };

  return (
    <section>
      <h1 className="page-title">Productos</h1>
      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i} />
          ))}
        </div>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      )}
    </section>
  );
}

import React, { useMemo, useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Input from "../../components/Input";
import { products as data } from "../../data/products";
import "../../App.css";
import "./Home.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700); // simulación de carga
    return () => clearTimeout(t);
  }, []);

  const products = useMemo(() => {
    return data.filter((p) => {
      const matches = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const inStock = !onlyInStock || p.stock > 0;
      return matches && inStock;
    });
  }, [searchTerm, onlyInStock]);

  return (
    <div className="container">
      <header className="App-header">
        <h1>🛒 Mi Tienda Online</h1>
        <p>Reto 2 — Layout + Páginas (continuidad Reto 1)</p>
        <div className="filters">
          <Input
            label="Buscar productos"
            type="text"
            placeholder="Escribe aquí..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
            />
            Solo en stock
          </label>
        </div>
      </header>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i} />
          ))}
        </div>
      ) : (
        <main className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <p style={{ gridColumn: "1 / -1" }}>No se encontraron productos.</p>
          )}
        </main>
      )}
    </div>
  );
}

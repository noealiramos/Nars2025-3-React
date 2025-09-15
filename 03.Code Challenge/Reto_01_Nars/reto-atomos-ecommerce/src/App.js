import React, { useMemo, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Input from "./components/Input";
import { products as data } from "./data/products";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const products = useMemo(() => {
    return data.filter((p) => {
      const matches = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const inStock = !onlyInStock || p.stock > 0;
      return matches && inStock;
    });
  }, [searchTerm, onlyInStock]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 Mi Tienda Online</h1>
        <p>Reto de Componentes Atómicos</p>
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
            Mostrar solo en stock
          </label>
        </div>
      </header>

      <main className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
          <p style={{ gridColumn: "1 / -1" }}>No se encontraron productos.</p>
        )}
      </main>
    </div>
  );
}

export default App;

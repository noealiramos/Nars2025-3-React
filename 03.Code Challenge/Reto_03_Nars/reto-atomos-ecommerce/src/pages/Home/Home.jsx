import React, { useMemo, useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Input from "../../components/Input";
import "../../App.css";
import "./Home.css";
import { fetchProducts } from "../../services/productService";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts({ minDelay: 1200, maxDelay: 2500, failRate: 0 });
        if (isMounted) setProducts(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Error cargando productos");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchesTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        (p.description || "").toLowerCase().includes(term);
      const matchesStock = !onlyInStock || p.inStock === true;
      return matchesTerm && matchesStock;
    });
  }, [products, searchTerm, onlyInStock]);

  return (
    <div className="container">
      <header className="toolbar">
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="checkbox">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
          <span>Solo en stock</span>
        </label>
      </header>

      {loading ? (
        <section className="skeleton-grid" aria-busy="true" aria-live="polite">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </section>
      ) : error ? (
        <div className="center" role="alert" style={{ minHeight: 240 }}>
          <p>Ocurrió un problema: {error}</p>
          <button className="btn" onClick={() => {
            // reintentar cargando de nuevo
            setLoading(true);
            setError(null);
            // disparar de nuevo el efecto recreando dependencia (hack simple)
            // Mejor práctica: extraer load() arriba y llamarlo aquí.
            (async () => {
              try {
                const data = await fetchProducts({ minDelay: 800, maxDelay: 1800, failRate: 0 });
                setProducts(data);
              } catch (err) {
                setError(err.message || "Error cargando productos");
              } finally {
                setLoading(false);
              }
            })();
          }}>Reintentar</button>
        </div>
      ) : (
        <main className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filtered.length === 0 && (
            <p style={{ gridColumn: "1 / -1" }}>No se encontraron productos.</p>
          )}
        </main>
      )}
    </div>
  );
}

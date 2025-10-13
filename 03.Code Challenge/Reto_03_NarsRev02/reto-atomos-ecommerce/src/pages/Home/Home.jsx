import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  async function load() {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchProducts({ minDelayMs: 1500, maxDelayMs: 2500, failRate: 0 });
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        fontWeight: 600
      }}>
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Ocurrió un error: {error}</p>
        <button onClick={load}>Reintentar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Productos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {
          (products && products.length > 0) ? (
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p>No hay productos.</p>
          )
        }
      </div>
    </div>
  );
}
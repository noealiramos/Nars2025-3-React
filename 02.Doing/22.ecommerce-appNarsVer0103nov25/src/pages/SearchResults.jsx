import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/common/Button";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loading from "../components/common/Loading/Loading";
import List from "../components/List/List";
import { fetchProducts } from "../services/productService";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const query = (searchParams.get("q") || "").trim();
  const hasQuery = query.length > 0;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (isMounted) setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) return [];

    const normalizedQuery = query.toLowerCase();

    let result = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(normalizedQuery);
      const matchesDescription = product.description
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesCategory = product.category.name
        .toLowerCase()
        .includes(normalizedQuery);
      return matchesName || matchesDescription || matchesCategory;
    });

    result = result.sort((a, b) => {
      let valA = sortBy === "price" ? a.price : a.name.toLowerCase();
      let valB = sortBy === "price" ? b.price : b.name.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [query, products, sortBy, sortOrder]);

  const showNoResults = hasQuery && !loading && filteredProducts.length === 0;
  return (
    <div className="search-results">
      <header className="search-results-header">
        <div>
          <h1 className="search-results-title">
            {hasQuery ? `Resultados para ${query}` : `Explora nuestro catálogo`}
          </h1>
          <p className="search-results-description">
            {hasQuery
              ? `Estos son los productos que encontramos basados en tu búsqueda`
              : `Usa la barra de búsqueda para encontrar rápidamente lo que necesitas.`}
          </p>
        </div>
      </header>
      {hasQuery && (
        <div className="search-results-controls">
          <label>Ordenar por: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
          <Button
            type="button"
            className="sort-btn"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "Ascendente" : "Descendente"}
          </Button>
        </div>
      )}
      {loading && (
        <Loading>
          <h3>Buscando productos...</h3>
          <p>Esto puede tomar unos segundos.</p>
        </Loading>
      )}
      {!loading && showNoResults && (
        <ErrorMessage>
          <h3>No encontramos coincidencias</h3>
          <p>
            Prueba con otros términos o recorre nuestras{" "}
            <Link to="/offers">ofertas destacadas</Link>
          </p>
        </ErrorMessage>
      )}
      {!loading && hasQuery && !showNoResults && (
        <List
          products={filteredProducts}
          layout="vertical"
          title={`Resultados para ${query}`}
        ></List>
      )}
      {!loading && !hasQuery && (
        <ErrorMessage>
          <h3>¿Buscas algo en especial?</h3>
          <p>
            Comienza a escribir en la barra de búsqueda y te mostraremos los
            resultados aquí mismo.
          </p>
        </ErrorMessage>
      )}
    </div>
  );
}

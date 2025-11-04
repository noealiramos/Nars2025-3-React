import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loading from "../components/common/Loading/Loading";
import List from "../components/List/List";
import homeImages from "../data/homeImages.json";
import { fetchProducts } from "../services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        setError("No se pudieron cargar los productos. Intenta más tarde.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <BannerCarousel banners={homeImages} />
      {loading ? (
        <Loading>Cargando Productos...</Loading>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : products.length > 0 ? (
        <List
          title="Productos recomendados"
          products={products}
          layout="grid"
        ></List>
      ) : (
        <ErrorMessage>No hay productos en el catálogo</ErrorMessage>
      )}
    </div>
  );
}
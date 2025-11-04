import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProductById } from "../../services/productService";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage/ErrorMessage";
import Loading from "../common/Loading/Loading";

export default function ProductDetails({ productId }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(productId)
      .then((foundProduct) => {
        setProduct(foundProduct);
      })
      .catch(() => setError("Ocurrió un error al cargar el producto,"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return <Loading>Cargando Producto...</Loading>;
  }

  if (error) {
    return (
      <ErrorMessage>
        <p>
          Revisa nuestra <Link to="/">página principal</Link> o explora otras
          categorías
        </p>
        <span>{error}</span>
      </ErrorMessage>
    );
  }

  if (!product) return null;

  const { name, description, price, stock, imagesUrl, category } = product;
  const stockBadge = stock > 0 ? "success" : "error";
  const stockLabel = stock > 0 ? "En stock" : "Agotado";

  return (
    <div className="product-container">
      <nav className="product-navigation">
        <Link to="/">Inicio</Link>
        <Link to={`/category/${category._id}`}>${category.name}</Link>
      </nav>
      <div className="product-details">
        <div className="product-images">
          {imagesUrl?.map((img, index) => {
            return <img key={index} src={img} alt={name} />;
          })}
        </div>
        <div className="product-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <span>{price}</span>
          <span className={`${stockBadge}`}>{stockLabel}</span>
        </div>
        <div className="product-actions">
          <Button onClick={(e) => addToCart(e)}>Agregar al carrito</Button>
          <Link to="/cart">Ver el carrito</Link>
        </div>
      </div>
    </div>
  );
}

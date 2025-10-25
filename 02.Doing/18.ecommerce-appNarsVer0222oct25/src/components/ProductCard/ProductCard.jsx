import { useCart } from "../../context/CartContext";
import Badge from "../common/Badge";
import Button from "../common/Button";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { name, price, stock, imagesUrl, description } = product;

  // Validación de props básica
  if (!product) {
    return (
      <div
        className="product-card"
        style={{ padding: "24px", textAlign: "center" }}
      >
        <p className="muted">Producto no disponible</p>
      </div>
    );
  }

  // Determinar el estado del stock
  const stockBadge =
    stock > 0
      ? { text: "En stock", variant: "success" }
      : { text: "Agotado", variant: "error" };

  // Si hay descuento, agregar badge de descuento (ejemplo)
  const hasDiscount = product.discount && product.discount > 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
    console.log(product, "agregado al carrito");
  };

  return (
    <div className="product-card">
      <img
        src={imagesUrl ? imagesUrl[0] : "/img/products/placeholder.svg"}
        alt={name}
        className="product-card-image"
        onError={(e) => {
          e.target.src = "/img/products/placeholder.svg";
        }}
      />

      <h3 className="product-card-title">{name}</h3>

      {description && (
        <p className="muted" style={{ fontSize: "13px", marginBottom: "8px" }}>
          {description.length > 60
            ? `${description.substring(0, 60)}...`
            : description}
        </p>
      )}

      <div className="product-card-price">${price}</div>

      <div className="product-card-actions">
        <div style={{ display: "flex", gap: "8px" }}>
          <Badge text={stockBadge.text} variant={stockBadge.variant} />
          {hasDiscount && (
            <Badge text={`-${product.discount}%`} variant="warning" />
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          disabled={stock === 0}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

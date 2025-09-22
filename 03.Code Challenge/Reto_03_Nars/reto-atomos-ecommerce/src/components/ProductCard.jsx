import React from "react";
import "./ProductCard.css";
import Badge from "./Badge";
import Button from "./Button";
import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  const inStock = product.stock > 0;
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <div className="meta">
        <Badge
          text={inStock ? "En stock" : "Agotado"}
          variant={inStock ? "success" : "error"}
        />
        {product.tag && <Badge text={product.tag} variant="warning" />}
      </div>
      <Button
        variant="primary"
        onClick={() => alert(`Agregado: ${product.name}`)}
        disabled={!inStock}
      >
        Agregar al carrito
      </Button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    tag: PropTypes.string,
  }).isRequired,
};

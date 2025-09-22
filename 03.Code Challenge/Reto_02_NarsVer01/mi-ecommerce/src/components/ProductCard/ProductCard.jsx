import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product, onAdd }) {
  const { name, price, image, description, stock = 0 } = product;

  return (
    <article className="card" aria-label={name}>
      <div className="card-media">
        <img src={image} alt={name} loading="lazy" />
        {stock === 0 && <span className="badge badge-error">Agotado</span>}
        {stock > 0 && <span className="badge badge-success">En stock</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-desc">{description}</p>
        <div className="card-row">
          <span className="price">${price.toLocaleString()}</span>
          <button
            className="btn"
            onClick={() => onAdd?.(product)}
            disabled={stock === 0}
            aria-disabled={stock === 0}
          >
            {stock === 0 ? "No disponible" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}

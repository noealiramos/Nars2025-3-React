import React from "react";

export default function Gallery({ photos, onSelect }) {
  return (
    <div>
      <h1>Galería de Fotos</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,lfr)",
          gap: "10px",
        }}
      >
        {photos && photos.map((p) => {
          return <img
            key={p.id}
            src={p.url}
            alt={`Foto ${p.id}`}
            width="200"
            loading="lazy"
            style={{ cursor: "pointer", borderRadius: "8px" }}
            onClick={() => onSelect(p)}
          />;
        })}
      </div>
    </div>
  );
}
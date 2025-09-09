import React from "react";

export default function PhotoViewer({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      <img
        src={photo.url}
        alt={`Foto ${photo.id}`}
        width="600"
        style={{ borderRadius: "12px" }}
      />
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#FFF",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >Cerrar</button>
    </div>
  );
}
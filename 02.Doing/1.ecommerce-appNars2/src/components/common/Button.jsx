import React from "react";

export default function Button({ children, onClick, type, disabled }) {
  return (
    <button
      type={type}
      style={{
        padding: "1rem",
        borderRadius: 8,
        border: "1px solid #000",
        background: disabled ? "#fff" : "#c3c3c3",
        color: "#000",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

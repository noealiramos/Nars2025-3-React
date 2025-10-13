import React from "react";
import "./layout.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Nars Shop — Reto Semana 2 (React).</p>
        <p className="muted">Continuidad del Reto 1 con layout y páginas.</p>
      </div>
    </footer>
  );
}

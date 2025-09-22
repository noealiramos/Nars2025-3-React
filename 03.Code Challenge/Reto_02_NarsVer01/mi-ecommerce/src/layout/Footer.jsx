import React from "react";
import "./layout.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Nars Shop — Reto Semana 2 (React).</p>
        <p className="muted">
          Construido para el curso Inadaptados. Demo sin fines comerciales.
        </p>
      </div>
    </footer>
  );
}

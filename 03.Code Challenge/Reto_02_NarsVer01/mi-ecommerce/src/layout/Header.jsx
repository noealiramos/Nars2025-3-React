import React from "react";
import "./layout.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="/">
          🛒 Nars Shop
        </a>
        <nav className="nav">
          <a href="/" className="nav-link active">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
}

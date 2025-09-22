import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

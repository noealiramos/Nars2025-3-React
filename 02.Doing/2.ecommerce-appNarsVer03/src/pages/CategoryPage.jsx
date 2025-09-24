import React, { useState } from "react";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import ProductCard from "../components/ProductCard";
import Input from "../components/common/Input";
import categoriesData from "../data/categories.json";
import products from "../data/products.json";

const CategoryPage = () => {
  // Ejemplo: Mostrar breadcrumb para Android -> Celulares -> Inicio
  const androidCategory = categoriesData.find((cat) => cat.name === "Android");

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar productos por categoría y término de búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      product.category.name === androidCategory.name ||
      product.category.parentCategory === androidCategory._id;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    alert(`¡${product.name} agregado al carrito!`);
  };

  return (
    <div>
      <Breadcrumb categories={androidCategory} />

      <div className="container" style={{ padding: "24px 0" }}>
        <div className="flex flex-between" style={{ marginBottom: "24px" }}>
          <div>
            <h1 className="h1">Categoría: {androidCategory.name}</h1>
            <p className="muted">{androidCategory.description}</p>
          </div>

          <div style={{ minWidth: "300px" }}>
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              background: "var(--surface)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
            }}
          >
            <h3>No se encontraron productos</h3>
            <p className="muted">
              {searchTerm
                ? `No hay productos que coincidan con "${searchTerm}"`
                : "No hay productos en esta categoría"}
            </p>
          </div>
        )}

        {/* Sección de ejemplo de breadcrumbs */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            background: "var(--surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <h3>Ejemplo de navegación por categorías:</h3>
          <p>
            Este breadcrumb muestra la jerarquía:{" "}
            <strong>Inicio → Celulares → Android</strong>
          </p>
          <p>
            El componente automáticamente construye la jerarquía desde la
            categoría actual hacia sus categorías padre.
          </p>

          <div style={{ marginTop: "24px" }}>
            <h4>Otras categorías de ejemplo:</h4>
            {categoriesData.slice(0, 5).map((category) => (
              <div key={category._id} style={{ marginBottom: "16px" }}>
                <Breadcrumb categories={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

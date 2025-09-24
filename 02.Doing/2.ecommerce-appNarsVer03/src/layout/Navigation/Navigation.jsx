import React, { useState, useEffect } from "react";
import "./Navigation.css";
import Icon from "../../components/common/Icon/Icon";
import categoriesData from "../../data/categories.json";

const Navigation = ({ isMobile = false, onLinkClick }) => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Procesar las categorías para obtener solo las principales (sin parentCategory)
    const mainCategories = categoriesData.filter((cat) => !cat.parentCategory);
    setCategories(mainCategories);
  }, []);

  // Función para obtener subcategorías de una categoría principal
  const getSubcategories = (parentId) => {
    return categoriesData.filter(
      (cat) => cat.parentCategory && cat.parentCategory._id === parentId
    );
  };

  // Si es versión móvil, renderizar solo los enlaces principales
  if (isMobile) {
    return (
      <div className="mobile-navigation">
        {/* Ofertas especiales */}
        <a
          href="/offers"
          className="mobile-nav-link special"
          onClick={onLinkClick}
        >
          <Icon name="tag" size={20} />
          Ofertas del día
        </a>
        <a
          href="/new"
          className="mobile-nav-link special"
          onClick={onLinkClick}
        >
          <Icon name="sparkles" size={20} />
          Novedades
        </a>
        <a
          href="/bestsellers"
          className="mobile-nav-link special"
          onClick={onLinkClick}
        >
          <Icon name="star" size={20} />
          Más vendidos
        </a>
        <a
          href="/flash-sale"
          className="mobile-nav-link special"
          onClick={onLinkClick}
        >
          <Icon name="zap" size={20} />
          Flash sale
        </a>

        {/* Categorías principales */}
        {categories.map((category) => (
          <a
            key={category._id}
            href={`/category/${category._id}`}
            className="mobile-nav-link"
            onClick={onLinkClick}
          >
            <Icon name="chevronRight" size={16} />
            {category.name}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="navigation">
      <div className="container">
        <div className="navigation-content">
          {/* Menú de todas las categorías */}
          <div className="categories-dropdown">
            <button
              className="categories-menu-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            >
              <Icon name="menu" size={16} />
              <span>Todas las categorías</span>
              <Icon name="chevronDown" size={14} />
            </button>

            {isDropdownOpen && (
              <div className="categories-dropdown-menu">
                {categories.map((category) => {
                  const subcategories = getSubcategories(category._id);
                  return (
                    <div key={category._id} className="category-group">
                      <a
                        href={`/category/${category._id}`}
                        className="category-link main-category"
                      >
                        {category.name}
                        {subcategories.length > 0 && (
                          <Icon name="chevronRight" size={12} />
                        )}
                      </a>

                      {subcategories.length > 0 && (
                        <div className="subcategories">
                          {subcategories.map((subcat) => (
                            <a
                              key={subcat._id}
                              href={`/category/${subcat._id}`}
                              className="category-link sub-category"
                            >
                              {subcat.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navegación horizontal */}
          <nav className="categories-nav">
            <a href="/offers" className="nav-link special">
              Ofertas del día
            </a>
            <a href="/new" className="nav-link special">
              Novedades
            </a>
            <a href="/bestsellers" className="nav-link special">
              Más vendidos
            </a>
            <a href="/flash-sale" className="nav-link special">
              Flash sale
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

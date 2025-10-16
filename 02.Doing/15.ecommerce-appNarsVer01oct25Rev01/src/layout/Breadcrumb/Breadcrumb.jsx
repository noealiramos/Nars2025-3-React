import React from "react";
import PropTypes from "prop-types";
import "./Breadcrumb.css";
import Icon from "../../components/common/Icon/Icon";

const Breadcrumb = ({ categories = [] }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  // Función para construir la jerarquía de categorías
  const buildCategoryHierarchy = (category) => {
    const hierarchy = [];
    let current = category;

    // Construir la jerarquía desde la categoría actual hacia arriba
    while (current) {
      hierarchy.unshift(current);
      current = current.parentCategory;
    }

    return hierarchy;
  };

  // Si recibimos una sola categoría, construir su jerarquía
  const currentCategory = Array.isArray(categories)
    ? categories[categories.length - 1]
    : categories;
  const categoryHierarchy = buildCategoryHierarchy(currentCategory);

  return (
    <nav className="breadcrumb" aria-label="Navegación de categorías">
      <div className="container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <a href="/" className="breadcrumb-link">
              <Icon name="home" size={16} />
              <span className="breadcrumb-text">Inicio</span>
            </a>
          </li>

          {categoryHierarchy.map((category, index) => {
            const isLast = index === categoryHierarchy.length - 1;

            return (
              <li key={category._id} className="breadcrumb-item">
                <Icon
                  name="chevronRight"
                  size={14}
                  className="breadcrumb-separator"
                />
                {isLast ? (
                  <span className="breadcrumb-current" aria-current="page">
                    {category.name}
                  </span>
                ) : (
                  <a
                    href={`/category/${category._id}`}
                    className="breadcrumb-link"
                  >
                    {category.name}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

Breadcrumb.propTypes = {
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        imageURL: PropTypes.string,
        parentCategory: PropTypes.object,
      })
    ),
  ]),
};

Breadcrumb.defaultProps = {
  categories: [],
};

export default Breadcrumb;

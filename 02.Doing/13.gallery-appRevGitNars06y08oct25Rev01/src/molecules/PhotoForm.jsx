import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../atoms/Button";
import { BUTTON_SIZES } from "../utils/constants";
import "./PhotoForm.css";

export default function PhotoForm({
  action = "create",
  photo,
  onSavePhoto,
  onCancel,
}) {
  const isEditing = action === "edit";
  const title = isEditing ? "Editar foto" : "Agregar nueva foto";
  const submitText = isEditing ? "Guardar cambios" : "Guardar foto";

  // Estado del formulario
  const [formData, setFormData] = useState(() => ({
    url: photo?.url ?? "",
    title: photo?.title ?? "",
    description: photo?.description ?? "",
    location: photo?.location ?? "",
    tags: photo?.tags ?? [],
  }));

  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.url.trim()) {
      newErrors.url = "La URL es requerida";
    } else {
      // Validación básica de URL
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = "La URL no es válida";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSavePhoto?.(formData);
    }
  };

  return (
    <div className="photo-form">
      <h3 className="photo-form__title">
        <span className="photo-form__title-icon">📷</span>
        {title}
      </h3>

      <div className="form-info">
        <p className="form-info__text">
          💡 Completa todos los campos para agregar una foto a tu galería.
          Asegúrate de que la URL de la imagen sea válida y accesible.
        </p>
      </div>

      <form className="photo-form__form" onSubmit={handleSubmit}>
        {/* URL de la imagen */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="url">
            <span className="form-group__label-icon">🔗</span>
            URL de la imagen
          </label>
          <input
            type="url"
            id="url"
            name="url"
            className={`form-input form-input--url ${
              errors.url ? "form-input--error" : ""
            }`}
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.url}
            onChange={handleInputChange}
            required
          />
          {errors.url && <span className="form-error">{errors.url}</span>}
        </div>

        {/* Título */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="title">
            <span className="form-group__label-icon">🏷️</span>
            Título de la imagen
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-input ${errors.title ? "form-input--error" : ""}`}
            placeholder="Ej. Atardecer en el parque"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="description">
            <span className="form-group__label-icon">📝</span>
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className={`form-textarea ${
              errors.description ? "form-input--error" : ""
            }`}
            rows="4"
            placeholder="Describe la foto, el momento, los colores, la historia detrás de la imagen..."
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        {/* Ubicación */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="location">
            <span className="form-group__label-icon">📍</span>
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            placeholder="Ej. Aguascalientes, México"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* Acciones */}
        <div className="form-actions">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size={BUTTON_SIZES.MEDIUM}>
            <span>💾</span>
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
}

PhotoForm.propTypes = {
  action: PropTypes.oneOf(["create", "edit"]),
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onSavePhoto: PropTypes.func,
  onCancel: PropTypes.func,
};

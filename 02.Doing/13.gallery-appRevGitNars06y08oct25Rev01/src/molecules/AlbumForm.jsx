import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../atoms/Button";
import { BUTTON_SIZES } from "../utils/constants";
import "./AlbumForm.css";

export default function AlbumForm({
  action = "create",
  album,
  onSaveAlbum,
  onCancel,
}) {
  const isEditing = action === "edit";
  const title = isEditing ? "Editar álbum" : "Agregar nuevo álbum";
  const submitText = isEditing ? "Guardar cambios" : "Guardar álbum";

  // Estado del formulario
  const [formData, setFormData] = useState(() => ({
    title: album?.title ?? "",
    description: album?.description ?? "",
    images: album?.images ?? [],
    tags: album?.tags ?? [],
  }));

  // Estado para agregar nuevas imágenes
  const [newImage, setNewImage] = useState({
    url: "",
    name: "",
  });

  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs principales
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

  // Manejar cambios en los inputs de nueva imagen
  const handleNewImageChange = (e) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Agregar nueva imagen a la lista
  const handleAddImage = () => {
    if (newImage.url.trim() && newImage.name.trim()) {
      // Validar URL básica
      try {
        new URL(newImage.url);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, { ...newImage }],
        }));
        setNewImage({ url: "", name: "" });
      } catch {
        alert("Por favor, ingresa una URL válida");
      }
    }
  };

  // Eliminar imagen de la lista
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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

    if (formData.images.length === 0) {
      newErrors.images = "Debe agregar al menos una imagen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSaveAlbum?.(formData);
    }
  };

  return (
    <div className="album-form">
      <h3 className="album-form__title">
        <span className="album-form__title-icon">📁</span>
        {title}
      </h3>

      <div className="form-info">
        <p className="form-info__text">
          💡 Completa la información del álbum y agrega las imágenes que quieras
          incluir. Puedes añadir múltiples imágenes usando URLs válidas.
        </p>
      </div>

      <form className="album-form__form" onSubmit={handleSubmit}>
        {/* Título */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="title">
            <span className="form-group__label-icon">🏷️</span>
            Título del álbum
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? "form-input--error" : ""}`}
            placeholder="Ej. City Nights"
            required
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="description">
            <span className="form-group__label-icon">📝</span>
            Descripción del álbum
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`form-textarea ${
              errors.description ? "form-input--error" : ""
            }`}
            rows="3"
            placeholder="Describe el álbum..."
            required
          />
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        {/* Imágenes */}
        <div className="form-group">
          <label className="form-group__label">
            <span className="form-group__label-icon">🖼️</span>
            Imágenes del álbum
          </label>

          <div className="image-input-group">
            <div className="image-input-row">
              <input
                type="url"
                name="url"
                value={newImage.url}
                onChange={handleNewImageChange}
                className="form-input"
                placeholder="URL de la imagen"
              />
              <input
                type="text"
                name="name"
                value={newImage.name}
                onChange={handleNewImageChange}
                className="form-input"
                placeholder="Nombre de la imagen"
              />
              <Button
                type="button"
                onClick={handleAddImage}
                variant="primary"
                size={BUTTON_SIZES.MEDIUM}
                disabled={!newImage.url.trim() || !newImage.name.trim()}
              >
                +
              </Button>
            </div>

            {errors.images && (
              <span className="form-error">{errors.images}</span>
            )}

            {/* Lista de imágenes agregadas */}
            {formData.images.length > 0 && (
              <div className="added-images">
                <p className="added-images__title">
                  Imágenes agregadas ({formData.images.length})
                </p>
                <div className="added-images__list">
                  {formData.images.map((image, index) => (
                    <div key={index} className="added-image-item">
                      <div className="added-image-item__info">
                        <p className="added-image-item__name">{image.name}</p>
                        <p className="added-image-item__url">{image.url}</p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        variant="danger"
                        size={BUTTON_SIZES.SMALL}
                        ariaLabel="Eliminar imagen"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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

AlbumForm.propTypes = {
  action: PropTypes.oneOf(["create", "edit"]),
  album: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
  onSaveAlbum: PropTypes.func,
  onCancel: PropTypes.func,
};

import PropTypes from "prop-types";
import { useEffect } from "react";
import Button from "../atoms/Button";
import { BUTTON_SIZES } from "../utils/constants";
import "./PhotoViewer.css";

export default function PhotoViewer({isOpen, photo, onClose}) {
  // Manejar teclas de navegación
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !photo) {
    return null;
  }

  return (
    <div className="photo-viewer-overlay" onClick={onClose}>
      <div className="photo-viewer">
        {/* Header del visor */}
        <div className="photo-viewer__header">
          <div className="photo-viewer__info">
            <h2 className="photo-viewer__title">{photo.title}</h2>
            {photo.location && (
              <p className="photo-viewer__location">
                <span className="photo-viewer__location-icon">📍</span>
                {photo.location}
              </p>
            )}
          </div>
          <Button
            onClick={onClose}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
            className="photo-viewer__close"
          >
            ×
          </Button>
        </div>

        {/* Imagen principal */}
        <div className="photo-viewer__image-container">
          <img
            className="photo-viewer__image"
            src={photo.url}
            alt={photo.title}
          />
        </div>

        {/* Footer con descripción */}
        {photo.description && (
          <div className="photo-viewer__footer">
            <p className="photo-viewer__description">{photo.description}</p>
            {photo.tags.map((tag) => {
              return (
                <span key={tag} className="photo-viewer__tag">
                  {tag}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

PhotoViewer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    albumId: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

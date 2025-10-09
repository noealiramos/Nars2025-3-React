import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { BUTTON_SIZES } from "../utils/constants";
import "./AlbumCarousel.css";

export default function AlbumCarousel({ isOpen, album, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  //Funciones de navegación definidas
  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? album?.images?.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === album?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen || !album || !album.images || album.images.length === 0) {
    return null;
  }

  const currentImage = album.images[currentImageIndex];

  return (
    <div className="carousel-modal-overlay" onClick={onClose}>
      <div className="carousel-modal">
        {/* Header del modal*/}
        <div className="carousel-header">
          <div className="carousel-album-info">
            <h2 className="carousel-album-title">
              <span className="carousel-play-icon">▶️</span>
              {album.title}
            </h2>
            <p className="carousel-album-description">{album.description}</p>
          </div>
          <Button
            className="carousel-close-button"
            onClick={onClose}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
            ariaLabel="Cerrar carrusel"
          >
            x
          </Button>
        </div>
        {/* Área principal de la imagen */}
        <div className="carousel-main">
          <Button
            className="carousel-nav-button carousel-nav-button--prev"
            onClick={goToPrevious}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
            ariaLabel="Imagen Anterior"
          >
            {" "}
            ‹{" "}
          </Button>
          <div className="carousel-image-container">
            <img
              src={currentImage.url}
              alt={currentImage.name || `Imagen ${currentImageIndex + 1}`}
              className="carousel-image"
            />
            <div className="carousel-image-info">
              <h3 className="carousel-image-title">{currentImage.name}</h3>
              <p className="carousel-image-counter">
                {currentImageIndex + 1} de {album.images.length}
              </p>
            </div>
          </div>
          <Button
            className="carousel-nav-button carousel-nav-button--next"
            onClick={goToNext}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
            ariaLabel="Imagen Siguiente"
          >
            {" "}
            ›{" "}
          </Button>
          {/* Thumbnails */}
          {album?.images?.length > 1 && (
            <div className="carousel-thumbnails">
              <div className="carousel-thumbnails-container">
                {album.images.map((image, index) => (
                  <Button
                    key={index}
                    className={`carousel-thumbnail
                    ${
                      index === currentImageIndex
                        ? "carousel-thumbnail--active"
                        : ""
                    }`}
                    onClick={() => goToImage(index)}
                  >
                    <img
                      className="carousel-thumbnail-image"
                      src={image.url}
                      alt={image.name}
                    />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AlbumCarousel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  album: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

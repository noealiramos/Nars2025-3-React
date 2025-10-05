import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import "./AlbumCarousel.css";

export default function AlbumCarousel({ isOpen, album, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const mainImgRef = useRef(null);

  // Guarda lista de imágenes segura
  const images = useMemo(() => Array.isArray(album?.images) ? album.images : [], [album]);
  const total = images.length;

  // Resetear al abrir/cambiar de álbum
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsImgLoading(true);
      setImgError(false);
    }
  }, [isOpen, album?.id]);

  // Eventos de teclado
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, currentImageIndex]);

  if (!isOpen || !album) return null;

  const next = () => {
    if (total === 0) return;
    setIsImgLoading(true);
    setImgError(false);
    setCurrentImageIndex((idx) => (idx + 1) % total);
  };

  const prev = () => {
    if (total === 0) return;
    setIsImgLoading(true);
    setImgError(false);
    setCurrentImageIndex((idx) => (idx - 1 + total) % total);
  };

  const goTo = (i) => {
    if (i < 0 || i >= total) return;
    setIsImgLoading(true);
    setImgError(false);
    setCurrentImageIndex(i);
  };

  const current = images[currentImageIndex] ?? null;

  return (
    <div className="album-carousel-overlay" role="dialog" aria-modal="true" aria-label={`Carrusel ${album?.title || ""}`}>
      <div className="album-carousel-container">
        {/* Header */}
        <header className="carousel-header">
          <div className="carousel-title">
            <h3 title={album?.title || "Álbum"}>{album?.title || "Álbum"}</h3>
            <span className="carousel-counter">
              {total > 0 ? `${currentImageIndex + 1} / ${total}` : "0 / 0"}
            </span>
          </div>
          <button className="carousel-close" onClick={onClose} aria-label="Cerrar carrusel">×</button>
        </header>

        {/* Main area */}
        {total === 0 ? (
          <div className="carousel-empty">
            <p>Este álbum no tiene imágenes aún.</p>
          </div>
        ) : (
          <div className="carousel-view">
            <button className="nav-btn left" onClick={prev} aria-label="Imagen anterior">‹</button>

            <div className="image-stage">
              {isImgLoading && !imgError && <div className="img-skeleton" aria-label="Cargando imagen" />}
              {imgError && (
                <div className="img-error">
                  <p>No se pudo cargar la imagen.</p>
                  <button onClick={() => {
                    setImgError(false);
                    setIsImgLoading(true);
                    // forzar reintento cambiando key
                    setCurrentImageIndex((i) => i);
                  }}>Reintentar</button>
                </div>
              )}
              <img
                key={currentImageIndex}
                ref={mainImgRef}
                className={`carousel-main-image ${isImgLoading ? "hidden" : ""}`}
                src={current?.url}
                alt={current?.name || `Imagen ${currentImageIndex + 1}`}
                onLoad={() => setIsImgLoading(false)}
                onError={() => {
                  setIsImgLoading(false);
                  setImgError(true);
                }}
                draggable={false}
              />
              <div className="image-meta">
                <strong>{current?.name || "Sin título"}</strong>
              </div>
            </div>

            <button className="nav-btn right" onClick={next} aria-label="Siguiente imagen">›</button>
          </div>
        )}

        {/* Thumbnails */}
        {total > 1 && (
          <div className="carousel-thumbnails" role="listbox" aria-label="Thumbnails">
            {images.map((img, i) => (
              <button
                key={i}
                className={`thumb ${i === currentImageIndex ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                aria-selected={i === currentImageIndex}
                title={img?.name || `Imagen ${i + 1}`}
              >
                <img src={img?.url} alt={img?.name || `Miniatura ${i + 1}`} draggable={false} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

AlbumCarousel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  album: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

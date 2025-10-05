import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./PhotoViewer.css";

export default function PhotoViewer({ isOpen, photo, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "+") setScale((s) => Math.min(3, s + 0.1));
      if (e.key === "-") setScale((s) => Math.max(0.5, s - 0.1));
      if (e.key === "0") setScale(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    // reset states when switching photo
    setIsLoading(true);
    setHasError(false);
    setScale(1);
  }, [photo?.id, photo?.url]);

  if (!isOpen || !photo) return null;

  const onWheel = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    setScale((s) => {
      if (delta > 0) return Math.max(0.5, s - 0.1);
      return Math.min(3, s + 0.1);
    });
  };

  return (
    <div
      className="photoviewer-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Foto: ${photo?.title || photo?.name || ""}`}
    >
      <div className="photoviewer-container">
        <header className="photoviewer-header">
          <div className="photoviewer-title">
            <h3>{photo?.title || photo?.name || "Foto"}</h3>
            <div className="photoviewer-zoom">
              <button onClick={() => setScale((s) => Math.max(0.5, s - 0.1))} aria-label="Alejar">−</button>
              <span className="zoom-label">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale((s) => Math.min(3, s + 0.1))} aria-label="Acercar">+</button>
              <button onClick={() => setScale(1)} aria-label="Reset zoom">Reset</button>
            </div>
          </div>
          <button className="photoviewer-close" onClick={onClose} aria-label="Cerrar">×</button>
        </header>

        <div className="photoviewer-stage" onWheel={onWheel}>
          {isLoading && !hasError && <div className="pv-skeleton" />}
          {hasError && (
            <div className="pv-error">
              <p>No se pudo cargar la imagen.</p>
              <button onClick={() => { setHasError(false); setIsLoading(true); }}>Reintentar</button>
            </div>
          )}
          <img
            key={photo?.id || photo?.url}
            className={`photoviewer-image ${isLoading ? "hidden" : ""}`}
            src={photo?.url}
            alt={photo?.title || photo?.name || "Foto"}
            onLoad={() => setIsLoading(false)}
            onError={() => { setIsLoading(false); setHasError(true); }}
            style={{ transform: `scale(${scale})` }}
            draggable={false}
          />
        </div>

        {(photo?.description || photo?.location || (photo?.tags?.length > 0)) && (
          <div className="photoviewer-meta">
            {photo?.description && <p className="pv-desc">{photo.description}</p>}
            {photo?.location && <p className="pv-loc">📍 {photo.location}</p>}
            {photo?.tags?.length > 0 && (
              <div className="pv-tags">
                {photo.tags.map((t, i) => <span key={i} className="pv-tag">{t}</span>)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

PhotoViewer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onClose: PropTypes.func.isRequired,
};

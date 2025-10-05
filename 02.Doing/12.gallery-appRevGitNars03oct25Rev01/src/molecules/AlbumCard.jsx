import PropTypes from "prop-types";
import DeleteButton from "../atoms/DeleteButton";
import EditButton from "../atoms/EditButton";
import PlayButton from "../atoms/PlayButton";
import TagButton from "../atoms/TagButton";
import { BUTTON_SIZES } from "../utils/constants";
import "./AlbumCard.css";

const AlbumCard = ({
  album,
  onEdit,
  onDelete,
  onPlay,
  isActive = false,
  className = "",
}) => {
  return (
    <div className={`album-card ${isActive ? "active" : ""} ${className}`}>
      <div className="album-card__content">
        <div className="album-card__preview">
          {album.images && album.images.length > 0 ? (
            <div className="album-preview-grid">
              {album.images.slice(0, 4).map((image, index) => (
                <div key={image.id || index} className="album-preview-cell">
                  <img
                    src={image.url}
                    alt={image.name || image.title || "Foto"}
                    className="album-preview-image"
                  />
                  {/* Indicador de más imágenes en la última celda */}
                  {index === 3 && album.images.length > 4 && (
                    <div className="album-preview-overlay">
                      <span>+{album.images.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
              {/* Rellenar espacios vacíos si hay menos de 4 imágenes */}
              {album.images.length < 4 &&
                Array.from({ length: 4 - album.images.length }, (_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="album-preview-placeholder"
                  />
                ))}
            </div>
          ) : (
            <div className="album-placeholder">Sin fotos</div>
          )}
        </div>
        <div className="album-card__info">
          <h3 className="album-card__title">{album.title}</h3>
          {album.description && (
            <p className="album-card__description">{album.description}</p>
          )}
          <p className="album-card__count">
            {album.images?.length || 0} foto
            {album.images?.length !== 1 ? "s" : ""}
          </p>
          {album.tags && album.tags.length > 0 && (
            <div className="album-card__tags">
              {album.tags.map((tag, index) => (
                <TagButton key={index} label={tag} size={BUTTON_SIZES.SMALL} />
              ))}
            </div>
          )}

          <div className="album-card__actions">
            <EditButton
              onClick={() => onEdit?.(album)}
              size={BUTTON_SIZES.SMALL}
            />
            <DeleteButton
              onClick={() => onDelete?.(album)}
              size={BUTTON_SIZES.SMALL}
            />
            <PlayButton
              onClick={() => onPlay?.(album)}
              size={BUTTON_SIZES.SMALL}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPlay: PropTypes.func,
  isActive: PropTypes.bool,
  className: PropTypes.string,
};

export default AlbumCard;

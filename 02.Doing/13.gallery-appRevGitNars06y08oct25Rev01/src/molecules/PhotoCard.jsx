import PropTypes from "prop-types";
import DeleteButton from "../atoms/DeleteButton";
import EditButton from "../atoms/EditButton";
import PlayButton from "../atoms/PlayButton";
import TagButton from "../atoms/TagButton";
import { BUTTON_SIZES } from "../utils/constants";
import "./PhotoCard.css";

export default function PhotoCard({ photo, onDelete, onEdit, onClick }) {
  if (!photo) {
    return (
      <div className="photo-card">
        <div className="photo-card__image empty">
          <div className="photo-placeholder">No Image</div>
        </div>
        <div className="photo-card__title">Untitled Photo</div>
      </div>
    );
  }

  return (
    <div className="photo-card">
      <div className="photo-card__image">
        <img src={photo.url} alt={photo.title || photo.name} />
      </div>

      <div className="photo-card__info">
        <div className="photo-card__info-content">
          <h3 className="photo-card__title">{photo.title || photo.name}</h3>
          {photo.description && (
            <p className="photo-card__description">{photo.description}</p>
          )}
          {photo.location && (
            <p className="photo-card__location">
              <span className="location-icon">📍</span>
              {photo.location}
            </p>
          )}
          {photo.tags && photo.tags.length > 0 && (
            <div className="photo-card__tags">
              {photo.tags.map((tag, index) => (
                <TagButton key={index} label={tag} size={BUTTON_SIZES.SMALL} />
              ))}
            </div>
          )}
        </div>

        <div className="photo-card__actions">
          <EditButton
            onClick={() => onEdit?.(photo)}
            size={BUTTON_SIZES.SMALL}
          />
          <DeleteButton
            onClick={() => onDelete?.(photo)}
            size={BUTTON_SIZES.SMALL}
          />
          <PlayButton
            onClick={() => onClick?.(photo)}
            size={BUTTON_SIZES.SMALL}
          />
        </div>
      </div>
    </div>
  );
}

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onClick: PropTypes.func,
};

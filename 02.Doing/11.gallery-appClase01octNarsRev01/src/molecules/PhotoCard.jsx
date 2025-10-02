import PropTypes from 'prop-types';
import DeleteButton from "../atoms/DeleteButton";
import TagButton from "../atoms/TagButton";
import "./PhotoCard.css";

export default function PhotoCard({ photo, onDelete }) {
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

        {/* Hover Details Overlay */}
        <div className="photo-card__details">
          <div className="photo-card__details-content">
            <h4 className="photo-card__details-title">{photo.title || photo.name}</h4>
            <p className="photo-card__details-description">{photo.description}</p>
            <div className="photo-card__details-location">{photo.location}</div>
            <div className="photo-card__details-tags">
              {photo.tags && photo.tags.map((tag, index) => (
                <TagButton key={index} label={tag} />
              ))}
            </div>
          </div>
          <div className="photo-card__details-actions">
            <DeleteButton onClick={() => onDelete && onDelete(photo)} />
          </div>
        </div>
      </div>

      <div className="photo-card__title">{photo.title || photo.name}</div>
    </div>
  );
}

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    title: PropTypes.string, // También soporta title
    url: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  onDelete: PropTypes.func
};

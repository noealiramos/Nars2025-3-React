import PropTypes from 'prop-types';
import PhotoCard from "../molecules/PhotoCard";
import "./Pages.css";

export default function Photos({ photos, onEditPhoto, onDeletePhoto, onViewPhoto }) {
  const handleEditPhoto = (photo) => {
    console.log('Editing photo:', photo.title);
    onEditPhoto?.(photo);
  };

  const handleDeletePhoto = (photo) => {
    console.log('Deleting photo:', photo.title);
    onDeletePhoto?.(photo);
  };

  const handleViewPhoto = (photo) => {
    console.log('Viewing photo:', photo.title);
    onViewPhoto?.(photo);
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="photos-container">
        <div className="photos-empty">
          <div className="photos-empty__content">
            <span className="photos-empty__icon">📷</span>
            <h3 className="photos-empty__title">No hay fotos disponibles</h3>
            <p className="photos-empty__message">
              Comienza agregando algunas fotos a tu galería desde el botón "+" en la barra superior.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="photos-container">
      <div className="photos-grid">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id || index}
            photo={photo}
            onEdit={handleEditPhoto}
            onDelete={handleDeletePhoto}
            onClick={handleViewPhoto}
          />
        ))}
      </div>
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  onEditPhoto: PropTypes.func,
  onDeletePhoto: PropTypes.func,
  onViewPhoto: PropTypes.func,
};

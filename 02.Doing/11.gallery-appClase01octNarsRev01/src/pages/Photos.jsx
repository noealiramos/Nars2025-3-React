import PhotoCard from "../molecules/PhotoCard";
import photosCollection from "../data/photos";
import "./Pages.css";

export default function Photos() {
  const handleDeletePhoto = (photo) => {
    console.log('Deleting photo:', photo.title);
    // Funcionalidad de eliminar foto
  };

  return (
    <div className="photos-container">
      <div className="photos-grid">
        {photosCollection.map((photo, index) => (
          <PhotoCard
            key={photo.id || index}
            photo={photo}
            onDelete={handleDeletePhoto}
          />
        ))}
      </div>
    </div>
  );
}

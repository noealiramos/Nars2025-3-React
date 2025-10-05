import PropTypes from "prop-types";
import AlbumCard from "../molecules/AlbumCard";
import "./Pages.css";

export default function Albums({
  albums,
  onEditAlbum,
  onPlayAlbum,
  onDeleteAlbum,
}) {
  const handlePlayAlbum = (album) => {
    console.log("Playing album:", album.title);
    onPlayAlbum?.(album);
  };

  const handleDeleteAlbum = (album) => {
    console.log("Deleting album:", album.title);
    onDeleteAlbum?.(album);
  };

  if (!albums || albums.length === 0) {
    return (
      <div className="albums-container">
        <div className="albums-empty">
          <div className="albums-empty__content">
            <span className="albums-empty__icon">📁</span>
            <h3 className="albums-empty__title">No hay álbumes disponibles</h3>
            <p className="albums-empty__message">
              Comienza creando tu primer álbum desde el botón "+" en la barra
              superior.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="albums-container">
      <div className="albums-grid">
        {albums.map((album, index) => (
          <AlbumCard
            key={album.id || index}
            album={album}
            onPlay={handlePlayAlbum}
            onDelete={handleDeleteAlbum}
            onEdit={onEditAlbum}
          />
        ))}
      </div>
    </div>
  );
}

Albums.propTypes = {
  albums: PropTypes.array.isRequired,
  onEditAlbum: PropTypes.func,
  onPlayAlbum: PropTypes.func,
  onDeleteAlbum: PropTypes.func,
};

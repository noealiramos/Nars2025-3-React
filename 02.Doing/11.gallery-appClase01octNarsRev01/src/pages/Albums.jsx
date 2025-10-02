import AlbumCard from "../molecules/AlbumCard";
import albumsCollection from "../data/albums";
import "./Pages.css";

export default function Albums() {
  const handlePlayAlbum = (album) => {
    console.log('Playing album:', album.title);
    // Funcionalidad de reproducir álbum
  };

  const handleDeleteAlbum = (album) => {
    console.log('Deleting album:', album.title);
    // Funcionalidad de eliminar álbum
  };

  return (
    <div className="albums-container">
      <div className="albums-grid">
        {albumsCollection.map((album, index) => (
          <AlbumCard
            key={album.id || index}
            album={album}
            onPlay={handlePlayAlbum}
            onDelete={handleDeleteAlbum}
          />
        ))}
      </div>
    </div>
  );
}

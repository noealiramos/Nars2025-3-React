import PropTypes from 'prop-types';
import DeleteButton from "../atoms/DeleteButton";
import PlayButton from "../atoms/PlayButton";
import TagButton from "../atoms/TagButton";
import "./AlbumCard.css";

export default function AlbumCard({ album, onPlay, onDelete }) {
  if (!album) {
    return (
      <div className="album-card album-card--empty">
        <p>No album data available</p>
      </div>
    );
  }

  return(
    <div className="album-card">
      <div className="album-preview">
        <div className="image-grid">
          {Array.from({ length: 4 }).map((image, index) => {
            return (
              <div key={index} className="grid-cell">
                {image ? (
                  <img
                    src={image.url}
                    alt={image.name || `Image ${index + 1}`}
                    className="grid-image"
                  />
                ) : (
                  <div className="grid-placeholder">
                    <span className="placeholder-icon">+</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="album-info">
        <h3 className="album-title">{album.title}</h3>
        <p className="album-description">{`${album.description.substring(0, 100)}...`}</p>

        <div className="album-tags">
          {album.tags && album.tags.map(tag => (
            <TagButton key={tag} label={tag} />
          ))}
        </div>

        <div className="album-actions">
          <PlayButton onClick={() => onPlay && onPlay(album)} />
          <DeleteButton onClick={() => onDelete && onDelete(album)} />
        </div>
      </div>
    </div>);
}

AlbumCard.propTypes={
  album:PropTypes.shape({
    id:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url:PropTypes.string.isRequired,
        name:PropTypes.string
      })
    ),
  }).isRequired
}

import PropTypes from 'prop-types';
import DeleteButton from "../atoms/DeleteButton";
import PlayButton from "../atoms/PlayButton";
import TagButton from "../atoms/TagButton";

export default function AlbumCard({album, onOpen}){
  const images = Array.isArray(album?.images) ? album.images.slice(0,4) : [];
  const empty = images.length===0;

  return (
    <div className="album-card">
      <div className={`thumb-grid ${empty ? 'empty':''}`} onClick={onOpen}>
        {empty ? (
          <div className="thumb empty">Sin imágenes</div>
        ) : (
          images.map((img, idx)=> (
            <img key={idx} className="thumb" src={img.url} alt={img.name || `image-${idx}`} loading="lazy" />
          ))
        )}
      </div>
      <h3>{album?.title || 'Sin título'}</h3>
      {album?.description && <p className="muted">{album.description}</p>}
      <div className="card-actions">
        <TagButton label="Favorite" onClick={()=>{}}/>
        <PlayButton onClick={()=>{}}/>
        <DeleteButton onClick={()=>{}}/>
      </div>
    </div>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string
    }))
  }).isRequired,
  onOpen: PropTypes.func
};

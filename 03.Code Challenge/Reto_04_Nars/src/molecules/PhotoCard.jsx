import PropTypes from 'prop-types';
import { useState } from 'react';
import DeleteButton from "../atoms/DeleteButton";
import TagButton from "../atoms/TagButton";

export default function PhotoCard({image}){
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return(
    <div className={`photo-card ${error ? 'error':''}`}>
      {!error ? (
        <img
          src={image.url}
          alt={image.title || 'photo'}
          onLoad={()=>setLoaded(true)}
          onError={()=>setError(true)}
          loading="lazy"
          style={{opacity: loaded ? 1 : 0.1, transition:'opacity .3s'}}
        />
      ) : (
        <div className="img-fallback">Imagen no disponible</div>
      )}
      <h3>{image.title}</h3>
      {image.description && <p className="muted">{image.description}</p>}
      {image.location && <p className="muted">{image.location}</p>}
      <TagButton label="Like"/>
      <DeleteButton onClick={()=>{}}/>
    </div>
  );
}

PhotoCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
  }).isRequired
};

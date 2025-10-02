import PropTypes from "prop-types";
import DeleteButton from "../atoms/DeleteButton";
import PlayButton from "../atoms/PlayButton";
import TagButton from "../atoms/TagButton";

export default function AlbumCard({album}){
  return(<div>
    {album && album.images.length>0 ?
      album.images.map((img)=>{
        return <img src={img.url} alt={img.name}/>
      }) :
      <p>No hay imágenes para mostrar en este album</p>}
    <h3>{album.title}</h3>
    <p>{album.description}</p>
    <TagButton/>
    <PlayButton/>
    <DeleteButton/>
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

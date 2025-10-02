import PropTypes from "prop-types";
import DeleteButton from "../atoms/DeleteButton";
import TagButton from "../atoms/TagButton";

export default function PhotoCard({image}){
  return(
    <div className="">
      <img src={image.url} alt={image.title}/>
      <h3>{image.title}</h3>
      <p>{image.description}</p>
      <p>{image.location}</p>
      <TagButton/>
      <DeleteButton/>
    </div>
  );
}

PhotoCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  })
}
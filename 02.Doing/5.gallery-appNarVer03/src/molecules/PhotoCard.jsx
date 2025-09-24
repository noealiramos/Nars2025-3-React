/*export default function PhotoCard(){} >>>> esta linea, y las siguientes 3
import './PhotoCard.css';

const PhotoCard = ()=>{}  >>> esta y 
export default PhotoCard; >>> esta, hacen exactamente lo mismo
*/
import TagButton from "../atoms/TagButton";
import DeleteButton from "../atoms/DeleteButton";

//export default function PhotoCard({title, url, descripcion, location}){
export default function PhotoCard({ image, onDelete }){
    return(
        <div className ="" >
            <img className="photo-card__media" src = {image.url} alt={image.title}/>
            <h3>{image.title}</h3>
            <p>{image.description}</p>
            <p>{image.location}</p>
            <TagButton/>
            <DeleteButton/>
        </div>
    );
}
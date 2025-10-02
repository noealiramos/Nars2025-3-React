import photosCollection from "../data/photos";
import PhotoCard from "../molecules/PhotoCard";

export default function Photos(){
  return(
    photosCollection.map((photo,i)=>{
      return <PhotoCard key={i} image={photo}/>
    })
  );
}
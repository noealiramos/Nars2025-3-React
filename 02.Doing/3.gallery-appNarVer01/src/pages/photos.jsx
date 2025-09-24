import {photos as photoData} from "../data/photos";
import PhotoCard from "../molecules/PhotoCard";

export default function photos(){
    return(
        photoData.map((photo,i)=>{
            return <PhotoCard key = {i} image={photo}/>;
        })
    );
}

import {albums as albumsData} from "../data/albums";
import AlbumCard from "../molecules/AlbumCard";

export default function albums(){
    return(
        albumsData.map((album,i)=>{
            return <AlbumCard key={i} album={album}/>;
        })
    );
}
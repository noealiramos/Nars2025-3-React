import albumsCollection from "../data/albums";
import AlbumCard from "../molecules/AlbumCard";

export default function Albums(){
  return(
    albumsCollection.map((album, i)=>{
      return <AlbumCard key={i} album={album} onOpen={()=>{}}/>;
    })
  );
}
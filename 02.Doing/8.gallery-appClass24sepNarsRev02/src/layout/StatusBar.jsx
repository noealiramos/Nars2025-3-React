import albumsCollection from "../data/albums";
import photosCollection from "../data/photos";

export default function StatusBar({currentView}){

  const statusText = ()=>{
    if(currentView==='photos')
      return photosCollection.length;
    else if(currentView==='albums')
      return albumsCollection.length;
    else
      return '';
  }

  return (<div>
    <h2>Status Bar</h2>
    <span>Vista actual {statusText()}</span>
    </div>);
}
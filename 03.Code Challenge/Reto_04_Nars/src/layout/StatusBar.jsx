import PropTypes from 'prop-types';
import albumsCollection from "../data/albums";
import photosCollection from "../data/photos";

export default function StatusBar({currentView}){
  const totalAlbums = albumsCollection.length;
  const totalPhotos = photosCollection.length;

  const viewLabel = (v)=>{
    switch(v){
      case 'photos': return 'Photos';
      case 'albums': return 'Albums';
      case 'newPhoto': return 'Add Photo';
      case 'newAlbum': return 'New Album';
      default: return v;
    }
  };

  const contextText = ()=>{
    if(currentView==='photos'){
      return `${totalPhotos} photos in ${totalAlbums} albums`;
    }
    if(currentView==='albums'){
      // Sum of photos across albums
      const sum = albumsCollection.reduce((acc, a)=> acc + (Array.isArray(a.images)? a.images.length : 0), 0);
      return `${totalAlbums} albums · ${sum} photos total`;
    }
    if(currentView==='newPhoto'){
      return `Create a new photo · ${totalPhotos} existing`;
    }
    if(currentView==='newAlbum'){
      return `Create a new album · ${totalAlbums} existing`;
    }
    return '';
  };

  const isEmpty = (currentView==='photos' && totalPhotos===0) || (currentView==='albums' && totalAlbums===0);

  return (
    <div className={`status-bar ${isEmpty ? 'empty' : ''}`}>
      <strong>{viewLabel(currentView)}</strong>
      <span style={{marginLeft: 8}}>{contextText()}</span>
      {isEmpty && <em style={{marginLeft: 12}}>(No content yet)</em>}
    </div>
  );
}

StatusBar.propTypes = {
  currentView: PropTypes.oneOf(['photos','albums','newPhoto','newAlbum']).isRequired
};

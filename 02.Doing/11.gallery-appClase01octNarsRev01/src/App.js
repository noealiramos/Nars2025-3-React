import { useState } from 'react';
import Layout from './layout/Layout';
import Albums from './pages/Albums';
import Photos from './pages/Photos';
import EditAlbum from './pages/EditAlbum';
import EditPhoto from './pages/EditPhoto';
import './App.css';
import ConfirmDialog from './molecules/ConfirmDialog';
import albumsCollection from './data/albums';
import photosCollection from './data/photos';

function App() {
  const [currentView, setCurrentView] = useState('albums');
  
  //estado para persistencai de datos
  const [albums,setAlbums]= useState(()=>
    getFromStorage("gallery-albums",albumsCollection)
);

const [photos,setPhotos]= useState(()=>
    getFromStorage("gallery-photos",photosCollectionCollection)
);

//estado para el dialogo de confirmacion de eliminacion de album
  const [isConfirmDialogOpen,setIsConfirmDialogOpen]= 
  useState(false);

const [albumToDelete,setAlbumToDelete] = useState(null);
const [photoToDelete,setPhotoToDelete] = useState(null);

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };


  const renderCurrentView = () => {
    switch(currentView) {
      case 'albums':
        return <Albums />;
      case 'photos':
        return <Photos />;
      case 'newAlbum':
        return <EditAlbum onBack={() => setCurrentView('albums')} />;
      case 'newPhoto':
        return <EditPhoto onBack={() => setCurrentView('photos')} />;
      default:
        return <Albums />;
    }
  };

const getFromStorage= (key,defaultvalue)=> {
  try{
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item):defaultvalue;
  }catch (error){
    console.error(error);
    return defaultvalue;
  }
};

  //!== diferente. Va a dejer a los que sean diferentes del que quiero eliminar
  const handleConfirmDeleteAlbum = ()=> {
    if(albumToDelete) {
      const updatedAlbums = albums.filter((a)=>a.id !== albumToDelete.id);
      setAlbums(updatedAlbums);
      console.log("Album eliminado: ",albumToDelete);
      console.log("Album restantes: ",updatedAlbums.length);
    }
  };

  const handleCancelDeleteAlbum = ()=> {
    setIsConfirmDialogOpen(false);
    setAlbumToDelete(null);
  };


   const handleConfirmDeletePhoto = ()=> {
    if(photoToDelete) {
      const updatedPhoto = photos.filter((a)=>a.id !== photoToDelete.id);
      setPhotos(updatedPhotos);
      console.log("Photo eliminado: ",photoToDelete);
      console.log("Photo restantes: ",updatedPhotos.length);
    }
  };

  const handleCancelDeletePhoto = ()=> {
    setIsConfirmDialogOpen(false);
    setPhotoToDelete(null);
  };


  return (
    <div className="App">
      <Layout currentView={currentView} onViewChange=
      {handleViewChange}>
        {renderCurrentView()}
      </Layout>

      {/*dialogo para confirmar eliminacion de Album*/}
      <ConfirmDialog 
      isOpen={isConfirmDialogOpen}
      type="danger" title ="eliminar Album" message ={`¿estás seguro que quieres eliminar el album?\n\nEsta accion no puede deshacerse.`} confirmText="Eliminar" 
      cancelText="Cancelar" 
      onConfirm={handleConfirmDeleteAlbum} 
      onCancel={handleCancelDeleteAlbum}>

      </ConfirmDialog>

      {/*dialogo para elimiinar la foto */}
      <ConfirmDialog 
      isOpen={isConfirmDialogOpen}
      type="danger" title ="eliminar foto" message ={`¿estás seguro que quieres eliminar la foto?\n\nEsta accion no puede deshacerse.`} confirmText="Eliminar" 
      cancelText="Cancelar" 
      onConfirm={handleConfirmDeletePhoto} 
      onCancel={handleCancelDeletePhoto}>

      </ConfirmDialog>
    </div>
  );
}

export default App;

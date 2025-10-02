import PropTypes from "prop-types";
import albumsCollection from "../data/albums";
import photosCollection from "../data/photos";

export default function StatusBar({currentView, onViewChange}){

  const statusText = ()=>{
    if(currentView==='photos')
      return photosCollection.length;
    else if(currentView==='albums')
      return albumsCollection.length;
    else
      return '';
  }

  const getStatusInfo = () =>{
    switch (currentView) {
      case 'photos':
        return {
          count: photosCollection.length,
          label: 'Photos Total',
          addAction: 'newPhoto'
        }
        break;
      case 'albums':
        return {
          count: albumsCollection.length,
          label: 'Albums Total',
          addAction: 'newAlbum'
        }
        break;
      default:
        return {
          count: null,
          label: null,
          addAction: null
        }
        break;
    }
  }

  const statusInfo = getStatusInfo();

  return (<div className="status-bar">
    <div className="status-left">
      {statusInfo.count !== null && (
        <span className="status-count">{statusInfo.count} {statusInfo.label}</span>
      )}
    </div>
    {statusInfo.count !== null && (
      <button type="button" className="btn btn--add btn--medium"
        onClick={()=>onViewChange(statusInfo.addAction)}>+</button>
    )}
    </div>);
}

StatusBar.propTypes={
  currentView:PropTypes.string.isRequired,
  onViewChange:PropTypes.func.isRequired,
}

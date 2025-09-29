import PropTypes from 'prop-types';

export default function NavBar({currentView,onViewChange}){
  const isActive = (v)=> currentView===v;
  const btnClass = (v)=> `nav-btn ${isActive(v) ? 'active' : ''}`;
  return (
    <div className="nav-bar">
      <h2>Navigation Bar</h2>
      <button
        className={btnClass('photos')}
        onClick={()=>onViewChange('photos')}
        disabled={isActive('photos')}
      >Photos</button>
      <button
        className={btnClass('albums')}
        onClick={()=>onViewChange('albums')}
        disabled={isActive('albums')}
      >Albums</button>
      <button
        className={btnClass('newPhoto')}
        onClick={()=>onViewChange('newPhoto')}
        disabled={isActive('newPhoto')}
      >Add Photo</button>
      <button
        className={btnClass('newAlbum')}
        onClick={()=>onViewChange('newAlbum')}
        disabled={isActive('newAlbum')}
      >New Album</button>
    </div>
  );
}

NavBar.propTypes = {
  currentView: PropTypes.oneOf(['photos','albums','newPhoto','newAlbum']).isRequired,
  onViewChange: PropTypes.func.isRequired
};

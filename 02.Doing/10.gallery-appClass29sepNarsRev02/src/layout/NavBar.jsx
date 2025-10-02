import PropTypes from "prop-types";

export default function NavBar({currentView,onViewChange}){
  return (<nav className="navigation-bar">

    <button
      onClick={()=>onViewChange('photos')}
      disabled={currentView==='photos'}
      >Photos</button>
    <button
      onClick={()=>onViewChange('albums')}
      disabled={currentView==='albums'}>Albums</button>

    </nav>);
}

NavBar.propTypes={
  currentView:PropTypes.string.isRequired,
  onViewChange:PropTypes.func.isRequired,
}

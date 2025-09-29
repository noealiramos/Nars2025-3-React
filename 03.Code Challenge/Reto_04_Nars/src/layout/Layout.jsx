import NavBar from "./NavBar";
import StatusBar from "./StatusBar";
import PropTypes from 'prop-types';

export default function Layout({children, currentView, onViewChange}){
return(<div className="layout">
  <header className="header">
    <NavBar currentView={currentView} onViewChange={onViewChange}/>
    <StatusBar currentView={currentView}/>
  </header>
    <main className="main">
      {children}
    </main>
</div>);
}
Layout.propTypes = {
  children: PropTypes.node,
  currentView: PropTypes.oneOf(['photos','albums','newPhoto','newAlbum']).isRequired,
  onViewChange: PropTypes.func.isRequired
};

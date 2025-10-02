import PropTypes from "prop-types";
import NavBar from "./NavBar";
import StatusBar from "./StatusBar";

export default function Layout({children, currentView, onViewChange}){
return(<div>
  <header>
    <NavBar currentView={currentView} onViewChange={onViewChange}/>
    <StatusBar currentView={currentView} onViewChange={onViewChange}/>
  </header>
    <main>
      {children}
    </main>
</div>);
}

Layout.propTypes = {
  children:PropTypes.node.isRequired,
  currentView:PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
}
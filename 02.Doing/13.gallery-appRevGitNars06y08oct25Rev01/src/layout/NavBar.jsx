import PropTypes from "prop-types";
import { VIEWS } from "../utils/constants";
import "./NavBar.css";

export default function NavBar({currentView,onViewChange}){
  return (
    <nav className="navigation-bar">
      <button
        onClick={() => onViewChange(VIEWS.ALBUMS)}
        className={`nav-tab ${currentView === VIEWS.ALBUMS ? 'active' : ''}`}
        type="button">
          <span className="tab-icon">📁</span>
          <span className="tab-label">Albums</span>
      </button>
      <button
        onClick={() => onViewChange(VIEWS.PHOTOS)}
        className={`nav-tab ${currentView === VIEWS.PHOTOS ? 'active' : ''}`}
        type="button">
          <span className="tab-icon">📷</span>
          <span className="tab-label">Photos</span>
      </button>
    </nav>);
}

NavBar.propTypes={
  currentView:PropTypes.string.isRequired,
  onViewChange:PropTypes.func.isRequired,
}

import PropTypes from 'prop-types';
import NavBar from "./NavBar";
import StatusBar from "./StatusBar";
import "./Layout.css";

export default function Layout({ children, currentView, onViewChange }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-title">Gallery App</h1>
        <NavBar
          currentView={currentView}
          onViewChange={onViewChange}
        />
        <StatusBar
          currentView={currentView}
          onViewChange={onViewChange}
        />
      </header>

      <main className="app-main">
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired
};

import './NavBar.css';

export default function NavBar({ activeTab = 'albums', onTabChange }) {
  return (
  <nav className="nav-bar">
  <div className="nav-bar__container">
    <div className="nav-bar__tabs" role="tablist" aria-label="Gallery sections">
      <button
        role="tab"
        aria-selected={activeTab==='albums'}
        className={`nav-bar__tab ${activeTab==='albums' ? 'nav-bar__tab--active' : ''}`}
        onClick={()=>onTabChange && onTabChange('albums')}
      >
        Albums
      </button>
      <button
        role="tab"
        aria-selected={activeTab==='photos'}
        className={`nav-bar__tab ${activeTab==='photos' ? 'nav-bar__tab--active' : ''}`}
        onClick={()=>onTabChange && onTabChange('photos')}
      >
        Photos
      </button>
    </div>
  </div>
</nav>
);
}

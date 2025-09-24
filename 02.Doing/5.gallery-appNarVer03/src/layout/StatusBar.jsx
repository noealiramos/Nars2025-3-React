import './StatusBar.css';

export default function StatusBar({ albumsCount = 0, photosCount = 0 }) {
  return (
  <aside className="status-bar">
    <div className="status-bar__container">
      <div className="status-bar__row">
        <div className="status-bar__count">
          <strong>{albumsCount}</strong> Albums Total
        </div>
        <button className="icon-btn" title="Add">+</button>
      </div>
    </div>
  </aside>
);
}

import "./Loading.css";

export default function Loading({ children }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner" aria-label="Cargando"></div>
      <span className="loading-text">{children}</span>
    </div>
  );
}

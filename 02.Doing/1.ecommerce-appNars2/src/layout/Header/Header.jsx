import "./Header.css";

export default function Header() {
  let searchTerm = "";
  let showUserMenu = false;
  const handleSearch = () => {};
  const onChangeSearchTerm = () => {};
  const toggleUserEvent = () => {
    showUserMenu = true;
  };
  const closeSession = () => {};

  return (
    <header>
      {/* Top bar con información adicional */}
      <div className="header-top">
        <div className="container flex-between">
          <span className="delivery-info">Envío gratis en pedidos +$999</span>
          <div className="top-links">
            <a href="/help">Ayuda</a>
            <a href="/track">Rastrear Pedido</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container header-content">
          {/* LOGO https://heroicons.com*/}
          <a href="/" className="logo">
            eshop.com
          </a>
          {/* Barra de búsqueda */}
          <form className="seach-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={onChangeSearchTerm}
              className="search-input"
            />
            <button type="submit" className="search-btn" aria-label="Buscar">
              🔍
            </button>
          </form>
          {/* Acciones del usuario */}
          <div className="header-actions">
            {/* Favoritos */}
            <button className="action-btn" aria-label="Lista de deseos">
              <span className="icon">❤️</span>
              <span className="action-text">Favoritos</span>
            </button>
            {/* Carrito */}
            <button className="action-btn" aria-label="Carrito de compras">
              <span className="icon">🛒</span>
              <span className="action-text">Carrito</span>
              <span className="badge">6</span>
            </button>
            {/* Usuario */}
            <div className="user-menu">
              <div className="user-dropdown">
                <button
                  className="action-btn user-btn"
                  onClick={toggleUserEvent}
                  aria-label="Menú de usuario"
                >
                  <span className="icon">👤</span>
                  <span className="action-text">Mi cuenta</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                {showUserMenu && (
                  <div className="dropdown-menu">
                    <a href="/profile">Mi perfil</a>
                    <a href="/orders">Mis pedidos</a>
                    <a href="/addresses">Direcciones</a>
                    <a href="/payment">Métodos de pago</a>
                    <hr />
                    <button onClick={closeSession}>Cerrar Sesión</button>
                  </div>
                )}
              </div>
              <div className="auth-buttons">
                <button className="btn-primary">Iniciar Sesión</button>
                <button className="btn-primary">Registrarse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

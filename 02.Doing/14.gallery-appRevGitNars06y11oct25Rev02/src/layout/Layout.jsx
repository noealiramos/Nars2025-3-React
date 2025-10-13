/**
 * ============================================================================
 * LAYOUT - COMPONENTE DE ESTRUCTURA PRINCIPAL
 * ============================================================================
 *
 * Componente contenedor que define la estructura general de la aplicación.
 *
 * PROPÓSITO:
 * - Proporciona la estructura base HTML (header + main)
 * - Organiza los componentes de navegación y estado
 * - Actúa como wrapper para el contenido dinámico
 * - Mantiene consistencia en toda la aplicación
 *
 * CONCEPTOS CLAVE:
 * - Children prop: Contenido dinámico
 * - Composición: Construye UI con componentes pequeños
 * - Props drilling: Pasa props a componentes hijos
 * - Layout pattern: Estructura consistente
 *
 * ESTRUCTURA VISUAL:
 * ┌─────────────────────────────────┐
 * │ <header>                        │
 * │   - Gallery App (título)        │
 * │   - NavBar (navegación)         │
 * │   - StatusBar (estado)          │
 * └─────────────────────────────────┘
 * ┌─────────────────────────────────┐
 * │ <main>                          │
 * │   {children} (contenido)        │
 * └─────────────────────────────────┘
 *
 * ATOMIC DESIGN:
 * Este es un componente de "Organismo" o "Template".
 * Combina múltiples componentes más pequeños para crear
 * una estructura completa de página.
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import "./Layout.css"; // Estilos del layout
import NavBar from "./NavBar"; // Navegación entre vistas
import StatusBar from "./StatusBar"; // Barra de estado/información

// ==========================================================================
// COMPONENTE LAYOUT
// ==========================================================================

/**
 * Layout - Estructura principal de la aplicación
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - REQUERIDO: Contenido de la página
 * @param {string} props.currentView - REQUERIDO: Vista actual activa
 * @param {Function} props.onViewChange - REQUERIDO: Callback para cambiar vista
 * @param {Array} props.albums - Array de álbumes (para StatusBar)
 * @param {Array} props.photos - Array de fotos (para StatusBar)
 *
 * CONCEPTO - Layout Component Pattern:
 * Este patrón separa la estructura de la página del contenido.
 *
 * VENTAJAS:
 * 1. Reutilización: La estructura se mantiene igual en todas las páginas
 * 2. Consistencia: Header y navegación siempre en el mismo lugar
 * 3. Mantenibilidad: Cambiar layout afecta a toda la app
 * 4. Separación de responsabilidades: Layout vs Contenido
 *
 * CONCEPTO - Children Prop:
 * {children} es especial en React. Contiene todo lo que se pasa
 * entre <Layout>...</Layout> desde el componente padre.
 *
 * EJEMPLO EN APP.JS:
 * <Layout currentView={view} onViewChange={handleChange}>
 *   <Albums albums={albums} />  ← Esto es "children"
 * </Layout>
 *
 * CONCEPTO - Props Drilling:
 * currentView y onViewChange se pasan desde App → Layout → NavBar
 * Este es "props drilling": pasar props a través de múltiples niveles.
 *
 * NOTA: Para apps más grandes, se usaría Context API para evitar
 * pasar props por tantos niveles.
 */
export default function Layout({
  children,
  currentView,
  onViewChange,
  albums,
  photos,
}) {
  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA HTML SEMÁNTICA:
   *
   * 1. <div className="app-layout">
   *    - Contenedor principal
   *    - Maneja el layout general (CSS Grid o Flexbox)
   *
   * 2. <header className="app-header">
   *    - Semántico: Identifica la cabecera de la app
   *    - Contiene título, navegación y estado
   *    - Se mantiene consistente en todas las páginas
   *
   * 3. <h1 className="app-title">
   *    - Título principal de la aplicación
   *    - Importante para SEO y accesibilidad
   *    - Solo debe haber un <h1> por página
   *
   * 4. <NavBar>
   *    - Componente de navegación
   *    - Recibe currentView para resaltar la vista activa
   *    - Recibe onViewChange para manejar clicks
   *
   * 5. <StatusBar>
   *    - Muestra información del estado actual
   *    - Contadores de álbumes y fotos
   *    - Acciones rápidas
   *
   * 6. <main className="app-main">
   *    - Semántico: Identifica el contenido principal
   *    - Aquí se renderiza el contenido dinámico ({children})
   *    - Cambia según la vista (Albums, Photos, etc.)
   *
   * PATRÓN DE COMPOSICIÓN:
   * Layout no sabe qué contenido específico va a recibir.
   * Simplemente proporciona la estructura y renderiza {children}.
   * Esto hace que Layout sea completamente reutilizable.
   */
  return (
    <div className="app-layout">
      {/* ================================================================
          HEADER - CABECERA DE LA APLICACIÓN
          ================================================================ */}
      <header className="app-header">
        {/* Título principal */}
        <h1 className="app-title">Gallery App</h1>

        {/*
          NavBar - Navegación principal
          Props:
          - currentView: Para resaltar la opción activa
          - onViewChange: Callback cuando se cambia de vista
        */}
        <NavBar currentView={currentView} onViewChange={onViewChange} />

        {/*
          StatusBar - Barra de estado e información
          Props:
          - currentView, onViewChange: Para acciones contextuales
          - albums, photos: Para mostrar contadores y estadísticas
        */}
        <StatusBar
          currentView={currentView}
          onViewChange={onViewChange}
          albums={albums}
          photos={photos}
        />
      </header>

      {/* ================================================================
          MAIN - CONTENIDO PRINCIPAL DINÁMICO
          ================================================================

          {children} renderiza el contenido que se pasa desde App.js:
          - <Albums> cuando currentView === VIEWS.ALBUMS
          - <Photos> cuando currentView === VIEWS.PHOTOS

          Este patrón mantiene el Layout limpio y reutilizable.
       */}
      <main className="app-main">{children}</main>
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de Layout
 *
 * PROPS REQUERIDAS:
 * - children: El contenido que se renderizará (obligatorio)
 * - currentView: La vista activa actual (obligatorio)
 * - onViewChange: Función para cambiar de vista (obligatorio)
 *
 * PROPS OPCIONALES:
 * - albums: Array de álbumes (para StatusBar)
 * - photos: Array de fotos (para StatusBar)
 *
 * TIPOS DE ARRAYS:
 * PropTypes.array acepta cualquier array.
 * Para mayor especificidad, se podría usar:
 * PropTypes.arrayOf(PropTypes.shape({...}))
 *
 * NOTA DIDÁCTICA:
 * En producción, se usarían tipos más específicos o TypeScript.
 * Por ahora, PropTypes.array es suficiente para validación básica.
 */
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Contenido requerido
  currentView: PropTypes.string.isRequired, // Vista actual requerida
  onViewChange: PropTypes.func.isRequired, // Callback requerido
  albums: PropTypes.array, // Array opcional
  photos: PropTypes.array, // Array opcional
};

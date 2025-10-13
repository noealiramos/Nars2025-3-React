/**
 * ============================================================================
 * NAVBAR - NAVEGACIÓN PRINCIPAL
 * ============================================================================
 *
 * Componente de navegación que permite cambiar entre vistas principales.
 *
 * PROPÓSITO:
 * - Proporciona navegación clara entre Albums y Photos
 * - Muestra visualmente qué vista está activa
 * - Ejecuta callback al cambiar de vista
 * - Mejora la UX con iconos visuales
 *
 * CONCEPTOS CLAVE:
 * - Controlled Component: No maneja su propio estado
 * - Props callback: onViewChange comunicación hacia arriba
 * - Conditional classes: CSS dinámico según estado
 * - Template literals: Construcción de strings dinámicos
 * - Semantic HTML: <nav> para navegación
 *
 * INTERACCIÓN:
 * Usuario click → onViewChange(VIEWS.ALBUMS) → App actualiza state
 * → NavBar recibe nuevo currentView → Re-render con nueva clase active
 *
 * FLUJO DE DATOS (DATA FLOW):
 * App.js (state) → Layout → NavBar (recibe props) → User click
 * → NavBar (llama callback) → App.js (actualiza state) → Re-render
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { VIEWS } from "../utils/constants"; // Constantes de vistas
import "./NavBar.css"; // Estilos de navegación

// ==========================================================================
// COMPONENTE NAVBAR
// ==========================================================================

/**
 * NavBar - Barra de navegación principal
 *
 * @param {Object} props
 * @param {string} props.currentView - REQUERIDO: Vista activa actual
 * @param {Function} props.onViewChange - REQUERIDO: Callback al cambiar vista
 *
 * CONCEPTO - Controlled Component:
 * NavBar NO controla su propio estado. Recibe currentView como prop
 * y llama a onViewChange cuando el usuario hace click.
 *
 * VENTAJAS:
 * 1. Single Source of Truth: El estado vive en App.js
 * 2. Predecibilidad: NavBar siempre refleja el estado de App
 * 3. Reutilización: NavBar no tiene lógica de negocio
 * 4. Testing: Fácil de probar (props in, callback out)
 *
 * CONCEPTO - Lifting State Up:
 * El estado (currentView) vive en App.js porque:
 * - Es compartido por múltiples componentes (NavBar, Layout, Pages)
 * - App.js necesita saber la vista para renderizar el contenido correcto
 *
 * PATRÓN DE COMUNICACIÓN:
 * Hijo → Padre: A través de callbacks (onViewChange)
 * Padre → Hijo: A través de props (currentView)
 */
export default function NavBar({ currentView, onViewChange }) {
  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA DE NAVEGACIÓN:
   *
   * <nav> - Elemento semántico para navegación
   * <button> - Elementos interactivos (mejor que <a> sin href)
   * <span> - Para iconos y etiquetas (estructura visual)
   *
   * CONCEPTOS EN CADA BUTTON:
   *
   * 1. onClick={() => onViewChange(VIEWS.ALBUMS)}
   *    Arrow function: Evita que se ejecute inmediatamente
   *    onViewChange: Callback que comunica con App.js
   *    VIEWS.ALBUMS: Constante para evitar errores de tipeo
   *
   * 2. className={`nav-tab ${currentView === VIEWS.ALBUMS ? 'active' : ''}`}
   *    Template literal: Permite interpolar valores
   *    Ternario: Añade 'active' condicionalmente
   *    Resultado: "nav-tab" o "nav-tab active"
   *
   * 3. type="button"
   *    Importante: Sin esto, el tipo por defecto es "submit"
   *    En un formulario, causaría un submit no deseado
   *    Buena práctica: Siempre especificar el tipo
   *
   * PATRÓN DE CLASES CSS:
   * - nav-tab: Estilos base (color, padding, etc.)
   * - active: Estilos adicionales para elemento activo
   *
   * CSS aplicará:
   * .nav-tab { ... }           ← Siempre
   * .nav-tab.active { ... }    ← Solo cuando está activo
   *
   * ICONOS:
   * Usamos emojis (📁 📷) por simplicidad didáctica.
   * En producción se usarían: Font Awesome, Material Icons, SVG
   */
  return (
    <nav className="navigation-bar">
      {/* ================================================================
          BOTÓN - VISTA DE ALBUMS
          ================================================================ */}
      <button
        // EVENTO: Llama al callback con la vista deseada
        onClick={() => onViewChange(VIEWS.ALBUMS)}
        // CLASE DINÁMICA: Añade 'active' si es la vista actual
        // EJEMPLO:
        // Si currentView === VIEWS.ALBUMS → "nav-tab active"
        // Si currentView === VIEWS.PHOTOS → "nav-tab"
        className={`nav-tab ${currentView === VIEWS.ALBUMS ? "active" : ""}`}
        // TIPO: Especifica que es un botón normal, no submit
        type="button"
      >
        {/* Icono visual */}
        <span className="tab-icon">📁</span>

        {/* Etiqueta del botón */}
        <span className="tab-label">Albums</span>
      </button>

      {/* ================================================================
          BOTÓN - VISTA DE PHOTOS
          ================================================================ */}
      <button
        // EVENTO: Cambia a vista de Photos
        onClick={() => onViewChange(VIEWS.PHOTOS)}
        // CLASE DINÁMICA: Activo cuando currentView === VIEWS.PHOTOS
        className={`nav-tab ${currentView === VIEWS.PHOTOS ? "active" : ""}`}
        // TIPO: Botón normal (no submit)
        type="button"
      >
        {/* Icono visual */}
        <span className="tab-icon">📷</span>

        {/* Etiqueta del botón */}
        <span className="tab-label">Photos</span>
      </button>
    </nav>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de NavBar
 *
 * PROPS REQUERIDAS:
 * - currentView: String que identifica la vista activa
 * - onViewChange: Función callback para cambiar de vista
 *
 * IMPORTANCIA DE ISREQUIRED:
 * Sin estas props, NavBar no puede funcionar:
 * - Sin currentView: No sabe qué botón marcar como activo
 * - Sin onViewChange: Los clicks no hacen nada
 *
 * TIPOS:
 * - string: Solo acepta valores tipo string
 * - func: Solo acepta funciones
 *
 * VALIDACIÓN EN DESARROLLO:
 * PropTypes solo valida en modo desarrollo (NODE_ENV !== 'production')
 * En producción se eliminan para mejorar el rendimiento.
 *
 * ADVERTENCIAS EN CONSOLA:
 * Si faltan props o son del tipo incorrecto, verás warnings como:
 * "Warning: Failed prop type: The prop `currentView` is marked as
 * required in `NavBar`, but its value is `undefined`."
 */
NavBar.propTypes = {
  currentView: PropTypes.string.isRequired, // Vista actual (obligatorio)
  onViewChange: PropTypes.func.isRequired, // Callback (obligatorio)
};

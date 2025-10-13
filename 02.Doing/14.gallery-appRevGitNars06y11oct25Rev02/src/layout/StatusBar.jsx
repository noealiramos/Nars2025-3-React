/**
 * ============================================================================
 * STATUSBAR - BARRA DE ESTADO Y ACCIONES
 * ============================================================================
 *
 * Componente que muestra información contextual y acciones según la vista activa.
 *
 * PROPÓSITO:
 * - Mostrar información relevante de la vista actual
 * - Proveer acceso rápido a acciones (añadir album/foto)
 * - Dar feedback visual del estado de la aplicación
 * - Mejorar la UX con información útil
 *
 * CONCEPTOS CLAVE:
 * - Switch statement: Lógica condicional múltiple
 * - Helper functions: getStatusInfo() organiza lógica
 * - Conditional rendering: && para mostrar elementos
 * - Props defaults: albums = [], photos = []
 * - Composition: Usa Button de atoms
 *
 * COMPORTAMIENTO:
 * - Vista Albums: Muestra "X Albums Total" + botón "+"
 * - Vista Photos: Muestra "X Photos Total" + botón "+"
 * - Vista New Album/Photo: Muestra título sin botón
 *
 * FLUJO DE DATOS:
 * App → Layout → StatusBar
 * Props: currentView, albums, photos → Render dinámico
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import Button from "../atoms/Button"; // Botón reutilizable
import { BUTTON_SIZES, VIEWS } from "../utils/constants"; // Constantes
import "./StatusBar.css"; // Estilos

// ==========================================================================
// COMPONENTE STATUSBAR
// ==========================================================================

/**
 * StatusBar - Barra de información y acciones contextuales
 *
 * @param {Object} props
 * @param {string} props.currentView - REQUERIDO: Vista activa
 * @param {Function} props.onViewChange - REQUERIDO: Callback cambio vista
 * @param {Array} props.albums - Array de albums (default: [])
 * @param {Array} props.photos - Array de fotos (default: [])
 *
 * CONCEPTO - Props Defaults:
 * albums = [], photos = []
 *
 * Si no se pasa la prop, usa array vacío.
 * Evita errores al hacer albums.length si albums es undefined.
 *
 * SINTAXIS:
 * function StatusBar({ albums = [] }) { ... }
 *
 * ALTERNATIVAS:
 * - StatusBar.defaultProps = { albums: [] }
 * - const albums = props.albums || []
 *
 * CONCEPTO - Helper Function:
 * getStatusInfo() es una función auxiliar que:
 * 1. Encapsula lógica compleja
 * 2. Devuelve objeto con datos para renderizar
 * 3. Hace el JSX más limpio
 * 4. Es fácil de testear
 *
 * PATRÓN:
 * Función helper → Retorna datos → JSX usa esos datos
 */
export default function StatusBar({
  currentView,
  onViewChange,
  albums = [], // Default: array vacío si no se pasa
  photos = [], // Default: array vacío si no se pasa
}) {
  // ========================================================================
  // FUNCIÓN HELPER - INFORMACIÓN DE ESTADO
  // ========================================================================

  /**
   * getStatusInfo - Calcula información a mostrar según vista actual
   *
   * RETORNA: Objeto con:
   * - count: Número a mostrar (o null si no aplica)
   * - label: Texto descriptivo
   * - canAdd: Boolean si se puede añadir elementos
   * - addAction: Vista a la que navegar al hacer click en "+"
   *
   * CONCEPTO - Switch Statement:
   * Estructura condicional para múltiples casos.
   *
   * SINTAXIS:
   * switch (valor) {
   *   case OPCION1:
   *     return ...;
   *   case OPCION2:
   *     return ...;
   *   default:
   *     return ...;
   * }
   *
   * VENTAJAS vs IF/ELSE:
   * - Más legible con muchas condiciones
   * - Cada caso es independiente
   * - Default maneja casos no esperados
   *
   * RETURN EN CADA CASE:
   * El return hace que no necesitemos break
   * La función termina al encontrar un case que coincide
   *
   * ESTRUCTURA DEL OBJETO RETORNADO:
   * {
   *   count: número o null,
   *   label: string descriptivo,
   *   canAdd: boolean (mostrar botón +),
   *   addAction: vista de destino (VIEWS.NEW_ALBUM o VIEWS.NEW_PHOTO)
   * }
   */
  const getStatusInfo = () => {
    switch (currentView) {
      // CASO 1: Vista de Photos
      case VIEWS.PHOTOS:
        return {
          count: photos.length, // Número de fotos
          label: "Photos Total", // Etiqueta
          canAdd: true, // Mostrar botón +
          addAction: VIEWS.NEW_PHOTO, // Al click → nueva foto
        };

      // CASO 2: Vista de Albums
      case VIEWS.ALBUMS:
        return {
          count: albums.length, // Número de albums
          label: "Albums Total", // Etiqueta
          canAdd: true, // Mostrar botón +
          addAction: VIEWS.NEW_ALBUM, // Al click → nuevo album
        };

      // CASO 3: Añadiendo nueva foto
      case VIEWS.NEW_PHOTO:
        return {
          count: null, // No mostrar número
          label: "Adding New Photo", // Título descriptivo
          canAdd: false, // No mostrar botón +
        };

      // CASO 4: Creando nuevo album
      case VIEWS.NEW_ALBUM:
        return {
          count: null, // No mostrar número
          label: "Creating New Album", // Título descriptivo
          canAdd: false, // No mostrar botón +
        };

      // CASO DEFAULT: Fallback para vistas no manejadas
      default:
        return {
          count: 0, // Valor por defecto
          label: "Items", // Etiqueta genérica
          canAdd: false, // No permitir añadir
        };
    }
  };

  // ========================================================================
  // CÁLCULO DE DATOS
  // ========================================================================

  /**
   * LLAMADA A HELPER:
   * Ejecuta getStatusInfo() una sola vez por render.
   * Almacena el resultado en statusInfo.
   *
   * VENTAJA:
   * No llamamos getStatusInfo() múltiples veces en el JSX.
   * Calculamos una vez, usamos múltiples veces.
   */
  const statusInfo = getStatusInfo();

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA HTML:
   *
   * <div className="status-bar">
   *   - Contenedor principal
   *   - Usa flexbox para layout (left | right)
   *
   * <div className="status-left">
   *   - Información del estado
   *   - Contadores o títulos
   *
   * <Button> (condicional)
   *   - Solo se muestra si statusInfo.canAdd === true
   *   - Botón "+" para añadir elementos
   *
   * RENDERIZADO CONDICIONAL:
   *
   * 1. {statusInfo.count !== null && ( ... )}
   *    Operador &&: Solo renderiza si la condición es true
   *    Si count es 0, 5, 10 → true → se renderiza
   *    Si count es null → false → no se renderiza
   *
   * 2. {statusInfo.count === null && ( ... )}
   *    Lo opuesto: Solo renderiza cuando count es null
   *    Usado para mostrar título cuando no hay contador
   *
   * CONCEPTO - && en JSX:
   * {condicion && <Elemento />}
   *
   * Si condicion es true → renderiza <Elemento />
   * Si condicion es false → no renderiza nada
   *
   * CUIDADO CON 0:
   * {count && <span>{count}</span>}    ← MAL (0 no se renderizaría)
   * {count !== null && <span>{count}</span>}  ← BIEN
   */
  return (
    <div className="status-bar">
      {/* ================================================================
          SECCIÓN IZQUIERDA - INFORMACIÓN
          ================================================================ */}
      <div className="status-left">
        {/*
          CONTADOR - Solo si count no es null
          Muestra: "5 Photos Total", "3 Albums Total", etc.
        */}
        {statusInfo.count !== null && (
          <span className="status-count">
            {statusInfo.count} {statusInfo.label}
          </span>
        )}

        {/*
          TÍTULO - Solo si count es null
          Muestra: "Adding New Photo", "Creating New Album"
          Se usa cuando estamos en vistas de creación
        */}
        {statusInfo.count === null && (
          <span className="status-title">{statusInfo.label}</span>
        )}
      </div>

      {/* ================================================================
          BOTÓN DE ACCIÓN - Solo si canAdd es true
          ================================================================

          RENDERIZADO CONDICIONAL:
          Solo aparece en vistas ALBUMS y PHOTOS
          No aparece en vistas NEW_ALBUM o NEW_PHOTO

          COMPOSICIÓN:
          Usamos el componente Button de atoms
          Pasamos todas las props necesarias

          PROPS DEL BUTTON:
          - type: "button" (no submit)
          - variant: "primary" (estilo visual)
          - size: BUTTON_SIZES.MEDIUM (tamaño constante)
          - onClick: Callback con addAction
          - ariaLabel: Accesibilidad

          DYNAMIC ARIA LABEL:
          statusInfo.addAction = "newPhoto"
          .replace("new", "") = "Photo"
          .toLowerCase() = "photo"
          Resultado: "Add new photo"
       */}
      {statusInfo.canAdd && (
        <Button
          type="button"
          variant="primary"
          size={BUTTON_SIZES.MEDIUM}
          // EVENTO: Cambia a vista de creación
          onClick={() => onViewChange(statusInfo.addAction)}
          // ACCESIBILIDAD: Descripción para screen readers
          // EJEMPLO: "Add new album", "Add new photo"
          ariaLabel={`Add new ${statusInfo.addAction
            .replace("new", "")
            .toLowerCase()}`}
        >
          {/* Icono del botón */}
          <span className="btn-icon">+</span>
        </Button>
      )}
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de StatusBar
 *
 * PROPS REQUERIDAS:
 * - currentView: String de la vista activa (necesario para switch)
 * - onViewChange: Función callback (necesaria para botón +)
 *
 * PROPS OPCIONALES:
 * - albums: Array de albums (para contar)
 * - photos: Array de fotos (para contar)
 *
 * NOTA SOBRE ARRAYS:
 * PropTypes.array es genérico.
 *
 * MÁS ESPECÍFICO (opcional):
 * albums: PropTypes.arrayOf(PropTypes.shape({
 *   id: PropTypes.string.isRequired,
 *   name: PropTypes.string.isRequired,
 *   // ...
 * }))
 *
 * TRADEOFF:
 * - Genérico: Más flexible, menos validación
 * - Específico: Más validación, más código
 *
 * Para este proyecto didáctico, PropTypes.array es suficiente.
 */
StatusBar.propTypes = {
  currentView: PropTypes.string.isRequired, // Vista actual (obligatorio)
  onViewChange: PropTypes.func.isRequired, // Callback (obligatorio)
  albums: PropTypes.array, // Array opcional
  photos: PropTypes.array, // Array opcional
};

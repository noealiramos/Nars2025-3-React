/**
 * ============================================================================
 * TAGBUTTON - BOTÓN DE ETIQUETA/TAG
 * ============================================================================
 *
 * Botón especializado para mostrar y seleccionar tags/etiquetas.
 *
 * PROPÓSITO:
 * - Representa etiquetas como "#vacation", "#family", "#2024"
 * - Puede estar activo (seleccionado) o inactivo
 * - Estilo visual similar a hashtags de redes sociales
 * - Usado para filtrar o categorizar contenido
 *
 * CONCEPTO - Estado Activo:
 * Similar a PlayButton, este componente reacciona al estado.
 * Cuando está activo (seleccionado), cambia su apariencia visual.
 *
 * CASOS DE USO:
 * - Filtros de búsqueda: Click para filtrar por tag
 * - Selección múltiple: Click para agregar/quitar tags
 * - Navegación: Click para ver items con ese tag
 *
 * EJEMPLO:
 * <TagButton label="vacation" active={true} onClick={handleTagClick} />
 * Resultado visual: "#vacation" con estilo activo
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { BUTTON_SIZES } from "../utils/constants";
import Button from "./Button";

// ==========================================================================
// COMPONENTE TAGBUTTON
// ==========================================================================

/**
 * TagButton - Botón de etiqueta/tag con estado activo
 *
 * @param {Object} props
 * @param {string} props.label - REQUERIDO: Texto del tag (sin el #)
 * @param {Function} props.onClick - Callback al hacer clic
 * @param {boolean} props.active - Si el tag está seleccionado/activo
 * @param {string} props.size - Tamaño del botón
 *
 * CONCEPTO - Componente Presentacional:
 * Este componente NO maneja su propio estado activo.
 * Recibe 'active' como prop (controlled component).
 * El componente padre decide si está activo o no.
 *
 * VENTAJA:
 * Permite patrones como "solo un tag activo a la vez"
 * o "múltiples tags activos" según la lógica del padre.
 *
 * ESTRUCTURA VISUAL:
 * [# vacation]  →  # (símbolo) + vacation (texto)
 *  ↑    ↑
 *  hash  label
 */
export default function TagButton({
  label,
  onClick,
  active = false,
  size = BUTTON_SIZES.SMALL,
}) {
  // ========================================================================
  // CLASE CONDICIONAL
  // ========================================================================

  /**
   * CLASE "active" cuando está seleccionado
   *
   * PROPÓSITO:
   * Permite aplicar estilos CSS especiales al tag activo.
   * Ej: fondo diferente, borde, color, etc.
   *
   * CSS TÍPICO:
   * .btn--tag.active {
   *   background: blue;
   *   color: white;
   * }
   */
  const className = active ? "active" : "";

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA DEL BOTÓN:
   *
   * 1. <span className="tag-hash">#</span>
   *    - El símbolo # (hashtag)
   *    - Separado en su propio span para estilo individual
   *    - Podría tener color o tamaño diferente al texto
   *
   * 2. <span className="tag-text">{label}</span>
   *    - El texto del tag
   *    - También en su propio span para control de estilo
   *    - {label} es la prop recibida
   *
   * ARIA LABEL:
   * `Tag: ${label}` → Para accesibilidad
   * Ejemplo: "Tag: vacation"
   * Los lectores de pantalla dirán esto completo
   *
   * TEMPLATE STRING:
   * `Tag: ${label}` usa template literals de ES6
   * Permite insertar variables dentro de strings con ${}
   *
   * TAMAÑO POR DEFECTO:
   * BUTTON_SIZES.SMALL porque los tags suelen ser pequeños
   */
  return (
    <Button
      onClick={onClick}
      size={size}
      variant="tag"
      className={className} // "active" o ""
      ariaLabel={`Tag: ${label}`} // Accesibilidad
    >
      <span className="tag-hash">#</span>
      <span className="tag-text">{label}</span>
    </Button>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de TagButton
 *
 * PROPS REQUERIDAS:
 * - label: El texto del tag es OBLIGATORIO
 *   Un tag sin texto no tiene sentido
 *
 * PROPS OPCIONALES:
 * - onClick: Puede no tener acción (tag puramente visual)
 * - active: Default false (inactivo por defecto)
 * - size: Default SMALL (apropiado para tags)
 *
 * EJEMPLO DE VALIDACIÓN:
 * <TagButton label="vacation" /> → ✅ Válido
 * <TagButton /> → ❌ Error: label es requerido
 * <TagButton label={123} /> → ⚠️ Warning: label debe ser string
 */
TagButton.propTypes = {
  label: PropTypes.string.isRequired, // OBLIGATORIO
  onClick: PropTypes.func, // Opcional
  active: PropTypes.bool,
  size: PropTypes.oneOf([
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE,
  ]),
};

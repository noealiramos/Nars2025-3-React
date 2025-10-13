/**
 * ============================================================================
 * CONFIRMDIALOG - DIÁLOGO DE CONFIRMACIÓN MODAL
 * ============================================================================
 *
 * Componente modal que solicita confirmación antes de una acción importante.
 *
 * PROPÓSITO:
 * - Prevenir acciones accidentales (eliminar, sobrescribir)
 * - Informar al usuario de las consecuencias
 * - Proporcionar opción de cancelar
 * - Mejorar UX con confirmaciones claras
 *
 * CONCEPTOS CLAVE:
 * - Modal pattern: Overlay + Dialog
 * - Early return: Si no está abierto, no renderiza nada
 * - Event bubbling: Cerrar al click en overlay
 * - Default props: Valores por defecto para textos
 * - PropTypes.oneOf: Validación de valores específicos
 * - Conditional rendering: Iconos según tipo
 *
 * TIPOS DE DIÁLOGO:
 * - danger: Acciones destructivas (eliminar)
 * - warning: Acciones que requieren precaución
 * - info: Información general
 *
 * PATRÓN MODAL:
 * [Overlay opaco] → Click cierra
 *   [Dialog] → Click NO cierra (e.stopPropagation)
 *     [Contenido + Botones]
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import Button from "../atoms/Button"; // Botón reutilizable
import { BUTTON_SIZES } from "../utils/constants"; // Constantes de tamaños
import "./ConfirmDialog.css"; // Estilos del modal

// ==========================================================================
// COMPONENTE CONFIRMDIALOG
// ==========================================================================

/**
 * ConfirmDialog - Modal de confirmación para acciones importantes
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - REQUERIDO: Si el modal está visible
 * @param {string} props.title - REQUERIDO: Título del diálogo
 * @param {string} props.message - REQUERIDO: Mensaje descriptivo
 * @param {string} props.confirmText - Texto botón confirmar (default: "Confirmar")
 * @param {string} props.cancelText - Texto botón cancelar (default: "Cancelar")
 * @param {Function} props.onConfirm - REQUERIDO: Callback al confirmar
 * @param {Function} props.onCancel - REQUERIDO: Callback al cancelar
 * @param {string} props.type - Tipo de diálogo (default: "danger")
 *
 * CONCEPTO - Default Props en Destructuring:
 * confirmText = "Confirmar"
 *
 * Si no se pasa la prop, usa el valor por defecto.
 *
 * SINTAXIS:
 * function Component({ prop = defaultValue }) { ... }
 *
 * EJEMPLO DE USO:
 * <ConfirmDialog
 *   isOpen={showDialog}
 *   title="¿Eliminar foto?"
 *   message="Esta acción no se puede deshacer"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDialog(false)}
 *   type="danger"
 * />
 */
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirmar", // Default si no se pasa
  cancelText = "Cancelar", // Default si no se pasa
  onConfirm,
  onCancel,
  type = "danger", // Default: tipo danger
}) {
  // ========================================================================
  // EARLY RETURN - MODAL CERRADO
  // ========================================================================

  /**
   * GUARD CLAUSE: Si no está abierto, no renderizar nada
   *
   * CONCEPTO - Conditional Rendering con Early Return:
   *
   * ALTERNATIVA (menos eficiente):
   * return (
   *   <div style={{ display: isOpen ? 'block' : 'none' }}>
   *     ...todo el modal
   *   </div>
   * )
   *
   * EARLY RETURN (más eficiente):
   * if (!isOpen) return null
   * return <div>...todo el modal</div>
   *
   * VENTAJAS:
   * 1. No renderiza elementos innecesarios en el DOM
   * 2. Mejor rendimiento (menos nodos DOM)
   * 3. CSS más simple (no necesita display: none)
   *
   * NOTA: return null en React significa "no renderizar nada"
   */
  if (!isOpen) return null;

  // ========================================================================
  // HANDLERS - MANEJADORES DE EVENTOS
  // ========================================================================

  /**
   * handleConfirm - Al confirmar la acción
   *
   * OPTIONAL CHAINING:
   * onConfirm?.()
   *
   * Verifica que onConfirm exista antes de llamarlo.
   * Si es undefined, no hace nada (no causa error).
   *
   * CONCEPTO - Wrapper Functions:
   * ¿Por qué no onClick={onConfirm} directamente?
   *
   * Porque podríamos:
   * 1. Agregar lógica adicional (logging, analytics)
   * 2. Manejar parámetros extras
   * 3. Mantener consistencia en el código
   *
   * Para este caso simple, podríamos usar onClick={onConfirm} directamente,
   * pero el wrapper hace el código más mantenible.
   */
  const handleConfirm = () => {
    onConfirm?.();
  };

  /**
   * handleCancel - Al cancelar la acción
   *
   * Similar a handleConfirm, wrapper para onCancel callback.
   */
  const handleCancel = () => {
    onCancel?.();
  };

  /**
   * handleOverlayClick - Cerrar al hacer click en overlay
   *
   * CONCEPTO - Event Bubbling:
   * Cuando haces click en un elemento, el evento "burbujea" hacia arriba
   * por el árbol DOM, disparando handlers de elementos padres.
   *
   * PROBLEMA:
   * Click en overlay → Cerrar modal ✓
   * Click en dialog (hijo de overlay) → ¡También cierra! ✗
   *
   * SOLUCIÓN:
   * e.target === e.currentTarget
   *
   * e.target: Elemento donde realmente se hizo click
   * e.currentTarget: Elemento con el handler (overlay)
   *
   * Si son iguales → Click fue directamente en overlay
   * Si son diferentes → Click fue en hijo (dialog)
   *
   * EJEMPLO:
   * [Overlay onClick={handleOverlayClick}]
   *   [Dialog]
   *     [Button] ← Click aquí
   *
   * e.target = Button
   * e.currentTarget = Overlay
   * target !== currentTarget → No cierra
   *
   * [Overlay onClick={handleOverlayClick}] ← Click aquí
   *   [Dialog]
   *
   * e.target = Overlay
   * e.currentTarget = Overlay
   * target === currentTarget → Cierra
   *
   * PATRÓN UX:
   * Es común que modales se cierren al hacer click fuera del contenido.
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA MODAL:
   *
   * 1. Overlay: Fondo opaco, cubre toda la pantalla
   * 2. Dialog: Contenedor del contenido, centrado
   * 3. Header: Icono + Título
   * 4. Body: Mensaje
   * 5. Footer: Botones de acción
   *
   * CLASE DINÁMICA:
   * `confirm-dialog confirm-dialog--${type}`
   *
   * Template literal que construye:
   * - type="danger" → "confirm-dialog confirm-dialog--danger"
   * - type="warning" → "confirm-dialog confirm-dialog--warning"
   * - type="info" → "confirm-dialog confirm-dialog--info"
   *
   * CSS puede estilizar según tipo:
   * .confirm-dialog--danger { border-color: red; }
   * .confirm-dialog--warning { border-color: orange; }
   * .confirm-dialog--info { border-color: blue; }
   */
  return (
    <div className="confirm-dialog-overlay" onClick={handleOverlayClick}>
      <div className={`confirm-dialog confirm-dialog--${type}`}>
        {/* ==============================================================
            HEADER - ICONO Y TÍTULO
            ==============================================================

            RENDERIZADO CONDICIONAL DE ICONOS:

            Usamos múltiples bloques {type === "X" && emoji}

            Solo uno se renderizará según el valor de type.

            ALTERNATIVA (con ternarios anidados - menos legible):
            {type === "danger" ? "⚠️" : type === "warning" ? "⚠️" : "ℹ️"}

            ALTERNATIVA (con objeto lookup):
            const icons = { danger: "⚠️", warning: "⚠️", info: "ℹ️" }
            {icons[type]}
         */}
        <div className="confirm-dialog__header">
          <div className="confirm-dialog__icon">
            {type === "danger" && "⚠️"}
            {type === "warning" && "⚠️"}
            {type === "info" && "ℹ️"}
          </div>
          <h3 className="confirm-dialog__title">{title}</h3>
        </div>

        {/* ==============================================================
            BODY - MENSAJE
            ============================================================== */}
        <div className="confirm-dialog__body">
          <p className="confirm-dialog__message">{message}</p>
        </div>

        {/* ==============================================================
            FOOTER - BOTONES DE ACCIÓN
            ==============================================================

            ORDEN UX:
            1. Cancelar (izquierda, secundario)
            2. Confirmar (derecha, primario/peligro)

            Este orden es estándar en UX:
            - Acción destructiva a la derecha
            - Requiere movimiento intencional del mouse
            - Reduce clicks accidentales

            VARIANT DEL BOTÓN CONFIRMAR:
            variant={type}

            Usa el tipo del diálogo como variant del botón:
            - type="danger" → <Button variant="danger">
            - type="warning" → <Button variant="warning">
            - type="info" → <Button variant="info">

            Esto mantiene consistencia visual entre el diálogo y el botón.
         */}
        <div className="confirm-dialog__footer">
          <Button
            onClick={handleCancel}
            type="button"
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
          >
            {cancelText}
          </Button>

          <Button
            onClick={handleConfirm}
            type="button"
            variant={type} // danger, warning, o info
            size={BUTTON_SIZES.MEDIUM}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de ConfirmDialog
 *
 * PROPS REQUERIDAS:
 * - isOpen: Boolean que controla visibilidad
 * - title: String con título del diálogo
 * - message: String con mensaje descriptivo
 * - onConfirm: Función callback al confirmar
 * - onCancel: Función callback al cancelar
 *
 * PROPS OPCIONALES:
 * - confirmText: String (default: "Confirmar")
 * - cancelText: String (default: "Cancelar")
 * - type: String (default: "danger")
 *
 * CONCEPTO - PropTypes.oneOf:
 * PropTypes.oneOf(["valor1", "valor2", "valor3"])
 *
 * Valida que la prop sea uno de los valores especificados.
 *
 * VENTAJA:
 * Si pasamos type="error" (inválido), veremos warning:
 * "Warning: Failed prop type: Invalid prop `type` of value `error`
 * supplied to `ConfirmDialog`, expected one of ["danger","warning","info"]."
 *
 * TIPOS DE VALIDACIÓN:
 * - PropTypes.string: Cualquier string
 * - PropTypes.oneOf([...]): Solo valores específicos
 *
 * USO:
 * oneOf es útil cuando hay opciones limitadas (como un enum).
 *
 * NOTA DIDÁCTICA:
 * En TypeScript usaríamos:
 * type DialogType = "danger" | "warning" | "info";
 *
 * Pero en JavaScript con PropTypes, oneOf cumple función similar.
 */
ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Visibilidad (obligatorio)
  title: PropTypes.string.isRequired, // Título (obligatorio)
  message: PropTypes.string.isRequired, // Mensaje (obligatorio)
  confirmText: PropTypes.string, // Texto confirmar (opcional)
  cancelText: PropTypes.string, // Texto cancelar (opcional)
  onConfirm: PropTypes.func.isRequired, // Callback confirmar (obligatorio)
  onCancel: PropTypes.func.isRequired, // Callback cancelar (obligatorio)
  type: PropTypes.oneOf(["danger", "warning", "info"]), // Tipo (opcional, validado)
};

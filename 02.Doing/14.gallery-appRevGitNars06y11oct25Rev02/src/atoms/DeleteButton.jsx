/**
 * ============================================================================
 * DELETEBUTTON - BOTÓN ESPECIALIZADO PARA ELIMINAR
 * ============================================================================
 *
 * Botón pre-configurado para acciones de eliminación.
 *
 * PROPÓSITO:
 * - Botón con estilo de "peligro" (danger) para eliminar elementos
 * - Usa color rojo para indicar acción destructiva
 * - Mantiene consistencia en todas las acciones de eliminación
 *
 * CONCEPTO - Semántica Visual:
 * Los colores tienen significado:
 * - Rojo/Danger = Acción destructiva (eliminar, cancelar)
 * - Verde/Success = Acción positiva (guardar, crear)
 * - Azul/Primary = Acción principal
 * - Amarillo/Warning = Advertencia
 *
 * MISMO PATRÓN que EditButton:
 * Reutiliza Button con props específicas pre-configuradas.
 *
 * USO:
 * <DeleteButton onClick={handleDelete} />
 *
 * En lugar de:
 * <Button variant="delete" ariaLabel="Delete item" onClick={handleDelete}>
 *   🗑️
 * </Button>
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { BUTTON_SIZES } from "../utils/constants";
import Button from "./Button";

// ==========================================================================
// COMPONENTE DELETEBUTTON
// ==========================================================================

/**
 * DeleteButton - Botón para acciones destructivas (eliminar)
 *
 * @param {Object} props
 * @param {Function} props.onClick - REQUERIDO: Callback al eliminar
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {string} props.size - Tamaño del botón
 * @param {React.ReactNode} props.children - Contenido personalizado
 *
 * CONCEPTO - Composición:
 * Este es un "wrapper" alrededor de Button.
 * No implementa lógica nueva, solo configura Button de cierta manera.
 *
 * VENTAJA:
 * Si necesitamos cambiar todos los botones de eliminar
 * (por ejemplo, cambiar el ícono de 🗑️ a ❌),
 * solo cambiamos este componente y afecta a TODA la app.
 */
export default function DeleteButton({
  onClick,
  disabled = false,
  size = BUTTON_SIZES.MEDIUM,
  children,
}) {
  /**
   * RENDER: Button configurado para eliminar
   *
   * PROPS FIJAS:
   * - variant="delete": Aplica estilos rojos de peligro
   * - ariaLabel="Delete item": Para accesibilidad
   *
   * ÍCONO POR DEFECTO:
   * 🗑️ Emoji de papelera/basura
   * Universalmente reconocido como "eliminar"
   *
   * CHILDREN PERSONALIZADO:
   * Permite sobrescribir el ícono si es necesario:
   * <DeleteButton>Eliminar</DeleteButton>
   * <DeleteButton><TrashIcon /></DeleteButton>
   */
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant="delete" // Estilo de peligro (rojo)
      ariaLabel="Delete item" // Accesibilidad
    >
      {children || <span className="btn-icon">🗑️</span>}
    </Button>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de DeleteButton
 *
 * NOTA IMPORTANTE:
 * onClick es REQUERIDO porque un botón de eliminar sin acción
 * no tiene sentido y probablemente es un error del desarrollador.
 */
DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired, // OBLIGATORIO
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE,
  ]),
  children: PropTypes.node,
};

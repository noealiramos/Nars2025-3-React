/**
 * ============================================================================
 * EDITBUTTON - BOTÓN ESPECIALIZADO PARA EDITAR
 * ============================================================================
 *
 * Componente especializado que envuelve Button con configuración específica
 * para acciones de edición.
 *
 * PROPÓSITO:
 * - Botón pre-configurado para editar elementos
 * - Simplifica el uso al tener valores por defecto apropiados
 * - Mantiene consistencia visual en toda la aplicación
 *
 * CONCEPTO CLAVE - Composición de Componentes:
 * En lugar de duplicar código, reutilizamos Button y le pasamos
 * props específicas. Esto es composición: construir componentes
 * más específicos a partir de componentes genéricos.
 *
 * VENTAJAS DE ESTE PATRÓN:
 * - Reutilización: Button maneja toda la lógica
 * - Consistencia: Todos los botones "edit" lucen igual
 * - Mantenibilidad: Cambios en Button afectan a todos
 * - Simplicidad: Usar EditButton es más fácil que Button con props
 *
 * COMPARACIÓN:
 * En lugar de escribir:
 * <Button variant="edit" ariaLabel="Edit item">✏️</Button>
 *
 * Escribimos:
 * <EditButton onClick={handleEdit} />
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { BUTTON_SIZES } from "../utils/constants";
import Button from "./Button"; // Componente base que reutilizamos

// ==========================================================================
// COMPONENTE EDITBUTTON
// ==========================================================================

/**
 * EditButton - Botón especializado para acciones de edición
 *
 * @param {Object} props
 * @param {Function} props.onClick - REQUERIDO: Callback al hacer clic
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {string} props.size - Tamaño del botón
 * @param {React.ReactNode} props.children - Contenido personalizado (opcional)
 *
 * CONCEPTO - Props Pass-Through:
 * Este componente recibe props y las "pasa" directamente a Button.
 * También agrega props adicionales que siempre son iguales (variant="edit").
 *
 * FLUJO DE DATOS:
 * 1. Componente padre llama <EditButton onClick={handleEdit} />
 * 2. EditButton recibe las props
 * 3. EditButton renderiza <Button> con esas props + props fijas
 * 4. Button renderiza el botón HTML final
 */
export default function EditButton({
  onClick,
  disabled = false,
  size = BUTTON_SIZES.MEDIUM,
  children,
}) {
  /**
   * RENDER: Button con configuración específica para "edit"
   *
   * PROPS PASADAS A BUTTON:
   * - onClick, disabled, size: Vienen del padre
   * - variant="edit": FIJO - siempre es "edit"
   * - ariaLabel="Edit item": FIJO - para accesibilidad
   * - children: Ícono de lápiz por defecto, o contenido personalizado
   *
   * OPERADOR OR (||):
   * {children || <span>✏️</span>}
   *
   * Significa: "Si hay children usa eso, si no, usa el emoji de lápiz"
   *
   * EJEMPLOS:
   * <EditButton /> → Muestra ✏️
   * <EditButton>Editar</EditButton> → Muestra "Editar"
   * <EditButton><Icon name="edit" /></EditButton> → Muestra el ícono
   */
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant="edit" // Variante fija
      ariaLabel="Edit item" // Label fijo para accesibilidad
    >
      {children || <span className="btn-icon">✏️</span>}
    </Button>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes específicos de EditButton
 *
 * DIFERENCIAS CON BUTTON:
 * - onClick es REQUERIDO aquí (no tiene sentido un botón edit sin acción)
 * - variant NO está en las props (siempre es "edit")
 * - ariaLabel NO está en las props (siempre es "Edit item")
 * - children es OPCIONAL (tiene valor por defecto: ✏️)
 */
EditButton.propTypes = {
  onClick: PropTypes.func.isRequired, // OBLIGATORIO
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE,
  ]),
  children: PropTypes.node, // OPCIONAL - tiene default
};

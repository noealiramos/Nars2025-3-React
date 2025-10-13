/**
 * ============================================================================
 * BUTTON - COMPONENTE ATÓMICO BASE
 * ============================================================================
 *
 * Este es el componente de botón más básico de la aplicación.
 * Siguiendo Atomic Design, es un "átomo" - el componente más pequeño y reutilizable.
 *
 * PROPÓSITO:
 * - Botón reutilizable con múltiples variantes visuales
 * - Maneja estados (disabled, hover, active)
 * - Flexible con tamaños y estilos
 * - Accesible con ARIA labels
 *
 * CONCEPTOS CLAVE:
 * - Props con valores por defecto
 * - Children prop para contenido flexible
 * - PropTypes para validación
 * - Clases CSS dinámicas
 * - Composición de strings
 *
 * USO:
 * <Button onClick={handleClick} variant="primary" size="large">
 *   Guardar
 * </Button>
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types"; // Para validación de tipos
import { BUTTON_SIZES } from "../utils/constants"; // Constantes de tamaños
import "./Button.css"; // Estilos del botón

// ==========================================================================
// COMPONENTE BUTTON
// ==========================================================================

/**
 * Button - Componente de botón reutilizable
 *
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido del botón (texto, iconos, etc.)
 * @param {Function} props.onClick - Callback cuando se hace clic
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {string} props.size - Tamaño del botón (small, medium, large)
 * @param {string} props.variant - Variante visual del botón
 * @param {string} props.type - Tipo HTML del botón (button, submit, reset)
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.ariaLabel - Label para accesibilidad
 *
 * CONCEPTO - Props con Valores por Defecto:
 * Usamos sintaxis de desestructuración con valores por defecto.
 * Si no se pasa la prop, usa el valor por defecto.
 * Ejemplo: size = BUTTON_SIZES.MEDIUM
 *
 * CONCEPTO - Children Prop:
 * 'children' es especial. Contiene todo lo que está entre <Button>...</Button>
 * Puede ser texto, iconos, o cualquier JSX.
 */
export default function Button({
  children,
  onClick,
  disabled = false,
  size = BUTTON_SIZES.MEDIUM,
  variant = "default",
  type = "button",
  className = "",
  ariaLabel,
}) {
  // ========================================================================
  // CONSTRUCCIÓN DE CLASES CSS DINÁMICAS
  // ========================================================================

  /**
   * PATRÓN: Clases CSS Dinámicas
   *
   * Construimos el className final combinando múltiples clases
   * basándose en las props recibidas.
   *
   * EJEMPLO:
   * Si recibimos: size="large", variant="primary", disabled=true
   * Resultado: "btn btn--large btn--primary btn--disabled"
   *
   * METODOLOGÍA BEM (Block Element Modifier):
   * - btn: Block (elemento base)
   * - btn--large: Modifier (variación del block)
   * - btn--primary: Modifier (otra variación)
   */

  const baseClass = "btn"; // Clase base siempre presente

  const sizeClass = `btn--${size}`; // Modificador de tamaño

  // Solo agregar variante si no es "default"
  const variantClass = variant !== "default" ? `btn--${variant}` : "";

  // Agregar clase disabled si está deshabilitado
  const disabledClass = disabled ? "btn--disabled" : "";

  /**
   * TÉCNICA: Construcción de className final
   *
   * PASOS:
   * 1. Crear array con todas las clases posibles
   * 2. filter(Boolean): Elimina valores falsy ("", null, undefined, false)
   * 3. join(" "): Une las clases con espacio
   *
   * POR QUÉ FILTER(BOOLEAN):
   * Si variantClass es "", filter lo elimina del array.
   * Solo las clases con valor terminan en el string final.
   *
   * EJEMPLO:
   * ["btn", "btn--medium", "", "btn--disabled", "custom-class"]
   * → filter → ["btn", "btn--medium", "btn--disabled", "custom-class"]
   * → join → "btn btn--medium btn--disabled custom-class"
   */
  const buttonClass = [
    baseClass,
    sizeClass,
    variantClass,
    disabledClass,
    className, // Clases adicionales del padre
  ]
    .filter(Boolean) // Eliminar strings vacíos
    .join(" "); // Unir con espacios

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ELEMENTO: <button>
   *
   * PROPS HTML:
   * - type: Define el comportamiento del botón
   *   - "button": Botón normal (default)
   *   - "submit": Envía formulario
   *   - "reset": Resetea formulario
   *
   * - disabled: HTML nativo, previene clicks
   * - className: Todas las clases CSS construidas
   * - aria-label: Para accesibilidad (lectores de pantalla)
   *
   * CONCEPTO - Accesibilidad:
   * aria-label es importante cuando el botón tiene solo un ícono.
   * Permite que lectores de pantalla describan el botón.
   *
   * CHILDREN:
   * {children} renderiza todo el contenido entre <Button>...</Button>
   */
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS CON PROPTYPES
// ==========================================================================

/**
 * CONCEPTO - PropTypes:
 * Valida que las props recibidas sean del tipo correcto.
 *
 * BENEFICIOS:
 * - Detecta errores en desarrollo
 * - Documenta qué props acepta el componente
 * - Muestra warnings en consola si hay problemas
 *
 * TIPOS COMUNES:
 * - PropTypes.node: Cualquier cosa renderizable (string, número, JSX)
 * - PropTypes.func: Función
 * - PropTypes.bool: Booleano
 * - PropTypes.string: String
 * - PropTypes.oneOf([...]): Solo ciertos valores específicos
 *
 * isRequired: La prop es obligatoria
 * Sin isRequired: La prop es opcional
 */
Button.propTypes = {
  children: PropTypes.node.isRequired, // OBLIGATORIO: Contenido del botón
  onClick: PropTypes.func, // OPCIONAL: Función de click
  disabled: PropTypes.bool, // OPCIONAL: Estado deshabilitado
  size: PropTypes.oneOf([
    // OPCIONAL: Solo estos tamaños específicos
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE,
  ]),
  variant: PropTypes.oneOf([
    // OPCIONAL: Solo estas variantes específicas
    "default",
    "primary",
    "secondary",
    "danger",
    "success",
    "warning",
    "info",
    "ghost",
    "edit",
    "delete",
    "view",
    "play",
    "tag",
  ]),
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Tipos HTML válidos
  className: PropTypes.string, // Clases CSS adicionales
  ariaLabel: PropTypes.string, // Label de accesibilidad
};

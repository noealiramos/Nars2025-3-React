/**
 * ============================================================================
 * PLAYBUTTON - BOTÓN DE REPRODUCCIÓN/PAUSA
 * ============================================================================
 *
 * Botón especializado para controlar reproducción (carrusel de fotos).
 *
 * PROPÓSITO:
 * - Botón que alterna entre Play (▶️) y Pause (⏸️)
 * - El ícono y el label cambian según el estado
 * - Visual y semánticamente representa el estado actual
 *
 * CONCEPTO CLAVE - Estado Reactivo:
 * Este componente es "reactivo" al estado.
 * Dependiendo de la prop 'isPlaying', muestra diferentes:
 * - Íconos (play vs pause)
 * - Labels de accesibilidad
 * - Clases CSS
 *
 * DIFERENCIA CON OTROS BOTONES:
 * EditButton y DeleteButton son estáticos (siempre lucen igual).
 * PlayButton es dinámico (cambia según el estado).
 *
 * USO:
 * const [playing, setPlaying] = useState(false);
 * <PlayButton
 *   isPlaying={playing}
 *   onClick={() => setPlaying(!playing)}
 * />
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { BUTTON_SIZES } from "../utils/constants";
import Button from "./Button";

// ==========================================================================
// COMPONENTE PLAYBUTTON
// ==========================================================================

/**
 * PlayButton - Botón de play/pause para carrusel
 *
 * @param {Object} props
 * @param {Function} props.onClick - REQUERIDO: Callback al hacer clic
 * @param {boolean} props.isPlaying - Si está reproduciéndose actualmente
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {string} props.size - Tamaño del botón
 *
 * CONCEPTO - Renderizado Condicional:
 * Este componente usa operadores ternarios para decidir
 * qué mostrar basándose en el estado 'isPlaying'.
 *
 * FLUJO:
 * 1. Usuario hace clic en el botón
 * 2. Se ejecuta onClick (probablemente cambia isPlaying)
 * 3. El componente se re-renderiza con el nuevo valor
 * 4. Los ternarios evalúan el nuevo valor
 * 5. Se muestra el ícono/label correcto
 */
export default function PlayButton({
  onClick,
  isPlaying = false,
  disabled = false,
  size = BUTTON_SIZES.MEDIUM,
}) {
  // ========================================================================
  // VALORES CONDICIONALES
  // ========================================================================

  /**
   * CLASE CSS CONDICIONAL
   *
   * Si está reproduciéndose, agregar clase "playing"
   * Esto permite aplicar estilos CSS especiales (ej: animación)
   *
   * OPERADOR TERNARIO:
   * condición ? valorSiTrue : valorSiFalse
   */
  const className = isPlaying ? "playing" : "";

  /**
   * ARIA LABEL CONDICIONAL
   *
   * ACCESIBILIDAD:
   * Lectores de pantalla dirán "Play" o "Pause" según corresponda.
   *
   * Esto es crucial para usuarios con discapacidades visuales.
   * Les indica la acción que realizará el botón, no el estado actual.
   */
  const ariaLabel = isPlaying ? "Pause" : "Play";

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * RENDER CONDICIONAL DEL ÍCONO
   *
   * LÓGICA:
   * - Si isPlaying === true → Mostrar ⏸️ (pause)
   * - Si isPlaying === false → Mostrar ▶️ (play)
   *
   * PATRÓN UX COMÚN:
   * El botón muestra la PRÓXIMA acción, no el estado actual.
   * Si está reproduciendo, muestras "pause" (lo que pasará si haces clic).
   *
   * ALTERNATIVA (menos común):
   * Mostrar el estado actual: "🔊 Playing" o "⏹️ Stopped"
   * Pero esto es menos intuitivo para el usuario.
   *
   * EXPRESIÓN INLINE:
   * {isPlaying ? "⏸️" : "▶️"}
   * Se evalúa durante el render y devuelve el emoji correcto.
   */
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant="play"
      className={className} // Clase dinámica
      ariaLabel={ariaLabel} // Label dinámico
    >
      <span className="btn-icon">{isPlaying ? "⏸️" : "▶️"}</span>
    </Button>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de PlayButton
 *
 * PROP ADICIONAL:
 * - isPlaying: bool - Estado de reproducción
 *   No es requerida porque tiene valor por defecto (false)
 *
 * USO DEL ESTADO:
 * Este componente es "controlled": recibe el estado desde fuera.
 * No maneja su propio estado interno.
 * El componente padre controla si está reproduciéndose o no.
 */
PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired, // OBLIGATORIO
  isPlaying: PropTypes.bool, // Estado de reproducción
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE,
  ]),
};

/**
 * ============================================================================
 * EDITALBUM - MODAL PARA CREAR/EDITAR ÁLBUM
 * ============================================================================
 *
 * Componente modal wrapper que contiene el formulario de álbum.
 *
 * PROPÓSITO:
 * - Mostrar AlbumForm en un modal
 * - Manejar apertura/cierre del modal
 * - Cerrar al hacer click fuera (backdrop)
 * - Proporcionar botón de cerrar
 *
 * CONCEPTOS CLAVE:
 * - Modal pattern: Overlay + Content
 * - Early return: No renderizar si no está abierto
 * - Event bubbling: Cerrar al click en overlay
 * - Wrapper component: Envuelve otro componente
 * - Props pass-through: Pasa props a componente hijo
 *
 * ARQUITECTURA:
 * EditAlbum (modal wrapper) → AlbumForm (formulario)
 *
 * PATRÓN DE SEPARACIÓN:
 * ¿Por qué no poner el modal dentro de AlbumForm?
 *
 * VENTAJAS DE SEPARAR:
 * 1. AlbumForm puede usarse fuera de modal
 * 2. Modal puede usarse con otros forms
 * 3. Separación de responsabilidades
 * 4. Reutilización de componentes
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import AlbumForm from "../molecules/AlbumForm"; // Formulario de álbum
import "./Pages.css"; // Estilos compartidos

// ==========================================================================
// COMPONENTE EDITALBUM
// ==========================================================================

/**
 * EditAlbum - Modal wrapper para formulario de álbum
 *
 * @param {Object} props
 * @param {string} props.action - Modo: "create" o "edit"
 * @param {Object} props.album - Datos del álbum (al editar)
 * @param {Function} props.onSaveAlbum - Callback al guardar
 * @param {Function} props.onCancel - Callback al cancelar/cerrar
 * @param {boolean} props.isOpen - Si el modal está visible
 *
 * CONCEPTO - Modal Wrapper:
 * Este componente NO es el formulario.
 * Es el CONTENEDOR modal que envuelve el formulario.
 *
 * RESPONSABILIDADES:
 * - Controlar visibilidad (isOpen)
 * - Manejar backdrop click
 * - Mostrar botón cerrar
 * - Pasar props a AlbumForm
 *
 * NO maneja:
 * - Lógica del formulario
 * - Validación
 * - Estado de campos
 * (Todo eso está en AlbumForm)
 *
 * PATRÓN:
 * Wrapper = UI container
 * Child = Logic + Content
 */
export default function EditAlbum({
  action,
  album,
  onSaveAlbum,
  onCancel,
  isOpen,
}) {
  // ========================================================================
  // EARLY RETURN - MODAL CERRADO
  // ========================================================================

  /**
   * GUARD CLAUSE: Si no está abierto, no renderizar
   *
   * CONCEPTO - Conditional Rendering Optimization:
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
   * 1. No agrega elementos al DOM cuando no se necesitan
   * 2. Mejor rendimiento (menos nodos DOM)
   * 3. CSS más simple (no necesita display: none)
   * 4. Cleanup automático (listeners, etc.)
   *
   * RETURN NULL:
   * En React, return null significa "no renderizar nada".
   * El componente existe, pero no produce output visual.
   */
  if (!isOpen) return null;

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * handleBackdropClick - Cerrar modal al hacer click en backdrop
   *
   * @param {Event} e - Evento del click
   *
   * CONCEPTO - Click Outside to Close:
   * Patrón UX común: click fuera del modal lo cierra.
   *
   * PROBLEMA - EVENT BUBBLING:
   * Click en cualquier elemento hijo también dispara
   * el click del padre (backdrop).
   *
   * SOLUCIÓN:
   * e.target === e.currentTarget
   *
   * e.target: Elemento donde REALMENTE se hizo click
   * e.currentTarget: Elemento con el handler (backdrop)
   *
   * Si son iguales → Click fue en backdrop
   * Si son diferentes → Click fue en hijo (modal-content)
   *
   * EJEMPLO:
   * <div onClick={handler}>        ← currentTarget
   *   <div>                        ← hijo
   *     <button>X</button>         ← target
   *   </div>
   * </div>
   *
   * Click en button:
   * - target = button
   * - currentTarget = div exterior
   * - target !== currentTarget → NO cerrar
   *
   * Click en div exterior:
   * - target = div exterior
   * - currentTarget = div exterior
   * - target === currentTarget → Cerrar
   *
   * OPTIONAL CHAINING:
   * onCancel?.()
   *
   * Solo llama si onCancel existe.
   * Previene error si la prop no se pasó.
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA MODAL:
   *
   * 1. .modal-backdrop
   *    - Overlay opaco que cubre toda la pantalla
   *    - Fondo semi-transparente (rgba)
   *    - z-index alto (sobre todo lo demás)
   *    - onClick para cerrar
   *
   * 2. .modal-content
   *    - Contenedor del contenido real
   *    - Centrado en la pantalla
   *    - Fondo sólido (blanco)
   *    - Padding y bordes
   *    - Scroll interno si es necesario
   *
   * 3. button.modal-close-button
   *    - Botón "X" en esquina superior derecha
   *    - Posición absoluta
   *    - onClick para cerrar
   *
   * 4. <AlbumForm>
   *    - Componente hijo con el formulario
   *    - Recibe todas las props necesarias
   *
   * CSS TÍPICO:
   * .modal-backdrop {
   *   position: fixed;
   *   top: 0; left: 0;
   *   width: 100vw; height: 100vh;
   *   background: rgba(0,0,0,0.5);
   *   display: flex;
   *   align-items: center;
   *   justify-content: center;
   *   z-index: 1000;
   * }
   *
   * .modal-content {
   *   background: white;
   *   border-radius: 8px;
   *   max-width: 600px;
   *   max-height: 90vh;
   *   overflow-y: auto;
   *   position: relative;
   * }
   *
   * ONCLICK EN BACKDROP:
   * onClick={handleBackdropClick}
   *
   * Se dispara al hacer click en cualquier parte del backdrop.
   * handleBackdropClick verifica si fue en backdrop o en hijo.
   *
   * ARIA-LABEL EN BOTÓN:
   * aria-label="Cerrar modal"
   *
   * ACCESIBILIDAD:
   * Screen readers leen "Cerrar modal" en lugar de solo "X".
   * Importante para usuarios con discapacidades visuales.
   *
   * PROPS PASS-THROUGH:
   * Todas las props se pasan directamente a AlbumForm:
   * - action: "create" o "edit"
   * - album: Datos del álbum (si existe)
   * - onSaveAlbum: Callback al guardar
   * - onCancel: Callback al cancelar
   *
   * PATRÓN:
   * EditAlbum es transparente.
   * Solo agrega el modal wrapper.
   * Toda la lógica del formulario está en AlbumForm.
   */
  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* ==============================================================
            BOTÓN CERRAR
            ==============================================================

            POSICIÓN:
            Típicamente esquina superior derecha.
            Position absolute dentro de modal-content.

            SÍMBOLO:
            ✕ (multiplicación) es estándar para cerrar.
            Alternativas: ×, ✖, X

            ONCLICK:
            Llama directamente onCancel (no necesita verificar target).
         */}
        <button
          className="modal-close-button"
          onClick={onCancel}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* ==============================================================
            FORMULARIO DE ÁLBUM
            ==============================================================

            AlbumForm maneja:
            - Todos los inputs
            - Validación
            - Submit
            - Estado del formulario

            EditAlbum solo:
            - Muestra el form en modal
            - Maneja abrir/cerrar
         */}
        <AlbumForm
          action={action}
          album={album}
          onSaveAlbum={onSaveAlbum}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}

/**
 * NOTA: No hay PropTypes definidos
 *
 * OPCIONES:
 *
 * 1. Agregar PropTypes (recomendado):
 * EditAlbum.propTypes = {
 *   action: PropTypes.oneOf(["create", "edit"]),
 *   album: PropTypes.object,
 *   onSaveAlbum: PropTypes.func,
 *   onCancel: PropTypes.func,
 *   isOpen: PropTypes.bool.isRequired,
 * };
 *
 * 2. Usar TypeScript (mejor para proyectos grandes):
 * interface Props {
 *   action?: "create" | "edit";
 *   album?: Album;
 *   onSaveAlbum?: (album: Album) => void;
 *   onCancel?: () => void;
 *   isOpen: boolean;
 * }
 *
 * 3. Dejar sin validación (solo para demos/prototipos)
 *
 * Para consistencia con el resto del proyecto,
 * deberías agregar PropTypes.
 */

/**
 * ============================================================================
 * EDITPHOTO - MODAL PARA CREAR/EDITAR FOTO
 * ============================================================================
 *
 * Componente modal wrapper que contiene el formulario de foto.
 *
 * PROPÓSITO:
 * - Mostrar PhotoForm en un modal
 * - Manejar apertura/cierre del modal
 * - Cerrar al hacer click fuera (backdrop)
 * - Proporcionar botón de cerrar
 *
 * CONCEPTOS CLAVE:
 * - Modal pattern: Mismo que EditAlbum
 * - Wrapper component: Envuelve PhotoForm
 * - Props pass-through: Pasa props al hijo
 * - Reusable pattern: Patrón consistente
 *
 * SIMILITUD CON EDITALBUM:
 * Este componente es prácticamente idéntico a EditAlbum.
 * Solo cambia el formulario hijo (PhotoForm vs AlbumForm).
 *
 * PATRÓN REUTILIZABLE:
 * EditAlbum y EditPhoto siguen el mismo patrón:
 * 1. Early return si no está abierto
 * 2. handleBackdropClick para cerrar
 * 3. Estructura modal-backdrop > modal-content
 * 4. Botón cerrar
 * 5. Form como hijo
 *
 * REFACTORIZACIÓN POSIBLE:
 * Podrías crear un componente genérico Modal:
 * <Modal isOpen={isOpen} onClose={onClose}>
 *   <PhotoForm {...props} />
 * </Modal>
 *
 * Pero mantener separado es más explícito y didáctico.
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PhotoForm from "../molecules/PhotoForm"; // Formulario de foto
import "./Pages.css"; // Estilos compartidos

// ==========================================================================
// COMPONENTE EDITPHOTO
// ==========================================================================

/**
 * EditPhoto - Modal wrapper para formulario de foto
 *
 * @param {Object} props
 * @param {string} props.action - Modo: "create" o "edit"
 * @param {Object} props.photo - Datos de la foto (al editar)
 * @param {Function} props.onSavePhoto - Callback al guardar
 * @param {Function} props.onCancel - Callback al cancelar/cerrar
 * @param {boolean} props.isOpen - Si el modal está visible
 *
 * CONCEPTO - Modal Wrapper Pattern:
 * Igual que EditAlbum, este es un wrapper.
 *
 * SEPARACIÓN DE RESPONSABILIDADES:
 * - EditPhoto: Modal UI (abrir/cerrar, backdrop)
 * - PhotoForm: Formulario lógica (campos, validación)
 *
 * VENTAJAS:
 * 1. PhotoForm puede usarse sin modal
 * 2. Modal puede reutilizarse con otros forms
 * 3. Código más organizado y mantenible
 * 4. Testing más fácil (test form y modal separados)
 */
export default function EditPhoto({
  action,
  photo,
  onSavePhoto,
  onCancel,
  isOpen,
}) {
  // ========================================================================
  // EARLY RETURN - MODAL CERRADO
  // ========================================================================

  /**
   * GUARD CLAUSE: No renderizar si modal cerrado
   *
   * MISMO PATRÓN QUE EDITALBUM:
   * - if (!isOpen) return null
   * - No agrega elementos al DOM
   * - Mejor rendimiento
   * - Cleanup automático
   *
   * RETURN NULL:
   * React interpreta null como "no renderizar nada".
   * El componente existe pero no tiene output visual.
   *
   * VENTAJA vs DISPLAY NONE:
   * - display: none → Elemento en DOM, invisible
   * - return null → Elemento NO en DOM
   *
   * Menos nodos DOM = Mejor rendimiento
   */
  if (!isOpen) return null;

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * handleBackdropClick - Cerrar al click en backdrop
   *
   * @param {Event} e - Evento del click
   *
   * CONCEPTO - Click Outside Pattern:
   * Mismo patrón que EditAlbum.
   *
   * LÓGICA:
   * e.target === e.currentTarget
   *
   * Solo cierra si el click fue directamente en el backdrop,
   * no en elementos hijos (modal-content, formulario).
   *
   * FLUJO:
   * 1. Usuario hace click en backdrop gris
   * 2. target = backdrop, currentTarget = backdrop
   * 3. Son iguales → Cerrar modal
   *
   * 4. Usuario hace click en formulario
   * 5. target = input/button, currentTarget = backdrop
   * 6. Son diferentes → NO cerrar modal
   *
   * PATRÓN UX:
   * Es estándar que los modales se cierren al hacer
   * click fuera del contenido.
   *
   * ALTERNATIVA:
   * Algunos modales no permiten cerrar por click outside
   * (cuando es crítico completar la acción).
   *
   * Para eso, simplemente no agregarías onClick al backdrop.
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
   * Idéntica a EditAlbum.
   *
   * 1. .modal-backdrop
   *    - Overlay de pantalla completa
   *    - Fondo semi-transparente
   *    - Click para cerrar
   *
   * 2. .modal-content
   *    - Contenedor blanco centrado
   *    - Contiene el formulario
   *    - Scroll interno si necesario
   *
   * 3. .modal-close-button
   *    - Botón "✕" en esquina
   *    - Click para cerrar
   *
   * 4. <PhotoForm>
   *    - Formulario de foto
   *    - Recibe props
   *
   * CSS COMPARTIDO:
   * EditAlbum y EditPhoto usan las mismas clases CSS.
   * Definidas en Pages.css.
   *
   * VENTAJA:
   * Consistencia visual automática.
   * Cambiar estilo de modales afecta ambos.
   *
   * EJEMPLO CSS:
   * .modal-backdrop {
   *   position: fixed;
   *   inset: 0;
   *   background: rgba(0, 0, 0, 0.5);
   *   display: flex;
   *   align-items: center;
   *   justify-content: center;
   *   z-index: 1000;
   * }
   *
   * .modal-content {
   *   background: white;
   *   border-radius: 12px;
   *   max-width: 600px;
   *   width: 90%;
   *   max-height: 90vh;
   *   overflow-y: auto;
   *   position: relative;
   *   padding: 2rem;
   * }
   *
   * .modal-close-button {
   *   position: absolute;
   *   top: 1rem;
   *   right: 1rem;
   *   background: none;
   *   border: none;
   *   font-size: 2rem;
   *   cursor: pointer;
   *   color: #666;
   * }
   *
   * BACKDROP CLICK:
   * onClick={handleBackdropClick}
   *
   * Maneja el patrón "click outside to close".
   *
   * ARIA-LABEL:
   * aria-label="Cerrar modal"
   *
   * Accesibilidad para screen readers.
   * Usuarios con discapacidad visual saben qué hace el botón.
   *
   * PROPS PASS-THROUGH:
   * Todas las props se pasan a PhotoForm:
   * - action: "create" o "edit"
   * - photo: Datos de la foto (si existe)
   * - onSavePhoto: Callback al guardar
   * - onCancel: Callback al cancelar
   *
   * TRANSPARENCIA:
   * EditPhoto no modifica ni intercepta las props.
   * Solo las pasa directamente al PhotoForm.
   *
   * Es un "pass-through component" o "wrapper component".
   */
  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* ==============================================================
            BOTÓN CERRAR
            ==============================================================

            MISMO PATRÓN QUE EDITALBUM:
            - Botón simple con "✕"
            - Esquina superior derecha
            - onClick llama onCancel
            - aria-label para accesibilidad

            CONSISTENCIA:
            Todos los modales de la app tienen el mismo
            botón cerrar en la misma posición.

            PREDICTIBILIDAD UX:
            Usuario sabe dónde buscar el botón cerrar.
         */}
        <button
          className="modal-close-button"
          onClick={onCancel}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* ==============================================================
            FORMULARIO DE FOTO
            ==============================================================

            PhotoForm maneja:
            - Todos los campos (url, title, description, location)
            - Validación de formulario
            - Submit y callbacks
            - Estado de los inputs
            - Errores de validación

            EditPhoto solo maneja:
            - Mostrar/ocultar el modal
            - Click en backdrop
            - Botón cerrar

            SEPARACIÓN CLARA:
            Modal wrapper vs Form logic
         */}
        <PhotoForm
          action={action}
          photo={photo}
          onSavePhoto={onSavePhoto}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}

/**
 * NOTA: Falta PropTypes
 *
 * DEBERÍA AGREGARSE:
 *
 * EditPhoto.propTypes = {
 *   action: PropTypes.oneOf(["create", "edit"]),
 *   photo: PropTypes.shape({
 *     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
 *     url: PropTypes.string,
 *     title: PropTypes.string,
 *     description: PropTypes.string,
 *     location: PropTypes.string,
 *     tags: PropTypes.arrayOf(PropTypes.string),
 *   }),
 *   onSavePhoto: PropTypes.func,
 *   onCancel: PropTypes.func,
 *   isOpen: PropTypes.bool.isRequired,
 * };
 *
 * IMPORTANTE:
 * isOpen debería ser .isRequired porque el componente
 * depende de esta prop para decidir si renderizar.
 *
 * Para mantener consistencia con el resto del proyecto,
 * considera agregar PropTypes a EditAlbum y EditPhoto.
 */

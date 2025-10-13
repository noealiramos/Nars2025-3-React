/**
 * ============================================================================
 * PHOTOVIEWER - VISOR DE FOTO EN MODAL
 * ============================================================================
 *
 * Componente modal que muestra una foto en tamaño completo con detalles.
 *
 * PROPÓSITO:
 * - Mostrar foto en grande para visualización
 * - Mostrar información completa (título, ubicación, descripción, tags)
 * - Cerrar con tecla Escape o click fuera
 * - Prevenir scroll del body cuando está abierto
 * - Optimizar carga de imagen con lazy loading
 *
 * CONCEPTOS CLAVE:
 * - useEffect: Side effects (eventos, body scroll)
 * - Event listeners: Keyboard events
 * - Cleanup functions: Remover listeners
 * - Body scroll lock: UX para modales
 * - Lazy loading: Optimización de imágenes
 * - Modal accessibility: UX y a11y
 *
 * DIFERENCIA CON ALBUMCAROUSEL:
 * - PhotoViewer: Una sola foto (estática)
 * - AlbumCarousel: Múltiples fotos (navegación)
 *
 * HOOKS USADOS:
 * - useEffect (2 veces): Keyboard + Body scroll
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { useEffect } from "react"; // Hook para side effects
import Button from "../atoms/Button"; // Botón cerrar
import { BUTTON_SIZES } from "../utils/constants"; // Constantes
import "./PhotoViewer.css"; // Estilos específicos

// ==========================================================================
// COMPONENTE PHOTOVIEWER
// ==========================================================================

/**
 * PhotoViewer - Modal para visualizar foto en tamaño completo
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - REQUERIDO: Si el visor está abierto
 * @param {Object} props.photo - Datos de la foto a mostrar
 * @param {Function} props.onClose - REQUERIDO: Callback para cerrar
 *
 * CONCEPTO - Photo Lightbox:
 * Este es un "lightbox" o "image viewer".
 * Patrón común en galerías de fotos.
 *
 * CARACTERÍSTICAS:
 * - Foto centrada en pantalla
 * - Fondo oscuro (backdrop)
 * - Información adicional
 * - Cerrar con Escape o click fuera
 * - Prevenir scroll del contenido detrás
 *
 * DIFERENCIA CON EDITPHOTO:
 * - EditPhoto: Modificar datos (formulario)
 * - PhotoViewer: Solo ver (sin edición)
 */
export default function PhotoViewer({ isOpen, photo, onClose }) {
  // ========================================================================
  // EFFECT 1: KEYBOARD EVENTS
  // ========================================================================

  /**
   * CONCEPTO - Keyboard Navigation:
   * Maneja teclas para mejorar UX.
   *
   * TECLAS MANEJADAS:
   * - Escape: Cerrar visor (estándar para modales)
   *
   * PODRÍA MANEJARSE:
   * - Arrow Left/Right: Navegar entre fotos
   * - Enter: Alguna acción
   *
   * useEffect(() => { ... }, [isOpen, onClose])
   *
   * DEPENDENCIAS:
   * [isOpen, onClose]
   *
   * El effect se ejecuta cuando:
   * 1. Componente monta (primera vez)
   * 2. isOpen cambia
   * 3. onClose cambia (poco común, pero correcto)
   *
   * POR QUÉ ONCLOSE EN DEPS:
   * La función handleKeyDown usa onClose.
   * Si onClose cambia, necesitamos recrear el listener
   * con la nueva función.
   *
   * CONCEPTO - Event Listener Lifecycle:
   *
   * 1. addEventListener:
   *    Agrega listener al montar o cuando cambian deps.
   *
   * 2. removeEventListener:
   *    Remueve listener al desmontar o antes de re-ejecutar effect.
   *
   * 3. Cleanup function:
   *    return () => { removeEventListener }
   *
   *    React llama esta función:
   *    - Antes de re-ejecutar el effect
   *    - Cuando el componente se desmonta
   *
   * POR QUÉ ES IMPORTANTE CLEANUP:
   * Sin cleanup:
   * - Listeners se acumulan (memory leak)
   * - Múltiples listeners responden al mismo evento
   * - Problemas de rendimiento
   *
   * PATRÓN:
   * useEffect(() => {
   *   const handler = (e) => { ... };
   *   document.addEventListener('event', handler);
   *   return () => document.removeEventListener('event', handler);
   * }, [deps]);
   *
   * EARLY RETURN EN HANDLER:
   * if (!isOpen) return;
   *
   * Si el visor no está abierto, no hacer nada.
   * Evita cerrar cuando no debe.
   *
   * E.KEY:
   * Propiedad del KeyboardEvent con nombre de la tecla.
   *
   * VALORES COMUNES:
   * - "Escape"
   * - "Enter"
   * - "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"
   * - "a", "b", "c", ... (letras)
   * - " " (espacio)
   *
   * NOTA: e.key vs e.keyCode
   * - e.key: Nombre legible ("Escape")
   * - e.keyCode: Número (27)
   *
   * Usar e.key es más moderno y legible.
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Solo actuar si el visor está abierto
      if (!isOpen) return;

      // Cerrar con tecla Escape
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Agregar listener al document (captura eventos globales)
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup: remover listener
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // ========================================================================
  // EFFECT 2: BODY SCROLL LOCK
  // ========================================================================

  /**
   * CONCEPTO - Body Scroll Lock:
   * Prevenir scroll del body cuando el modal está abierto.
   *
   * PROBLEMA SIN ESTO:
   * Usuario hace scroll → contenido detrás se mueve
   * → Mala UX (confuso, se ve raro)
   *
   * SOLUCIÓN:
   * overflow: hidden en body
   *
   * CUANDO APLICAR:
   * isOpen = true → body overflow = "hidden"
   * isOpen = false → body overflow = "unset"
   *
   * CONCEPTO - Side Effect:
   * Modificar el DOM directamente (body style) es un side effect.
   * Debe hacerse en useEffect, no en render.
   *
   * POR QUÉ:
   * - Render debe ser puro (sin side effects)
   * - useEffect se ejecuta después del render
   * - Garantiza que el DOM esté listo
   *
   * DEPENDENCIAS:
   * [isOpen]
   *
   * El effect se ejecuta cuando isOpen cambia.
   *
   * FLUJO:
   * 1. Usuario abre visor (isOpen = true)
   * 2. Effect se ejecuta
   * 3. body.style.overflow = "hidden"
   * 4. Scroll deshabilitado
   *
   * 5. Usuario cierra visor (isOpen = false)
   * 6. Effect se ejecuta de nuevo
   * 7. body.style.overflow = "unset"
   * 8. Scroll restaurado
   *
   * CLEANUP FUNCTION:
   * return () => { body.style.overflow = "unset" }
   *
   * Se ejecuta:
   * - Cuando el componente se desmonta
   * - Antes de re-ejecutar el effect
   *
   * IMPORTANCIA:
   * Si el componente se desmonta mientras isOpen = true,
   * el cleanup restaura el scroll.
   *
   * Sin cleanup: body quedaría sin scroll permanentemente.
   *
   * OVERFLOW VALUES:
   * - "hidden": No scroll, contenido cortado
   * - "scroll": Siempre muestra scrollbar
   * - "auto": Scrollbar solo si necesario
   * - "unset": Restaura valor por defecto
   *
   * NOTA: "unset" vs "auto"
   * - "unset": Restaura CSS original
   * - "auto": Fuerza auto (podría no ser el original)
   *
   * Usar "unset" es más seguro.
   */
  useEffect(() => {
    if (isOpen) {
      // Deshabilitar scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup: siempre restaurar scroll
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ========================================================================
  // EARLY RETURN - VISOR CERRADO
  // ========================================================================

  /**
   * GUARD CLAUSE: No renderizar si cerrado o sin foto
   *
   * CONDICIONES:
   * !isOpen || !photo
   *
   * No renderiza si:
   * 1. isOpen es false (visor cerrado)
   * 2. photo es null/undefined (sin datos)
   *
   * ORDEN IMPORTANTE:
   * !isOpen || !photo
   *
   * Verifica isOpen primero porque:
   * - Es más común que cambie
   * - Short-circuit: Si isOpen es false, no evalúa !photo
   * - Micro-optimización
   *
   * EARLY RETURN DESPUÉS DE HOOKS:
   * Importante: Hooks (useEffect) DEBEN estar antes del early return.
   *
   * REGLA DE HOOKS:
   * Los hooks deben:
   * 1. Estar en el nivel superior (no en if/loops)
   * 2. Llamarse en el mismo orden cada render
   *
   * INCORRECTO (ERROR):
   * if (!isOpen) return null;
   * useEffect(() => { ... });  // ¡Error! Hook después de return
   *
   * CORRECTO:
   * useEffect(() => { ... });  // Hooks primero
   * if (!isOpen) return null;  // Early return después
   */
  if (!isOpen || !photo) {
    return null;
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA:
   *
   * 1. .photo-viewer-overlay
   *    - Fondo oscuro de pantalla completa
   *    - Click para cerrar
   *
   * 2. .photo-viewer
   *    - Contenedor principal centrado
   *    - Click NO cierra (stopPropagation)
   *
   * 3. .photo-viewer__header
   *    - Título y ubicación
   *    - Botón cerrar
   *
   * 4. .photo-viewer__image-container
   *    - Imagen principal
   *
   * 5. .photo-viewer__footer
   *    - Descripción y tags
   *
   * ONCLICK EN OVERLAY:
   * onClick={onClose}
   *
   * Click en overlay oscuro cierra el visor.
   * Es patrón UX estándar.
   *
   * E.STOPPROPAGATION():
   * onClick={(e) => e.stopPropagation()}
   *
   * CONCEPTO - Event Bubbling:
   * Sin stopPropagation:
   * - Click en visor → También dispara onClick del overlay → Cierra
   *
   * Con stopPropagation:
   * - Click en visor → Detiene bubbling → NO dispara overlay → NO cierra
   *
   * RESULTADO:
   * - Click en overlay oscuro → Cierra
   * - Click en visor (contenido) → No cierra
   *
   * PATRÓN:
   * <div onClick={close}>
   *   <div onClick={(e) => e.stopPropagation()}>
   *     contenido
   *   </div>
   * </div>
   */
  return (
    <div className="photo-viewer-overlay" onClick={onClose}>
      <div className="photo-viewer" onClick={(e) => e.stopPropagation()}>
        {/* ==============================================================
            HEADER - INFORMACIÓN SUPERIOR
            ============================================================== */}
        <div className="photo-viewer__header">
          <div className="photo-viewer__info">
            {/* Título de la foto */}
            <h2 className="photo-viewer__title">{photo.title}</h2>

            {/*
              UBICACIÓN: Condicional

              Solo muestra si photo.location existe.

              ICONO:
              📍 emoji de ubicación
              Alternativa: Font Awesome, Material Icons
            */}
            {photo.location && (
              <p className="photo-viewer__location">
                <span className="photo-viewer__location-icon">📍</span>
                {photo.location}
              </p>
            )}
          </div>

          {/*
            BOTÓN CERRAR:

            COMPOSITION:
            Usa componente Button de atoms.

            PROPS:
            - onClick: Cierra el visor
            - variant: "secondary" (no tan prominente)
            - size: MEDIUM
            - className: Clase adicional para posicionamiento
            - ariaLabel: Accesibilidad

            CHILDREN:
            × (símbolo de cerrar)
          */}
          <Button
            onClick={onClose}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
            className="photo-viewer__close"
            ariaLabel="Cerrar visor"
          >
            ×
          </Button>
        </div>

        {/* ==============================================================
            IMAGEN PRINCIPAL
            ==============================================================

            LOADING="lazy":
            Lazy loading de imágenes.

            CONCEPTO:
            No carga la imagen hasta que esté cerca del viewport.

            VENTAJAS:
            - Carga inicial más rápida
            - Ahorra ancho de banda
            - Mejor rendimiento

            CUANDO USAR:
            - Imágenes fuera del viewport inicial
            - Listas largas de imágenes
            - Galerías

            CUANDO NO USAR:
            - Imágenes above-the-fold (visibles inmediatamente)
            - Imágenes críticas

            EN ESTE CASO:
            El PhotoViewer se abre después de interacción del usuario.
            Lazy loading asegura que solo carga cuando se necesita.

            ALT TEXT:
            alt={photo.title}

            Descripción para accesibilidad.
            Screen readers leen este texto.

            CSS TÍPICO:
            .photo-viewer__image {
              max-width: 100%;
              max-height: 80vh;
              object-fit: contain;
              display: block;
            }

            OBJECT-FIT CONTAIN:
            - Mantiene aspect ratio
            - No recorta la imagen
            - Agrega espacio si necesario

            ALTERNATIVAS:
            - cover: Llena el espacio, puede recortar
            - fill: Estira la imagen (distorsiona)
            - none: Tamaño original
         */}
        <div className="photo-viewer__image-container">
          <img
            src={photo.url}
            alt={photo.title}
            className="photo-viewer__image"
            loading="lazy"
          />
        </div>

        {/* ==============================================================
            FOOTER - DESCRIPCIÓN Y TAGS (CONDICIONAL)
            ==============================================================

            CONDICIÓN:
            {photo.description && ( ... )}

            Solo muestra footer si hay descripción.

            ALTERNATIVA:
            Podrías mostrar footer si hay descripción O tags:
            {(photo.description || (photo.tags && photo.tags.length > 0)) && ( ... )}

            DECISIÓN DE DISEÑO:
            Depende de cómo quieres la UI.
         */}
        {photo.description && (
          <div className="photo-viewer__footer">
            {/* Descripción de la foto */}
            <p className="photo-viewer__description">{photo.description}</p>

            {/*
              TAGS: Condicional doble

              CONDICIÓN:
              photo.tags && photo.tags.length > 0

              Verifica:
              1. tags existe (no null/undefined)
              2. tags no está vacío (length > 0)

              ARRAY.MAP():
              Transforma cada tag en un span.

              KEY:
              key={tag}

              Usa el tag mismo como key.
              Asume que los tags son únicos.

              SI NO SON ÚNICOS:
              key={`${tag}-${index}`}

              ESTRUCTURA:
              <span className="photo-viewer__tag">nature</span>
              <span className="photo-viewer__tag">landscape</span>

              CSS típico para tags:
              .photo-viewer__tag {
                display: inline-block;
                padding: 0.25rem 0.75rem;
                background: #f0f0f0;
                border-radius: 16px;
                margin-right: 0.5rem;
                font-size: 0.875rem;
              }
            */}
            {photo.tags && photo.tags.length > 0 && (
              <div className="photo-viewer__tags">
                {photo.tags.map((tag) => (
                  <span key={tag} className="photo-viewer__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de PhotoViewer
 *
 * PROPS REQUERIDAS:
 * - isOpen: Boolean (obligatorio)
 * - onClose: Función (obligatorio)
 *
 * PROPS OPCIONALES:
 * - photo: Objeto con estructura detallada
 *
 * PHOTO NO ES REQUIRED:
 * Porque verificamos !photo en código.
 * Pero isOpen SÍ debe ser required.
 *
 * PROPTYPES.SHAPE:
 * Define estructura detallada de photo.
 *
 * DENTRO DE SHAPE:
 * - url: isRequired (necesario para <img>)
 * - title: isRequired (necesario para header)
 * - Resto: Opcionales
 *
 * VALIDACIÓN COMPLETA:
 * PropTypes valida:
 * - Tipos correctos
 * - Props requeridas presentes
 * - Estructura de objetos
 *
 * WARNING EN CONSOLA:
 * Si falta url o title:
 * "Warning: Failed prop type: The prop `photo.url` is marked as
 * required in `PhotoViewer`, but its value is `undefined`."
 *
 * VENTAJAS:
 * - Detecta errores temprano
 * - Documentación auto-generada
 * - Autocompletado en IDEs
 * - Previene bugs de tipos
 */
PhotoViewer.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Obligatorio
  photo: PropTypes.shape({
    // Estructura detallada
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string.isRequired, // URL obligatoria
    title: PropTypes.string.isRequired, // Título obligatorio
    description: PropTypes.string, // Opcional
    location: PropTypes.string, // Opcional
    tags: PropTypes.arrayOf(PropTypes.string), // Array de strings
  }),
  onClose: PropTypes.func.isRequired, // Obligatorio
};

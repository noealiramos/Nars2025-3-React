/**
 * ============================================================================
 * PHOTOS - PÁGINA DE VISTA DE FOTOS
 * ============================================================================
 *
 * Componente página que muestra la lista de fotos en formato grid.
 *
 * PROPÓSITO:
 * - Mostrar todas las fotos disponibles
 * - Proporcionar acceso a acciones (editar, eliminar, ver)
 * - Manejar estado vacío con mensaje amigable
 * - Organizar fotos en grid responsivo
 *
 * CONCEPTOS CLAVE:
 * - Page component: Componente de nivel página
 * - List rendering: Map para renderizar lista
 * - Empty state: UI cuando no hay datos
 * - Event delegation: Handlers intermedios
 * - Presentational component: Solo presenta, no maneja estado
 *
 * SIMILITUD CON ALBUMS:
 * Photos y Albums siguen el mismo patrón:
 * - Verificar datos vacíos
 * - Mostrar empty state o grid
 * - Map sobre array de items
 * - Delegar eventos hacia arriba
 *
 * DIFERENCIA:
 * - Albums usa AlbumCard
 * - Photos usa PhotoCard
 * - Diferentes callbacks (onViewPhoto vs onPlayAlbum)
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from 'prop-types';
import PhotoCard from "../molecules/PhotoCard"; // Tarjeta de foto
import "./Pages.css"; // Estilos compartidos

// ==========================================================================
// COMPONENTE PHOTOS
// ==========================================================================

/**
 * Photos - Página de vista de fotos
 *
 * @param {Object} props
 * @param {Array} props.photos - REQUERIDO: Array de fotos a mostrar
 * @param {Function} props.onEditPhoto - Callback al editar foto
 * @param {Function} props.onDeletePhoto - Callback al eliminar foto
 * @param {Function} props.onViewPhoto - Callback al ver foto (modal viewer)
 *
 * CONCEPTO - Consistent Pattern:
 * Este componente es casi idéntico a Albums.
 * Es un patrón reutilizable para páginas de lista.
 *
 * PATRÓN GENÉRICO:
 * 1. Recibir array de items
 * 2. Recibir callbacks
 * 3. Verificar vacío → Empty state
 * 4. Renderizar grid → Map items
 * 5. Pasar callbacks a cards
 *
 * VENTAJAS DE CONSISTENCIA:
 * - Fácil de entender (mismo patrón)
 * - Fácil de mantener (cambios similares)
 * - Predecible (sabes qué esperar)
 *
 * REFACTORIZACIÓN POSIBLE:
 * Podrías crear un componente genérico ListPage
 * que reciba el tipo de card como prop.
 *
 * Pero para propósitos didácticos, mantener separado
 * es más claro y explícito.
 */
export default function Photos({ photos, onEditPhoto, onDeletePhoto, onViewPhoto }) {
  // ========================================================================
  // HANDLERS - INTERMEDIARIOS CON LOGGING
  // ========================================================================

  /**
   * handleEditPhoto - Intermediario para editar foto
   *
   * @param {Object} photo - Foto a editar
   *
   * CONCEPTO - Event Logging:
   * console.log para debugging en desarrollo.
   *
   * VENTAJAS:
   * - Ver flujo de eventos en consola
   * - Verificar datos pasados
   * - Debugging más fácil
   *
   * EN PRODUCCIÓN:
   * Podrías reemplazar con analytics:
   * analytics.track('Photo Edited', { photoId: photo.id })
   *
   * O eliminar si no es necesario:
   * onClick={onEditPhoto} directamente
   */
  const handleEditPhoto = (photo) => {
    console.log('Editing photo:', photo.title);
    onEditPhoto?.(photo);
  };

  /**
   * handleDeletePhoto - Intermediario para eliminar foto
   *
   * @param {Object} photo - Foto a eliminar
   *
   * Similar a handleEditPhoto.
   * El logging ayuda a ver qué foto se está eliminando.
   */
  const handleDeletePhoto = (photo) => {
    console.log('Deleting photo:', photo.title);
    onDeletePhoto?.(photo);
  };

  /**
   * handleViewPhoto - Intermediario para ver foto
   *
   * @param {Object} photo - Foto a visualizar
   *
   * Este abre el PhotoViewer modal.
   * El logging confirma que el evento se disparó correctamente.
   */
  const handleViewPhoto = (photo) => {
    console.log('Viewing photo:', photo.title);
    onViewPhoto?.(photo);
  };

  // ========================================================================
  // RENDER - ESTADO VACÍO
  // ========================================================================

  /**
   * EARLY RETURN - Empty State
   *
   * CONDICIÓN:
   * !photos || photos.length === 0
   *
   * Verifica dos casos:
   * 1. photos es null/undefined
   * 2. photos es array vacío []
   *
   * CONCEPTO - Defensive Programming:
   * Siempre verificar datos antes de usar.
   *
   * SIN VERIFICACIÓN (PELIGROSO):
   * photos.map(...) → Error si photos es null
   *
   * CON VERIFICACIÓN (SEGURO):
   * if (!photos) return <EmptyState />
   * photos.map(...) → Seguro
   *
   * EMPTY STATE UI:
   * - Icono (📷) relacionado con el contexto
   * - Título claro y descriptivo
   * - Mensaje instructivo (cómo agregar fotos)
   *
   * UX PRINCIPLE:
   * Un empty state bien diseñado:
   * 1. No deja al usuario confundido
   * 2. Proporciona próximos pasos claros
   * 3. Mantiene consistencia visual
   * 4. Es amigable, no negativo
   *
   * MALO: "No photos" (frío, sin ayuda)
   * BUENO: "No hay fotos disponibles. Comienza agregando..." (guía al usuario)
   */
  if (!photos || photos.length === 0) {
    return (
      <div className="photos-container">
        <div className="photos-empty">
          <div className="photos-empty__content">
            {/* Icono visual grande */}
            <span className="photos-empty__icon">📷</span>

            {/* Título del empty state */}
            <h3 className="photos-empty__title">No hay fotos disponibles</h3>

            {/* Mensaje instructivo con acción clara */}
            <p className="photos-empty__message">
              Comienza agregando algunas fotos a tu galería desde el botón "+" en la barra superior.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER - GRID DE FOTOS
  // ========================================================================

  /**
   * ESTRUCTURA:
   * Container → Grid → PhotoCards
   *
   * .photos-container:
   * - Contenedor principal
   * - Padding y layout general
   *
   * .photos-grid:
   * - CSS Grid responsivo
   * - Columnas automáticas según viewport
   * - Gap entre elementos
   *
   * RESPONSIVE GRID (ejemplo CSS):
   * .photos-grid {
   *   display: grid;
   *   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   *   gap: 1rem;
   * }
   *
   * Esto crea:
   * - Columnas automáticas
   * - Mínimo 250px por columna
   * - Máximo 1fr (fracción del espacio)
   * - Se adapta al tamaño de pantalla
   *
   * ARRAY.MAP():
   * Transforma cada photo en un PhotoCard.
   *
   * (photo, index) => JSX
   * - photo: Objeto de la foto actual
   * - index: Posición en el array (0, 1, 2, ...)
   *
   * KEY PROP:
   * key={photo.id || index}
   *
   * PRIORIDAD:
   * 1. photo.id: Único y estable (MEJOR)
   * 2. index: Fallback si no hay id
   *
   * REGLA DE KEYS:
   * - DEBE ser único entre hermanos
   * - DEBE ser estable (no cambiar entre renders)
   * - DEBE no usar random (Math.random())
   *
   * POR QUÉ KEYS SON IMPORTANTES:
   * React usa keys para:
   * 1. Identificar qué items cambiaron
   * 2. Optimizar re-renders (reconciliación)
   * 3. Preservar estado de componentes
   *
   * EJEMPLO DE PROBLEMA SIN KEY CORRECTA:
   * [A, B, C] → Eliminas B → [A, C]
   * Con index como key:
   * - React piensa A (key=0) es A ✓
   * - React piensa C (key=1) es B ✗ (incorrecto!)
   * - Necesita re-renderizar todo
   *
   * Con id como key:
   * - React ve que B (key=id-B) fue eliminado
   * - A y C mantienen sus keys
   * - Solo elimina B del DOM
   *
   * PROPS PASADAS A PHOTOCARD:
   * - photo: Datos completos de la foto
   * - onEdit: Handler para editar
   * - onDelete: Handler para eliminar
   * - onClick: Handler para ver (abre PhotoViewer)
   *
   * NOTA: onClick se usa para ver la foto en grande.
   * Es común que las cards tengan click para ver detalles.
   */
  return (
    <div className="photos-container">
      <div className="photos-grid">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id || index}
            photo={photo}
            onEdit={handleEditPhoto}
            onDelete={handleDeletePhoto}
            onClick={handleViewPhoto}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de Photos
 *
 * PROPS REQUERIDAS:
 * - photos: Array de fotos (obligatorio)
 *
 * PROPS OPCIONALES:
 * - onEditPhoto: Callback para editar
 * - onDeletePhoto: Callback para eliminar
 * - onViewPhoto: Callback para ver
 *
 * PHOTOS IS REQUIRED:
 * Aunque verificamos !photos en código,
 * isRequired genera warning útil en desarrollo.
 *
 * CALLBACKS OPCIONALES:
 * Flexibilidad para usar el componente de diferentes formas:
 * - Solo mostrar (sin callbacks)
 * - Con algunas acciones (solo view)
 * - Con todas las acciones
 *
 * OPTIONAL CHAINING:
 * Por eso usamos onEditPhoto?.() en los handlers.
 * Si la prop no existe, no causa error.
 *
 * PROPTYPES.ARRAY:
 * Validación genérica de array.
 *
 * VALIDACIÓN MÁS ESPECÍFICA (opcional):
 * photos: PropTypes.arrayOf(PropTypes.shape({
 *   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
 *   url: PropTypes.string.isRequired,
 *   title: PropTypes.string.isRequired,
 *   description: PropTypes.string,
 *   location: PropTypes.string,
 *   tags: PropTypes.arrayOf(PropTypes.string),
 * }))
 *
 * TRADEOFF:
 * - Específico: Más seguro, más código
 * - Genérico: Más flexible, menos validación
 *
 * Para este proyecto didáctico, mantenemos simplicidad.
 */
Photos.propTypes = {
  photos: PropTypes.array.isRequired,  // Array obligatorio
  onEditPhoto: PropTypes.func,         // Callback opcional
  onDeletePhoto: PropTypes.func,       // Callback opcional
  onViewPhoto: PropTypes.func,         // Callback opcional
};

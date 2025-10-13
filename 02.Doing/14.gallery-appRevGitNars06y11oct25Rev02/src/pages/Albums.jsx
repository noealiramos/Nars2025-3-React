/**
 * ============================================================================
 * ALBUMS - PÁGINA DE VISTA DE ÁLBUMES
 * ============================================================================
 *
 * Componente página que muestra la lista de álbumes en formato grid.
 *
 * PROPÓSITO:
 * - Mostrar todos los álbumes disponibles
 * - Proporcionar acceso a acciones (editar, eliminar, reproducir)
 * - Manejar estado vacío con mensaje amigable
 * - Organizar álbumes en grid responsivo
 *
 * CONCEPTOS CLAVE:
 * - Page component: Componente de nivel página
 * - List rendering: Map para renderizar lista
 * - Empty state: UI cuando no hay datos
 * - Event delegation: Handlers intermedios con logging
 * - PropTypes validation: Validación de props
 *
 * ATOMIC DESIGN:
 * Page = Compone múltiples molecules (AlbumCard) en un layout
 *
 * JERARQUÍA:
 * App → Albums (page) → AlbumCard (molecule) → Atoms (buttons)
 *
 * FLUJO DE DATOS:
 * Props down: albums array
 * Events up: onEditAlbum, onPlayAlbum, onDeleteAlbum
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import AlbumCard from "../molecules/AlbumCard"; // Tarjeta de álbum
import "./Pages.css"; // Estilos compartidos de páginas

// ==========================================================================
// COMPONENTE ALBUMS
// ==========================================================================

/**
 * Albums - Página de vista de álbumes
 *
 * @param {Object} props
 * @param {Array} props.albums - REQUERIDO: Array de álbumes a mostrar
 * @param {Function} props.onEditAlbum - Callback al editar álbum
 * @param {Function} props.onPlayAlbum - Callback al reproducir álbum
 * @param {Function} props.onDeleteAlbum - Callback al eliminar álbum
 *
 * CONCEPTO - Page Component:
 * Componente de nivel superior que representa una vista completa.
 *
 * RESPONSABILIDADES:
 * 1. Recibir datos (albums)
 * 2. Manejar estado vacío
 * 3. Renderizar lista de componentes
 * 4. Delegar eventos a componente padre
 *
 * NO maneja:
 * - Estado propio de la lista
 * - Lógica de negocio
 * - Llamadas a API
 * (Todo eso está en App.js)
 *
 * PATRÓN:
 * Presentational component = Solo presenta datos y delega eventos
 */
export default function Albums({
  albums,
  onEditAlbum,
  onPlayAlbum,
  onDeleteAlbum,
}) {
  // ========================================================================
  // HANDLERS - INTERMEDIARIOS
  // ========================================================================

  /**
   * handlePlayAlbum - Intermediario para reproducir álbum
   *
   * @param {Object} album - Álbum a reproducir
   *
   * CONCEPTO - Handler Wrapper:
   * ¿Por qué no pasar onPlayAlbum directamente a AlbumCard?
   *
   * RAZONES:
   * 1. Logging: console.log para debugging
   * 2. Transformación: Podríamos modificar datos antes de enviar
   * 3. Analytics: Podríamos enviar eventos de tracking
   * 4. Validación: Verificar datos antes de propagar
   *
   * PATRÓN:
   * AlbumCard → handlePlayAlbum → console.log → onPlayAlbum → App.js
   *
   * OPTIONAL CHAINING:
   * onPlayAlbum?.(album)
   *
   * Solo llama si la función existe.
   * Props callback son opcionales en PropTypes.
   *
   * CONSOLE.LOG:
   * Útil en desarrollo para ver qué eventos se disparan.
   * En producción, se eliminarían o usarían con NODE_ENV check.
   */
  const handlePlayAlbum = (album) => {
    console.log("Playing album:", album.title);
    onPlayAlbum?.(album);
  };

  /**
   * handleDeleteAlbum - Intermediario para eliminar álbum
   *
   * @param {Object} album - Álbum a eliminar
   *
   * Similar a handlePlayAlbum.
   * En una app real, aquí podrías:
   * - Mostrar confirmación
   * - Validar permisos
   * - Enviar analytics
   */
  const handleDeleteAlbum = (album) => {
    console.log("Deleting album:", album.title);
    onDeleteAlbum?.(album);
  };

  // ========================================================================
  // RENDER - ESTADO VACÍO
  // ========================================================================

  /**
   * EARLY RETURN - Empty State
   *
   * CONDICIÓN:
   * !albums || albums.length === 0
   *
   * Verifica:
   * 1. albums es null/undefined (!albums)
   * 2. O es array vacío (albums.length === 0)
   *
   * CONCEPTO - Empty State UI:
   * Mostrar interfaz amigable cuando no hay datos.
   *
   * ALTERNATIVA MALA:
   * Mostrar nada o "No data" simple.
   *
   * BUENA PRÁCTICA:
   * - Icono visual (📁)
   * - Título claro
   * - Mensaje explicativo
   * - Instrucciones (cómo agregar álbumes)
   *
   * UX:
   * Usuario nuevo ve inmediatamente qué hacer.
   * No se siente "perdido" con pantalla vacía.
   *
   * ESTRUCTURA:
   * Container → Empty state → Content (icon + title + message)
   */
  if (!albums || albums.length === 0) {
    return (
      <div className="albums-container">
        <div className="albums-empty">
          <div className="albums-empty__content">
            {/* Icono visual grande */}
            <span className="albums-empty__icon">📁</span>

            {/* Título del empty state */}
            <h3 className="albums-empty__title">No hay álbumes disponibles</h3>

            {/* Mensaje instructivo */}
            <p className="albums-empty__message">
              Comienza creando tu primer álbum desde el botón "+" en la barra
              superior.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER - LISTA DE ÁLBUMES
  // ========================================================================

  /**
   * ESTRUCTURA:
   * Container → Grid → AlbumCards
   *
   * .albums-container:
   * - Contenedor principal de la página
   * - Padding y márgenes generales
   *
   * .albums-grid:
   * - CSS Grid o Flexbox
   * - Responsivo (1 col mobile, 2-3 cols tablet, 4+ cols desktop)
   * - Gap entre elementos
   *
   * ARRAY.MAP():
   * Transforma cada album en un componente AlbumCard.
   *
   * KEY PROP:
   * key={album.id || index}
   *
   * Preferencia: album.id (único y estable)
   * Fallback: index (si no hay id)
   *
   * IMPORTANCIA DE KEY:
   * React usa key para:
   * 1. Identificar elementos de forma única
   * 2. Optimizar re-renders (solo actualiza cambios)
   * 3. Mantener estado correcto en listas dinámicas
   *
   * KEY INCORRECTA (index) CAUSA PROBLEMAS CUANDO:
   * - Reordenamos la lista
   * - Eliminamos items del medio
   * - Agregamos items al inicio
   *
   * KEY CORRECTA (id único) SIEMPRE FUNCIONA
   *
   * PROPS PASADAS A ALBUMCARD:
   * - album: Datos completos del álbum
   * - onPlay: Handler para reproducir
   * - onDelete: Handler para eliminar
   * - onEdit: Handler para editar (sin wrapper, directo)
   *
   * NOTA: onEdit se pasa directamente sin wrapper
   * porque no necesita logging adicional.
   * Podríamos crear handleEditAlbum si fuera necesario.
   */
  return (
    <div className="albums-container">
      <div className="albums-grid">
        {albums.map((album, index) => (
          <AlbumCard
            key={album.id || index}
            album={album}
            onPlay={handlePlayAlbum}
            onDelete={handleDeleteAlbum}
            onEdit={onEditAlbum}
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
 * PropTypes de Albums
 *
 * PROPS REQUERIDAS:
 * - albums: Array de álbumes (obligatorio)
 *
 * PROPS OPCIONALES:
 * - onEditAlbum: Callback para editar
 * - onPlayAlbum: Callback para reproducir
 * - onDeleteAlbum: Callback para eliminar
 *
 * ALBUMS IS REQUIRED:
 * Aunque verificamos !albums en el código,
 * marcarlo como isRequired genera warning si no se pasa.
 *
 * VENTAJA:
 * Detecta errores en desarrollo antes de que causen problemas.
 *
 * CALLBACKS OPCIONALES:
 * No son isRequired porque:
 * 1. El componente puede usarse solo para mostrar
 * 2. Usamos optional chaining (?.) al llamarlos
 * 3. Mayor flexibilidad
 *
 * PROPTYPES.ARRAY:
 * Genérico, acepta cualquier array.
 *
 * MÁS ESPECÍFICO (opcional):
 * albums: PropTypes.arrayOf(PropTypes.shape({
 *   id: PropTypes.string.isRequired,
 *   title: PropTypes.string.isRequired,
 *   description: PropTypes.string,
 *   images: PropTypes.array,
 * }))
 *
 * TRADEOFF:
 * - Genérico: Más flexible, menos validación
 * - Específico: Más validación, más código
 *
 * Para este proyecto didáctico, PropTypes.array es suficiente.
 */
Albums.propTypes = {
  albums: PropTypes.array.isRequired,  // Array obligatorio
  onEditAlbum: PropTypes.func,         // Callback opcional
  onPlayAlbum: PropTypes.func,         // Callback opcional
  onDeleteAlbum: PropTypes.func,       // Callback opcional
};

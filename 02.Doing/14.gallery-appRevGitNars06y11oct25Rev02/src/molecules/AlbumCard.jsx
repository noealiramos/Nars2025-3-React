/**
 * ============================================================================
 * ALBUMCARD - TARJETA DE VISUALIZACIÓN DE ÁLBUM
 * ============================================================================
 *
 * Componente que muestra la información de un álbum en formato de tarjeta.
 *
 * PROPÓSITO:
 * - Mostrar preview visual del álbum (grid de imágenes)
 * - Presentar información del álbum (título, descripción, conteo)
 * - Proporcionar acciones rápidas (editar, eliminar, reproducir)
 * - Indicar estado activo visualmente
 *
 * CONCEPTOS CLAVE:
 * - Composition: Combina múltiples atoms (buttons, tags)
 * - Conditional rendering: Muestra elementos según datos
 * - Array methods: map, slice, filter para procesar datos
 * - Optional chaining: ?. para acceso seguro a propiedades
 * - Default props: valores por defecto para opcionales
 * - Template literals: construcción dinámica de clases
 *
 * ATOMIC DESIGN:
 * Molecule = Combina atoms (DeleteButton, EditButton, PlayButton, TagButton)
 *
 * ESTRUCTURA VISUAL:
 * ┌─────────────────────────────────┐
 * │  [Img1] [Img2]                  │
 * │  [Img3] [Img4]  (Preview Grid)  │
 * │                                 │
 * │  Título del Álbum               │
 * │  Descripción...                 │
 * │  5 fotos                        │
 * │  [tag1] [tag2]                  │
 * │  [Edit] [Delete] [Play]         │
 * └─────────────────────────────────┘
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import DeleteButton from "../atoms/DeleteButton"; // Botón eliminar
import EditButton from "../atoms/EditButton"; // Botón editar
import PlayButton from "../atoms/PlayButton"; // Botón reproducir
import TagButton from "../atoms/TagButton"; // Etiqueta/tag
import { BUTTON_SIZES } from "../utils/constants"; // Constantes de tamaños
import "./AlbumCard.css"; // Estilos del componente

// ==========================================================================
// COMPONENTE ALBUMCARD
// ==========================================================================

/**
 * AlbumCard - Tarjeta que muestra información de un álbum
 *
 * @param {Object} props
 * @param {Object} props.album - REQUERIDO: Objeto con datos del álbum
 * @param {Function} props.onEdit - Callback al editar
 * @param {Function} props.onDelete - Callback al eliminar
 * @param {Function} props.onPlay - Callback al reproducir
 * @param {boolean} props.isActive - Si la tarjeta está activa/seleccionada
 * @param {string} props.className - Clases CSS adicionales
 *
 * CONCEPTO - Molecule Component:
 * AlbumCard combina múltiples atoms para crear una UI más compleja.
 * No maneja estado propio, solo presenta datos y comunica eventos.
 *
 * CONCEPTO - Default Props:
 * isActive = false, className = ""
 *
 * Si no se pasan estas props, usan valores por defecto.
 * Evita errores cuando la prop es undefined.
 *
 * ESTRUCTURA DE album (esperada):
 * {
 *   id: string|number,
 *   title: string,
 *   description: string,
 *   images: [{ id, url, name, title }, ...],
 *   tags: [string, string, ...]
 * }
 */
const AlbumCard = ({
  album,
  onEdit,
  onDelete,
  onPlay,
  isActive = false, // Default: no activo
  className = "", // Default: sin clases extra
}) => {
  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * CLASE DINÁMICA DEL CONTENEDOR:
   *
   * `album-card ${isActive ? "active" : ""} ${className}`
   *
   * Template literal que combina:
   * 1. "album-card" - Clase base (siempre presente)
   * 2. "active" - Solo si isActive === true
   * 3. className - Clases adicionales pasadas por props
   *
   * EJEMPLOS:
   * - isActive=false, className="" → "album-card"
   * - isActive=true, className="" → "album-card active"
   * - isActive=false, className="featured" → "album-card featured"
   * - isActive=true, className="featured" → "album-card active featured"
   *
   * CONCEPTO - Conditional String in Template Literal:
   * ${condicion ? "valor-si-true" : "valor-si-false"}
   *
   * Si isActive es true → agrega "active"
   * Si isActive es false → agrega string vacío (nada)
   */
  return (
    <div className={`album-card ${isActive ? "active" : ""} ${className}`}>
      <div className="album-card__content">
        {/* ================================================================
            PREVIEW DE IMÁGENES - GRID 2x2
            ================================================================

            LÓGICA:
            1. Si album.images existe y tiene elementos → Mostrar grid
            2. Si album.images está vacío → Mostrar placeholder

            OPTIONAL CHAINING:
            album.images && album.images.length > 0

            Verifica que:
            - album.images exista (no sea null/undefined)
            - Tenga al menos un elemento (length > 0)
         */}
        <div className="album-card__preview">
          {album.images && album.images.length > 0 ? (
            // ============================================================
            // CASO 1: HAY IMÁGENES - MOSTRAR GRID
            // ============================================================
            <div className="album-preview-grid">
              {/*
                ARRAY.SLICE(0, 4):
                Toma solo las primeras 4 imágenes

                EJEMPLO:
                [img1, img2, img3, img4, img5, img6].slice(0, 4)
                → [img1, img2, img3, img4]

                CONCEPTO - Por qué 4?
                Grid 2x2 = 4 celdas máximo

                ARRAY.MAP():
                Transforma cada imagen en un elemento JSX
                Recibe: (elemento, índice) => JSX
              */}
              {album.images.slice(0, 4).map((image, index) => (
                <div key={image.id || index} className="album-preview-cell">
                  {/*
                    KEY PROP:
                    Preferimos image.id (único y estable)
                    Fallback a index si no hay id

                    NOTA: index como key puede causar problemas
                    si el orden de los items cambia. Pero aquí
                    el orden es fijo (slice(0,4)) así que es seguro.
                  */}
                  <img
                    src={image.url}
                    // ALT TEXT: Accesibilidad
                    // Intenta: image.name → image.title → "Foto"
                    alt={image.name || image.title || "Foto"}
                    className="album-preview-image"
                  />

                  {/*
                    INDICADOR "+N" - Solo en última celda si hay más imágenes

                    CONDICIONES:
                    1. index === 3: Estamos en la 4ta imagen (índice 3)
                    2. album.images.length > 4: Hay más de 4 imágenes

                    EJEMPLO:
                    Si hay 10 imágenes total:
                    - Mostramos 4 en el grid
                    - En la 4ta celda agregamos: "+6"
                    - 10 - 4 = 6 imágenes más
                  */}
                  {index === 3 && album.images.length > 4 && (
                    <div className="album-preview-overlay">
                      <span>+{album.images.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}

              {/*
                PLACEHOLDERS PARA COMPLETAR EL GRID

                PROBLEMA: Si solo hay 2 imágenes, el grid se ve incompleto
                SOLUCIÓN: Rellenar con celdas vacías

                LÓGICA:
                Si album.images.length < 4:
                  - Calcular cuántas faltan: 4 - length
                  - Crear array de ese tamaño
                  - Mapear a placeholders

                ARRAY.FROM():
                Crea un array a partir de un objeto iterable

                SINTAXIS:
                Array.from({ length: N }, (_, index) => valor)

                { length: N }: Objeto con propiedad length
                (_, index): Función mapeadora
                  _ : Valor (undefined, no lo usamos)
                  index: Índice actual

                EJEMPLO:
                Si hay 2 imágenes:
                - Faltan: 4 - 2 = 2
                - Array.from({ length: 2 }, ...) crea 2 placeholders
              */}
              {album.images.length < 4 &&
                Array.from({ length: 4 - album.images.length }, (_, index) => (
                  <div
                    // KEY: Usar índice con prefijo para evitar colisión
                    // con keys de imágenes reales
                    key={`placeholder-${index}`}
                    className="album-preview-placeholder"
                  />
                ))}
            </div>
          ) : (
            // ============================================================
            // CASO 2: NO HAY IMÁGENES - MOSTRAR PLACEHOLDER
            // ============================================================
            <div className="album-placeholder">Sin fotos</div>
          )}
        </div>

        {/* ================================================================
            INFORMACIÓN DEL ÁLBUM
            ================================================================ */}
        <div className="album-card__info">
          {/* TÍTULO: Siempre se muestra */}
          <h3 className="album-card__title">{album.title}</h3>

          {/*
            DESCRIPCIÓN: Condicional

            RENDERIZADO CONDICIONAL CON &&:
            {condicion && <Elemento />}

            Solo se renderiza si album.description existe y no es vacío
          */}
          {album.description && (
            <p className="album-card__description">{album.description}</p>
          )}

          {/*
            CONTADOR DE FOTOS

            OPTIONAL CHAINING + NULLISH COALESCING:
            album.images?.length || 0

            ?. : Si album.images es null/undefined, retorna undefined
            || 0: Si el valor es falsy (undefined, 0), usa 0

            PLURALIZACIÓN DINÁMICA:
            album.images?.length !== 1 ? "s" : ""

            Si length es 1 → "foto"
            Si length es cualquier otro → "fotos"

            EJEMPLOS:
            - 0 imágenes → "0 fotos"
            - 1 imagen → "1 foto"
            - 5 imágenes → "5 fotos"
          */}
          <p className="album-card__count">
            {album.images?.length || 0} foto
            {album.images?.length !== 1 ? "s" : ""}
          </p>

          {/*
            TAGS/ETIQUETAS: Condicional

            CONDICIÓN DOBLE:
            album.tags && album.tags.length > 0

            Verifica que:
            1. tags exista (no null/undefined)
            2. Tenga elementos (length > 0)
          */}
          {album.tags && album.tags.length > 0 && (
            <div className="album-card__tags">
              {/*
                MAP PARA RENDERIZAR TAGS:

                NOTA: Usamos index como key porque los tags
                son strings simples sin id único.

                En producción real, podrías tener tags como objetos:
                { id: 1, name: "nature" }
              */}
              {album.tags.map((tag, index) => (
                <TagButton key={index} label={tag} size={BUTTON_SIZES.SMALL} />
              ))}
            </div>
          )}

          {/* ============================================================
              ACCIONES: Editar, Eliminar, Reproducir
              ============================================================

              OPTIONAL CHAINING EN CALLBACKS:
              onEdit?.(album)

              El ?. antes de () verifica que la función existe
              antes de llamarla.

              EQUIVALENTE A:
              onEdit && onEdit(album)

              VENTAJA:
              - Más conciso
              - Estándar moderno de JavaScript

              POR QUÉ ES NECESARIO:
              Las props onEdit, onDelete, onPlay son opcionales.
              Si no se pasan, serían undefined.
              Llamar undefined() causaría un error.

              ARROW FUNCTIONS:
              () => onEdit?.(album)

              Necesarias para pasar argumentos (album) al callback.
              Sin arrow function: onClick={onEdit} → se ejecuta sin args
              Con arrow function: onClick={() => onEdit(album)} → pasa album
           */}
          <div className="album-card__actions">
            <EditButton
              onClick={() => onEdit?.(album)}
              size={BUTTON_SIZES.SMALL}
            />
            <DeleteButton
              onClick={() => onDelete?.(album)}
              size={BUTTON_SIZES.SMALL}
            />
            <PlayButton
              onClick={() => onPlay?.(album)}
              size={BUTTON_SIZES.SMALL}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de AlbumCard
 *
 * PROPS REQUERIDAS:
 * - album: Objeto con datos del álbum (obligatorio)
 *
 * PROPS OPCIONALES:
 * - onEdit: Función callback para editar
 * - onDelete: Función callback para eliminar
 * - onPlay: Función callback para reproducir
 * - isActive: Boolean para estado activo
 * - className: String con clases CSS adicionales
 *
 * NOTA - album: PropTypes.object:
 * Es genérico. En producción, usaríamos PropTypes.shape:
 *
 * album: PropTypes.shape({
 *   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
 *   title: PropTypes.string.isRequired,
 *   description: PropTypes.string,
 *   images: PropTypes.arrayOf(PropTypes.shape({
 *     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
 *     url: PropTypes.string.isRequired,
 *     name: PropTypes.string,
 *     title: PropTypes.string,
 *   })),
 *   tags: PropTypes.arrayOf(PropTypes.string),
 * }).isRequired
 *
 * TRADEOFF:
 * - PropTypes.object: Simple, flexible, menos validación
 * - PropTypes.shape: Específico, más validación, más código
 *
 * Para este proyecto didáctico, mantenemos simplicidad con .object
 */
AlbumCard.propTypes = {
  album: PropTypes.object.isRequired, // Objeto álbum (obligatorio)
  onEdit: PropTypes.func, // Callback opcional
  onDelete: PropTypes.func, // Callback opcional
  onPlay: PropTypes.func, // Callback opcional
  isActive: PropTypes.bool, // Boolean opcional
  className: PropTypes.string, // String opcional
};

export default AlbumCard;

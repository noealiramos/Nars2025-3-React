/**
 * ============================================================================
 * PHOTOCARD - TARJETA DE VISUALIZACIÓN DE FOTO
 * ============================================================================
 *
 * Componente que muestra información de una foto en formato de tarjeta.
 *
 * PROPÓSITO:
 * - Mostrar imagen con su información (título, descripción, ubicación)
 * - Proporcionar acciones rápidas (editar, eliminar, ver detalles)
 * - Manejar caso de foto sin datos (early return)
 * - Mostrar tags/etiquetas asociadas
 *
 * CONCEPTOS CLAVE:
 * - Early return: Retorno temprano para casos especiales
 * - Conditional rendering: Elementos según datos disponibles
 * - Optional chaining: Acceso seguro a propiedades
 * - Composition: Usa atoms (buttons, tags)
 * - PropTypes.shape: Validación detallada de objetos
 *
 * ATOMIC DESIGN:
 * Molecule = Combina atoms (DeleteButton, EditButton, PlayButton, TagButton)
 *
 * ESTRUCTURA VISUAL:
 * ┌─────────────────────────────────┐
 * │                                 │
 * │     [Imagen de la foto]         │
 * │                                 │
 * ├─────────────────────────────────┤
 * │  Título de la foto              │
 * │  Descripción...                 │
 * │  📍 Ubicación                   │
 * │  [tag1] [tag2]                  │
 * │  [Edit] [Delete] [View]         │
 * └─────────────────────────────────┘
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import DeleteButton from "../atoms/DeleteButton"; // Botón eliminar
import EditButton from "../atoms/EditButton"; // Botón editar
import PlayButton from "../atoms/PlayButton"; // Botón ver/reproducir
import TagButton from "../atoms/TagButton"; // Etiqueta/tag
import { BUTTON_SIZES } from "../utils/constants"; // Constantes de tamaños
import "./PhotoCard.css"; // Estilos del componente

// ==========================================================================
// COMPONENTE PHOTOCARD
// ==========================================================================

/**
 * PhotoCard - Tarjeta que muestra información de una foto
 *
 * @param {Object} props
 * @param {Object} props.photo - Objeto con datos de la foto
 * @param {Function} props.onDelete - Callback al eliminar
 * @param {Function} props.onEdit - Callback al editar
 * @param {Function} props.onClick - Callback al hacer click (ver detalles)
 *
 * CONCEPTO - Early Return Pattern:
 *
 * En lugar de envolver todo en if/else:
 * if (photo) { return <JSX complejo> }
 * else { return <JSX simple> }
 *
 * Usamos early return:
 * if (!photo) return <JSX simple>
 * return <JSX complejo>
 *
 * VENTAJAS:
 * 1. Reduce anidación (menos indentación)
 * 2. Casos especiales primero (más legible)
 * 3. Código principal al final (flujo natural)
 *
 * ESTRUCTURA DE photo (esperada):
 * {
 *   id: string|number,
 *   url: string,
 *   title: string,
 *   name: string,
 *   description: string,
 *   location: string,
 *   tags: [string, string, ...]
 * }
 */
export default function PhotoCard({ photo, onDelete, onEdit, onClick }) {
  // ========================================================================
  // EARLY RETURN - CASO SIN FOTO
  // ========================================================================

  /**
   * GUARD CLAUSE: Protección contra datos faltantes
   *
   * Si photo es null, undefined, o falsy → Renderizar placeholder
   *
   * CONCEPTO - Defensive Programming:
   * Anticipar casos inesperados y manejarlos gracefully.
   *
   * SIN EARLY RETURN (más complejo):
   * return (
   *   {photo ? (
   *     <div>todo el JSX...</div>
   *   ) : (
   *     <div>placeholder</div>
   *   )}
   * )
   *
   * CON EARLY RETURN (más limpio):
   * if (!photo) return <div>placeholder</div>
   * return <div>todo el JSX...</div>
   *
   * PLACEHOLDER UI:
   * Muestra una tarjeta vacía con texto por defecto.
   * Evita que la UI se rompa si falta la data.
   */
  if (!photo) {
    return (
      <div className="photo-card">
        <div className="photo-card__image empty">
          <div className="photo-placeholder">No Image</div>
        </div>
        <div className="photo-card__title">Untitled Photo</div>
      </div>
    );
  }

  // ========================================================================
  // RENDER PRINCIPAL - CON FOTO
  // ========================================================================

  /**
   * Si llegamos aquí, photo existe y tiene datos.
   * Podemos acceder a sus propiedades con confianza.
   */
  return (
    <div className="photo-card">
      {/* ================================================================
          IMAGEN PRINCIPAL
          ================================================================

          ALT TEXT:
          photo.title || photo.name

          Intenta usar title primero, luego name como fallback.
          Importante para accesibilidad (screen readers).
       */}
      <div className="photo-card__image">
        <img src={photo.url} alt={photo.title || photo.name} />
      </div>

      {/* ================================================================
          INFORMACIÓN Y ACCIONES
          ================================================================ */}
      <div className="photo-card__info">
        {/* ==============================================================
            CONTENIDO DE INFORMACIÓN
            ==============================================================

            Agrupa título, descripción, ubicación y tags.
            Separado de las acciones para mejor organización visual.
         */}
        <div className="photo-card__info-content">
          {/* TÍTULO: Muestra title o name como fallback */}
          <h3 className="photo-card__title">{photo.title || photo.name}</h3>

          {/*
            DESCRIPCIÓN: Condicional

            RENDERIZADO CONDICIONAL:
            {photo.description && <elemento />}

            Solo renderiza si photo.description:
            - Existe (no null/undefined)
            - No es string vacío
            - No es 0 o false
          */}
          {photo.description && (
            <p className="photo-card__description">{photo.description}</p>
          )}

          {/*
            UBICACIÓN: Condicional con icono

            CONCEPTO - Semantic Elements:
            Usamos <span> para el icono porque es puramente decorativo.
            El texto de ubicación está en el mismo <p> para contexto.

            EMOJI COMO ICONO:
            📍 es un emoji de ubicación.
            Alternativas: Font Awesome, SVG, Material Icons
          */}
          {photo.location && (
            <p className="photo-card__location">
              <span className="location-icon">📍</span>
              {photo.location}
            </p>
          )}

          {/*
            TAGS/ETIQUETAS: Condicional con doble verificación

            CONDICIÓN DOBLE:
            photo.tags && photo.tags.length > 0

            Verifica:
            1. tags existe (no es null/undefined)
            2. Tiene elementos (array no vacío)

            POR QUÉ AMBAS:
            - photo.tags && ... → Evita error si tags es undefined
            - ... && photo.tags.length > 0 → Evita renderizar div vacío

            MAP CON INDEX COMO KEY:
            Los tags son strings simples, no tienen id único.
            Usamos index como key.

            NOTA: En producción, si el orden puede cambiar,
            considera usar un identificador único o el tag mismo
            si son únicos: key={tag}
          */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="photo-card__tags">
              {photo.tags.map((tag, index) => (
                <TagButton key={index} label={tag} size={BUTTON_SIZES.SMALL} />
              ))}
            </div>
          )}
        </div>

        {/* ==============================================================
            ACCIONES: Editar, Eliminar, Ver
            ==============================================================

            OPTIONAL CHAINING EN CALLBACKS:
            onEdit?.(photo)

            El operador ?. verifica que la función existe antes de llamarla.

            EQUIVALENTE A:
            if (onEdit) {
              onEdit(photo);
            }

            POR QUÉ ES NECESARIO:
            - Las props son opcionales (no isRequired en PropTypes)
            - Si no se pasan, son undefined
            - Llamar undefined() causa error
            - Con ?. simplemente no hace nada si es undefined

            ARROW FUNCTIONS:
            () => onEdit?.(photo)

            Necesarias para pasar el argumento photo.

            DIFERENCIA:
            - onClick={onEdit}: Llama onEdit() sin argumentos
            - onClick={() => onEdit(photo)}: Llama onEdit(photo)

            PATRÓN:
            Componente hijo → llama callback → pasa datos relevantes
            → Componente padre recibe datos → actualiza estado
         */}
        <div className="photo-card__actions">
          <EditButton
            onClick={() => onEdit?.(photo)}
            size={BUTTON_SIZES.SMALL}
          />
          <DeleteButton
            onClick={() => onDelete?.(photo)}
            size={BUTTON_SIZES.SMALL}
          />
          <PlayButton
            onClick={() => onClick?.(photo)}
            size={BUTTON_SIZES.SMALL}
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de PhotoCard
 *
 * PROPS OPCIONALES (todas):
 * - photo: Objeto con estructura específica
 * - onDelete: Función callback
 * - onEdit: Función callback
 * - onClick: Función callback
 *
 * CONCEPTO - PropTypes.shape:
 * Permite definir la estructura exacta de un objeto.
 *
 * VENTAJAS vs PropTypes.object:
 * - Validación detallada de cada propiedad
 * - Documentación clara de la estructura esperada
 * - Warnings específicos si falta algo o tipo incorrecto
 * - Autocompletado mejor en IDEs
 *
 * SINTAXIS:
 * PropTypes.shape({
 *   propiedad1: PropTypes.tipo,
 *   propiedad2: PropTypes.tipo.isRequired,
 *   ...
 * })
 *
 * ONEOFTYPE:
 * PropTypes.oneOfType([tipo1, tipo2])
 *
 * Acepta múltiples tipos posibles.
 * Útil cuando id puede ser string ("abc") o number (123).
 *
 * ARRAYOF:
 * PropTypes.arrayOf(PropTypes.string)
 *
 * Array donde cada elemento debe ser del tipo especificado.
 *
 * EJEMPLO DE VALIDACIÓN:
 * Si pasamos:
 * photo={{ id: 123, title: "Sunset", tags: [1, 2, 3] }}
 *
 * PropTypes detectará:
 * ✅ id: 123 (number) → OK (oneOfType permite number)
 * ✅ title: "Sunset" (string) → OK
 * ⚠️ tags: [1,2,3] → WARNING (esperaba arrayOf(string), recibió numbers)
 *
 * NOTA DIDÁCTICA:
 * Todas las props son opcionales (sin .isRequired) porque:
 * - photo puede no existir (caso early return)
 * - Callbacks pueden no pasarse (componente solo visual)
 *
 * En producción, podrías hacer algunas isRequired según necesidad.
 */
PhotoCard.propTypes = {
  // Objeto photo con estructura detallada
  photo: PropTypes.shape({
    // id puede ser string o number
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    // Strings simples
    name: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,

    // Array de strings
    tags: PropTypes.arrayOf(PropTypes.string),
  }),

  // Funciones callback (opcionales)
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onClick: PropTypes.func,
};

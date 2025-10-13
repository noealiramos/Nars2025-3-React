/**
 * ============================================================================
 * CONSTANTS - CONSTANTES DE LA APLICACIÓN
 * ============================================================================
 *
 * Archivo centralizado de constantes usadas en toda la aplicación.
 *
 * PROPÓSITO:
 * - Evitar "magic strings" (strings hardcodeados)
 * - Centralizar valores reutilizables
 * - Facilitar mantenimiento (cambiar en un solo lugar)
 * - Prevenir typos (autocompletado del IDE)
 * - Documentar valores posibles
 *
 * VENTAJAS DE USAR CONSTANTES:
 *
 * ❌ SIN CONSTANTES (BAD):
 * if (view === "albums") { ... }
 * if (view === "albuns") { ... }  // Typo! Bug difícil de encontrar
 *
 * ✅ CON CONSTANTES (GOOD):
 * if (view === VIEWS.ALBUMS) { ... }
 * if (view === VIEWS.ALBUNS) { ... }  // Error de compilación inmediato
 *
 * PATRÓN:
 * - Exportar objetos frozen (no modificables)
 * - Nombres en MAYÚSCULAS (convención)
 * - Agrupar por categoría
 * - Valores descriptivos
 *
 * USO EN COMPONENTES:
 * import { VIEWS, BUTTON_SIZES } from '../utils/constants';
 */

// ==========================================================================
// VISTAS DE LA APLICACIÓN
// ==========================================================================

/**
 * VIEWS - Identificadores de vistas/pantallas
 *
 * CONCEPTO - Single Source of Truth:
 * En lugar de escribir "albums" como string en múltiples lugares,
 * usamos VIEWS.ALBUMS. Si necesitamos cambiar el valor, lo cambiamos
 * aquí y se actualiza en toda la app.
 *
 * USO EN APP.JS:
 * const [currentView, setCurrentView] = useState(VIEWS.ALBUMS);
 *
 * switch (currentView) {
 *   case VIEWS.ALBUMS:
 *     return <Albums ... />;
 *   case VIEWS.PHOTOS:
 *     return <Photos ... />;
 *   ...
 * }
 *
 * VENTAJAS:
 * - Autocompletado del IDE (VIEWS. + sugerencias)
 * - Refactoring seguro (renombrar afecta todos los usos)
 * - Documentación implícita (se ve qué vistas existen)
 * - Previene typos
 *
 * VALORES:
 * Strings en camelCase descriptivos.
 *
 * LISTA COMPLETA:
 * - ALBUMS: Vista lista de álbumes
 * - PHOTOS: Vista lista de fotos
 * - NEW_ALBUM: Modal crear álbum
 * - NEW_PHOTO: Modal crear foto
 * - EDIT_ALBUM: Modal editar álbum
 * - EDIT_PHOTO: Modal editar foto
 * - ALBUM_CAROUSEL: Modal carrusel de álbum
 * - PHOTO_VIEWER: Modal visor de foto
 *
 * PATRÓN DE NAMING:
 * - Vistas principales: ALBUMS, PHOTOS (plural)
 * - Modales de creación: NEW_* (prefijo NEW)
 * - Modales de edición: EDIT_* (prefijo EDIT)
 * - Modales de visualización: *_VIEWER, *_CAROUSEL (sufijo descriptivo)
 *
 * ALTERNATIVA CON ENUM (TYPESCRIPT):
 * enum Views {
 *   ALBUMS = 'albums',
 *   PHOTOS = 'photos',
 *   ...
 * }
 */
export const VIEWS = {
  ALBUMS: "albums", // Vista principal de álbumes
  PHOTOS: "photos", // Vista principal de fotos
  NEW_ALBUM: "newAlbum", // Modal crear nuevo álbum
  NEW_PHOTO: "newPhoto", // Modal crear nueva foto
  EDIT_ALBUM: "editAlbum", // Modal editar álbum existente
  EDIT_PHOTO: "editPhoto", // Modal editar foto existente
  ALBUM_CAROUSEL: "albumCarousel", // Modal carrusel de fotos del álbum
  PHOTO_VIEWER: "photoViewer", // Modal visor de foto individual
};

// ==========================================================================
// CONFIGURACIÓN DE ALMACENAMIENTO LOCAL
// ==========================================================================

/**
 * STORAGE_KEYS - Claves para localStorage
 *
 * CONCEPTO - LocalStorage Keys:
 * localStorage es un key-value store del navegador.
 * Necesitamos claves únicas para guardar/recuperar datos.
 *
 * PATRÓN:
 * Prefijo "gallery-" para evitar colisiones con otras apps.
 *
 * USO EN LOCALSTORAGE.JS:
 * export const saveAlbums = (albums) => {
 *   localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(albums));
 * };
 *
 * export const loadAlbums = () => {
 *   const data = localStorage.getItem(STORAGE_KEYS.ALBUMS);
 *   return data ? JSON.parse(data) : [];
 * };
 *
 * VENTAJAS:
 * - Centralización (cambiar key en un solo lugar)
 * - Previene typos
 * - Namespace claro (gallery-*)
 * - Fácil debugging (sabes qué keys buscar en DevTools)
 *
 * VALORES:
 * - ALBUMS: "gallery-albums" → Guarda array de álbumes
 * - PHOTOS: "gallery-photos" → Guarda array de fotos
 *
 * INSPECCIONAR EN DEVTOOLS:
 * 1. Abrir Chrome DevTools (F12)
 * 2. Application tab
 * 3. Storage → Local Storage
 * 4. Buscar "gallery-albums" y "gallery-photos"
 *
 * LIMPIAR STORAGE:
 * localStorage.removeItem(STORAGE_KEYS.ALBUMS);
 * localStorage.removeItem(STORAGE_KEYS.PHOTOS);
 * // O
 * localStorage.clear(); // Borra TODO
 *
 * ALTERNATIVA:
 * Podría ser un solo key con objeto anidado:
 * STORAGE_KEY: "gallery-app-data"
 * → { albums: [...], photos: [...] }
 *
 * DECISIÓN ACTUAL:
 * Keys separadas por tipo de dato.
 * Más flexible, puedes guardar/cargar independientemente.
 */
export const STORAGE_KEYS = {
  ALBUMS: "gallery-albums", // Key para array de álbumes
  PHOTOS: "gallery-photos", // Key para array de fotos
};

// ==========================================================================
// TAMAÑOS DE BOTONES
// ==========================================================================

/**
 * BUTTON_SIZES - Tamaños predefinidos para componente Button
 *
 * CONCEPTO - Design System:
 * En lugar de permitir cualquier tamaño, definimos opciones fijas.
 * Consistencia visual en toda la app.
 *
 * USO EN BUTTON.JSX:
 * const Button = ({ size = BUTTON_SIZES.MEDIUM, ... }) => {
 *   const sizeClass = {
 *     [BUTTON_SIZES.SMALL]: 'button--sm',
 *     [BUTTON_SIZES.MEDIUM]: 'button--md',
 *     [BUTTON_SIZES.LARGE]: 'button--lg',
 *   }[size];
 *
 *   return <button className={`button ${sizeClass}`}>...</button>;
 * };
 *
 * USO EN COMPONENTES:
 * <Button size={BUTTON_SIZES.SMALL}>Cancel</Button>
 * <Button size={BUTTON_SIZES.LARGE}>Create Album</Button>
 *
 * VENTAJAS:
 * - Opciones limitadas (no "medium" vs "md" vs "m")
 * - Consistencia visual
 * - Fácil cambiar globalmente
 * - TypeScript puede validar (union type)
 *
 * VALORES:
 * - SMALL: "sm" → Botones pequeños (iconos, tags)
 * - MEDIUM: "md" → Botones normales (default)
 * - LARGE: "lg" → Botones destacados (CTAs, navegación)
 *
 * CSS TÍPICO:
 * .button--sm { padding: 0.25rem 0.5rem; font-size: 0.875rem; }
 * .button--md { padding: 0.5rem 1rem; font-size: 1rem; }
 * .button--lg { padding: 0.75rem 1.5rem; font-size: 1.125rem; }
 *
 * PODRÍA EXTENDERSE:
 * BUTTON_SIZES = {
 *   TINY: 'xs',
 *   SMALL: 'sm',
 *   MEDIUM: 'md',
 *   LARGE: 'lg',
 *   XLARGE: 'xl',
 * }
 *
 * DECISIÓN ACTUAL:
 * 3 tamaños suficientes para esta app.
 * Mantener simple.
 */
export const BUTTON_SIZES = {
  SMALL: "sm", // Botón pequeño
  MEDIUM: "md", // Botón mediano (default)
  LARGE: "lg", // Botón grande
};

// ==========================================================================
// TAGS PREDEFINIDOS
// ==========================================================================

/**
 * COMMON_TAGS - Tags comunes organizados por categoría
 *
 * CONCEPTO - Tag Suggestions:
 * En lugar de que usuario escriba tags desde cero,
 * ofrecemos sugerencias comunes organizadas.
 *
 * USO EN ALBUMFORM.JSX / PHOTOFORM.JSX:
 * const [availableTags] = useState([
 *   ...COMMON_TAGS.NATURE,
 *   ...COMMON_TAGS.URBAN,
 *   ...COMMON_TAGS.LIFESTYLE,
 *   ...COMMON_TAGS.TRAVEL,
 * ]);
 *
 * // Mostrar como botones clicables
 * {availableTags.map(tag => (
 *   <TagButton
 *     key={tag}
 *     onClick={() => addTag(tag)}
 *   >
 *     {tag}
 *   </TagButton>
 * ))}
 *
 * ESTRUCTURA:
 * Objeto con categorías como keys.
 * Cada categoría tiene array de tags.
 *
 * CATEGORÍAS:
 * - NATURE: Tags de naturaleza (nature, landscape, forest, mountains)
 * - URBAN: Tags urbanos (urban, city, street, architecture)
 * - LIFESTYLE: Tags de estilo de vida (lifestyle, home, work, coffee)
 * - TRAVEL: Tags de viaje (travel, road, adventure, journey)
 *
 * VENTAJAS:
 * - UX mejorada (no escribir desde cero)
 * - Consistencia (mismos tags en toda la app)
 * - Fácil extender (agregar más categorías/tags)
 * - I18n potencial (traducir tags)
 *
 * USO AVANZADO:
 * Podrías mostrar categorías expandibles:
 *
 * <div>
 *   <h4>Nature</h4>
 *   {COMMON_TAGS.NATURE.map(tag => <TagButton ... />)}
 *
 *   <h4>Urban</h4>
 *   {COMMON_TAGS.URBAN.map(tag => <TagButton ... />)}
 * </div>
 *
 * EXTENSIÓN POSIBLE:
 * COMMON_TAGS = {
 *   NATURE: {
 *     label: 'Naturaleza',
 *     icon: '🌲',
 *     tags: ['nature', 'landscape', ...],
 *   },
 *   URBAN: {
 *     label: 'Urbano',
 *     icon: '🏙️',
 *     tags: ['urban', 'city', ...],
 *   },
 *   ...
 * }
 *
 * DECISIÓN ACTUAL:
 * Simple array de strings.
 * Suficiente para funcionalidad básica.
 *
 * NOTA:
 * Usuario puede seguir escribiendo tags personalizados.
 * Esto solo son sugerencias.
 */
export const COMMON_TAGS = {
  NATURE: ["nature", "landscape", "forest", "mountains"],
  URBAN: ["urban", "city", "street", "architecture"],
  LIFESTYLE: ["lifestyle", "home", "work", "coffee"],
  TRAVEL: ["travel", "road", "adventure", "journey"],
};

// ==========================================================================
// NOTAS ADICIONALES
// ==========================================================================

/**
 * PATRÓN - Named Exports:
 * export const VIEWS = { ... }
 *
 * VENTAJA:
 * Importar selectivamente:
 * import { VIEWS, BUTTON_SIZES } from './constants';
 *
 * ALTERNATIVA - Default Export:
 * const constants = { VIEWS, STORAGE_KEYS, ... };
 * export default constants;
 *
 * USO:
 * import constants from './constants';
 * constants.VIEWS.ALBUMS
 *
 * DECISIÓN ACTUAL:
 * Named exports → Más claro qué importas.
 *
 * ============================================================================
 *
 * BUENAS PRÁCTICAS:
 *
 * ✅ DO:
 * - Usar constantes para valores repetidos
 * - Agrupar por categoría lógica
 * - Nombres descriptivos
 * - Documentar valores posibles
 *
 * ❌ DON'T:
 * - Poner lógica compleja en constants
 * - Mezclar constantes con funciones
 * - Crear constantes para valores usados una sola vez
 * - Usar valores mágicos no descriptivos
 */

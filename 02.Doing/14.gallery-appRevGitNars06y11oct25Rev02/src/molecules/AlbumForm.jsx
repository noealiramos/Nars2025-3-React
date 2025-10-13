/**
 * ============================================================================
 * ALBUMFORM - FORMULARIO DE ÁLBUM (CREAR/EDITAR)
 * ============================================================================
 *
 * Componente de formulario controlado para crear o editar álbumes.
 *
 * PROPÓSITO:
 * - Capturar datos de un álbum (título, descripción, imágenes, tags)
 * - Gestionar lista dinámica de imágenes (agregar/eliminar)
 * - Validar campos obligatorios y formato URL
 * - Manejar estados de creación y edición
 * - Mostrar errores de validación
 *
 * CONCEPTOS CLAVE:
 * - Controlled components: Form controlado por state
 * - Multiple state pieces: Varios useState para diferentes datos
 * - Dynamic list management: Agregar/eliminar items de array
 * - Form validation: Validación compleja con múltiples reglas
 * - Computed values: Textos dinámicos según modo
 * - Immutable updates: Modificar arrays sin mutar
 * - Array methods: filter, map, spread operator
 *
 * COMPLEJIDAD vs PhotoForm:
 * - Gestión de lista dinámica (imágenes)
 * - Validación de URLs en lista
 * - Múltiples estados (formData + newImage + errors)
 * - Más campos y lógica
 *
 * FLUJO IMÁGENES:
 * 1. Usuario ingresa URL y nombre → newImage state
 * 2. Click "+" → Valida y agrega a formData.images
 * 3. Click "×" → Remueve de formData.images
 * 4. Submit → Valida que haya al menos una imagen
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { useState } from "react"; // Hook para estado
import Button from "../atoms/Button"; // Botón reutilizable
import { BUTTON_SIZES } from "../utils/constants"; // Constantes
import "./AlbumForm.css"; // Estilos

// ==========================================================================
// COMPONENTE ALBUMFORM
// ==========================================================================

/**
 * AlbumForm - Formulario para crear/editar álbumes
 *
 * @param {Object} props
 * @param {string} props.action - Modo: "create" o "edit" (default: "create")
 * @param {Object} props.album - Datos de álbum existente (al editar)
 * @param {Function} props.onSaveAlbum - Callback al guardar
 * @param {Function} props.onCancel - Callback al cancelar
 *
 * CONCEPTO - Complex Form:
 * Este formulario es más complejo que PhotoForm porque:
 * 1. Gestiona un array dinámico (images)
 * 2. Tiene sub-formulario para agregar imágenes
 * 3. Requiere validación de lista
 *
 * ARQUITECTURA DE ESTADO:
 * - formData: Datos principales del álbum
 * - newImage: Datos temporales para agregar imagen
 * - errors: Errores de validación
 */
export default function AlbumForm({
  action = "create", // Default: modo crear
  album,
  onSaveAlbum,
  onCancel,
}) {
  // ========================================================================
  // VALORES CALCULADOS
  // ========================================================================

  /**
   * COMPUTED VALUES: Valores derivados de props
   *
   * Mismo patrón que PhotoForm.
   * Determina textos según si estamos creando o editando.
   */
  const isEditing = action === "edit";
  const title = isEditing ? "Editar álbum" : "Agregar nuevo álbum";
  const submitText = isEditing ? "Guardar cambios" : "Guardar álbum";

  // ========================================================================
  // ESTADO DEL COMPONENTE
  // ========================================================================

  /**
   * ESTADO 1: formData - Datos principales del álbum
   *
   * CONCEPTO - Lazy Initialization con Function:
   * useState(() => { return objeto })
   *
   * La función se ejecuta solo una vez, en el primer render.
   * Útil cuando el cálculo inicial es costoso o complejo.
   *
   * NULLISH COALESCING (??):
   * album?.title ?? ""
   *
   * Secuencia:
   * 1. album?.title: Si album es null/undefined → undefined
   * 2. ?? "": Si el resultado es null/undefined → usa ""
   *
   * DIFERENCIA con || :
   * || considera falsy (0, "", false, null, undefined)
   * ?? solo considera nullish (null, undefined)
   *
   * EJEMPLO:
   * album.tags = [] (array vacío)
   * album.tags || ["default"] → ["default"] (porque [] es falsy)
   * album.tags ?? ["default"] → [] (porque [] no es nullish)
   *
   * ESTRUCTURA DE formData:
   * {
   *   title: string,
   *   description: string,
   *   images: [{ url, name }, ...],
   *   tags: [string, string, ...]
   * }
   */
  const [formData, setFormData] = useState(() => ({
    title: album?.title ?? "",
    description: album?.description ?? "",
    images: album?.images ?? [],
    tags: album?.tags ?? [],
  }));

  /**
   * ESTADO 2: newImage - Datos temporales para agregar imagen
   *
   * CONCEPTO - Temporary State:
   * Estado auxiliar que no forma parte del formulario principal.
   * Se usa para capturar datos antes de agregarlos a la lista.
   *
   * PATRÓN:
   * 1. Usuario escribe en inputs → actualiza newImage
   * 2. Usuario hace click "+" → newImage se agrega a formData.images
   * 3. newImage se resetea a valores vacíos
   *
   * ESTRUCTURA:
   * { url: string, name: string }
   */
  const [newImage, setNewImage] = useState({
    url: "",
    name: "",
  });

  /**
   * ESTADO 3: errors - Errores de validación
   *
   * Objeto que mapea campos a mensajes de error.
   *
   * EJEMPLO:
   * {
   *   title: "El título es requerido",
   *   images: "Debe agregar al menos una imagen"
   * }
   */
  const [errors, setErrors] = useState({});

  // ========================================================================
  // HANDLERS - INPUTS PRINCIPALES
  // ========================================================================

  /**
   * handleInputChange - Maneja cambios en inputs principales del álbum
   *
   * @param {Event} e - Evento del input
   *
   * CONCEPTO - Generic Input Handler:
   * Un solo handler para múltiples inputs.
   * Usa el atributo "name" del input para identificar qué campo cambió.
   *
   * DESTRUCTURING:
   * const { name, value } = e.target
   *
   * Extrae name y value del elemento input.
   *
   * COMPUTED PROPERTY NAME:
   * { [name]: value }
   *
   * Usa variable como clave de objeto.
   * Si name="title", crea { title: value }
   *
   * FUNCTIONAL UPDATE:
   * setFormData((prev) => ({ ...prev, [name]: value }))
   *
   * prev: Estado anterior
   * ...prev: Copia todas las propiedades (spread)
   * [name]: value: Sobrescribe la propiedad específica
   *
   * INMUTABILIDAD:
   * No modificamos prev directamente.
   * Creamos nuevo objeto con cambios.
   *
   * React compara referencias:
   * - Mismo objeto → No re-render
   * - Nuevo objeto → Re-render
   *
   * EJEMPLO COMPLETO:
   * Estado prev: { title: "Album 1", description: "Desc", ... }
   * Cambio en description → "New Desc"
   * Nuevo estado: { title: "Album 1", description: "New Desc", ... }
   *
   * LIMPIAR ERROR:
   * Cuando el usuario escribe, limpiamos el error de ese campo.
   * Mejora UX (error desaparece al corregir).
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ========================================================================
  // HANDLERS - GESTIÓN DE IMÁGENES
  // ========================================================================

  /**
   * handleNewImageChange - Maneja cambios en inputs de nueva imagen
   *
   * @param {Event} e - Evento del input
   *
   * CONCEPTO - Separate State Management:
   * newImage es un estado separado de formData.
   *
   * POR QUÉ:
   * - formData.images: Lista de imágenes confirmadas
   * - newImage: Imagen en proceso de agregar
   *
   * VENTAJAS:
   * 1. Separa datos temporales de datos finales
   * 2. Fácil resetear newImage después de agregar
   * 3. Validación independiente
   *
   * FUNCIONAMIENTO:
   * Similar a handleInputChange, pero actualiza newImage en lugar de formData.
   */
  const handleNewImageChange = (e) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * handleAddImage - Agrega nueva imagen a la lista
   *
   * CONCEPTO - Dynamic Array Management:
   * Agregar elementos a un array en React de forma inmutable.
   *
   * VALIDACIÓN PREVIA:
   * if (newImage.url.trim() && newImage.name.trim())
   *
   * Verifica que ambos campos tengan contenido (no solo espacios).
   *
   * STRING.TRIM():
   * "  hello  ".trim() → "hello"
   * "    ".trim() → "" (vacío)
   *
   * URL VALIDATION:
   * try {
   *   new URL(string);
   * } catch {
   *   // No es URL válida
   * }
   *
   * Constructor URL() lanza error si el formato es inválido.
   *
   * AGREGAR A ARRAY INMUTABLEMENTE:
   * images: [...prev.images, newImage]
   *
   * ...prev.images: Spread (copia todos los elementos existentes)
   * , newImage: Agrega nuevo elemento al final
   *
   * EQUIVALENTE MUTABLE (MAL):
   * prev.images.push(newImage)  // ¡Modifica el array original!
   *
   * OBJECT SPREAD EN NEW IMAGE:
   * { ...newImage }
   *
   * Crea copia del objeto newImage.
   * Asegura que modificar newImage después no afecte el agregado.
   *
   * RESETEAR newImage:
   * setNewImage({ url: "", name: "" })
   *
   * Limpia los inputs para agregar otra imagen.
   *
   * ALERT:
   * En producción, usarías un sistema más robusto para errores.
   * Alert es simple y didáctico.
   */
  const handleAddImage = () => {
    if (newImage.url.trim() && newImage.name.trim()) {
      // Validar URL básica
      try {
        new URL(newImage.url);

        // Agregar imagen a la lista (inmutablemente)
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, { ...newImage }],
        }));

        // Resetear inputs de nueva imagen
        setNewImage({ url: "", name: "" });
      } catch {
        alert("Por favor, ingresa una URL válida");
      }
    }
  };

  /**
   * handleRemoveImage - Elimina imagen de la lista
   *
   * @param {number} index - Índice de la imagen a eliminar
   *
   * CONCEPTO - Removing from Array Immutably:
   * Eliminar elementos de un array sin mutarlo.
   *
   * ARRAY.FILTER():
   * Crea nuevo array con elementos que pasan la condición.
   *
   * SINTAXIS:
   * array.filter((elemento, índice) => condición)
   *
   * CONDICIÓN:
   * (_, i) => i !== index
   *
   * _ : Elemento (no lo usamos, por eso _)
   * i : Índice del elemento actual
   * i !== index : Mantener si NO es el índice a eliminar
   *
   * EJEMPLO:
   * images = [img0, img1, img2, img3]
   * Eliminar índice 1:
   * images.filter((_, i) => i !== 1)
   * → [img0, img2, img3]
   *
   * PASO A PASO:
   * i=0: 0 !== 1 → true → img0 pasa
   * i=1: 1 !== 1 → false → img1 NO pasa (eliminado)
   * i=2: 2 !== 1 → true → img2 pasa
   * i=3: 3 !== 1 → true → img3 pasa
   *
   * INMUTABILIDAD:
   * filter() crea nuevo array, no modifica el original.
   *
   * ALTERNATIVA MUTABLE (MAL):
   * prev.images.splice(index, 1)  // ¡Modifica el array original!
   */
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ========================================================================
  // VALIDACIÓN
  // ========================================================================

  /**
   * validateForm - Valida todos los campos del formulario
   *
   * @returns {boolean} - true si válido, false si hay errores
   *
   * CONCEPTO - Comprehensive Validation:
   * Valida múltiples campos con diferentes reglas.
   *
   * PATRÓN:
   * 1. Crear objeto vacío para errores
   * 2. Validar cada campo
   * 3. Si falla, agregar mensaje de error
   * 4. Guardar errores en state
   * 5. Retornar si es válido
   *
   * VALIDACIONES:
   *
   * 1. TÍTULO (requerido):
   *    !formData.title.trim()
   *    Si vacío o solo espacios → error
   *
   * 2. DESCRIPCIÓN (requerida):
   *    !formData.description.trim()
   *    Si vacía o solo espacios → error
   *
   * 3. IMÁGENES (al menos una):
   *    formData.images.length === 0
   *    Si array vacío → error
   *
   * OBJECT.KEYS().LENGTH:
   * Object.keys(newErrors)
   *
   * Obtiene array de las claves del objeto.
   *
   * EJEMPLO:
   * newErrors = { title: "...", images: "..." }
   * Object.keys(newErrors) → ["title", "images"]
   * .length → 2
   *
   * Si length === 0 → No hay errores → Válido
   * Si length > 0 → Hay errores → Inválido
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (formData.images.length === 0) {
      newErrors.images = "Debe agregar al menos una imagen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * handleSubmit - Maneja envío del formulario
   *
   * @param {Event} e - Evento del form
   *
   * CONCEPTO - Form Submit:
   *
   * e.preventDefault():
   * Previene comportamiento por defecto del form (recargar página).
   *
   * FLUJO:
   * 1. Prevenir recarga
   * 2. Validar formulario
   * 3. Si válido → llamar callback con datos
   * 4. Si inválido → errores se muestran en UI
   *
   * OPTIONAL CHAINING:
   * onSaveAlbum?.(formData)
   *
   * Solo llama si onSaveAlbum existe.
   * Evita error si la prop no se pasó.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSaveAlbum?.(formData);
    }
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA DEL FORMULARIO:
   *
   * 1. Título con icono
   * 2. Info box (instrucciones)
   * 3. Form
   *    a. Título input
   *    b. Descripción textarea
   *    c. Sección de imágenes
   *       - Inputs para nueva imagen (URL + Nombre)
   *       - Botón agregar
   *       - Lista de imágenes agregadas
   *    d. Botones de acción (Cancelar + Guardar)
   *
   * PATRÓN .form-group:
   * Cada campo está en .form-group para consistencia visual.
   */
  return (
    <div className="album-form">
      {/* ================================================================
          ENCABEZADO
          ================================================================ */}
      <h3 className="album-form__title">
        <span className="album-form__title-icon">📁</span>
        {title}
      </h3>

      {/* ================================================================
          INFORMACIÓN/INSTRUCCIONES
          ================================================================ */}
      <div className="form-info">
        <p className="form-info__text">
          💡 Completa la información del álbum y agrega las imágenes que quieras
          incluir. Puedes añadir múltiples imágenes usando URLs válidas.
        </p>
      </div>

      {/* ================================================================
          FORMULARIO
          ================================================================ */}
      <form className="album-form__form" onSubmit={handleSubmit}>
        {/* ==============================================================
            CAMPO: TÍTULO
            ============================================================== */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="title">
            <span className="form-group__label-icon">🏷️</span>
            Título del álbum
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? "form-input--error" : ""}`}
            placeholder="Ej. City Nights"
            required
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        {/* ==============================================================
            CAMPO: DESCRIPCIÓN
            ============================================================== */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="description">
            <span className="form-group__label-icon">📝</span>
            Descripción del álbum
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`form-textarea ${
              errors.description ? "form-input--error" : ""
            }`}
            rows="3"
            placeholder="Describe el álbum..."
            required
          />
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        {/* ==============================================================
            SECCIÓN: IMÁGENES DEL ÁLBUM
            ==============================================================

            CONCEPTO - Dynamic List with Sub-form:
            Esta sección combina:
            1. Form para agregar nueva imagen
            2. Lista de imágenes ya agregadas

            PATRÓN UX:
            - Inputs en horizontal para agregar (eficiente)
            - Lista vertical para visualizar (legible)
            - Botones de eliminar por item
         */}
        <div className="form-group">
          <label className="form-group__label">
            <span className="form-group__label-icon">🖼️</span>
            Imágenes del álbum
          </label>

          <div className="image-input-group">
            {/* ========================================================
                SUB-FORM: AGREGAR NUEVA IMAGEN
                ========================================================

                LAYOUT HORIZONTAL:
                [Input URL] [Input Nombre] [Botón +]

                CONTROLLED INPUTS:
                - value={newImage.url}: Controlado por state
                - onChange={handleNewImageChange}: Actualiza state
             */}
            <div className="image-input-row">
              <input
                type="url"
                name="url"
                value={newImage.url}
                onChange={handleNewImageChange}
                className="form-input"
                placeholder="URL de la imagen"
              />
              <input
                type="text"
                name="name"
                value={newImage.name}
                onChange={handleNewImageChange}
                className="form-input"
                placeholder="Nombre de la imagen"
              />

              {/*
                BOTÓN AGREGAR:

                TYPE="button":
                NO dispara submit del form principal.

                DISABLED:
                Solo activo si ambos campos tienen contenido.

                TRIM():
                Verifica que no sea solo espacios.

                CONDICIÓN:
                !newImage.url.trim() || !newImage.name.trim()

                Si cualquiera está vacío → disabled
              */}
              <Button
                type="button"
                onClick={handleAddImage}
                variant="primary"
                size={BUTTON_SIZES.MEDIUM}
                disabled={!newImage.url.trim() || !newImage.name.trim()}
              >
                +
              </Button>
            </div>

            {/* ERROR DE VALIDACIÓN (si no hay imágenes al submit) */}
            {errors.images && (
              <span className="form-error">{errors.images}</span>
            )}

            {/* ========================================================
                LISTA DE IMÁGENES AGREGADAS
                ========================================================

                RENDERIZADO CONDICIONAL:
                Solo muestra si hay al menos una imagen.

                formData.images.length > 0
             */}
            {formData.images.length > 0 && (
              <div className="added-images">
                {/* Título con contador */}
                <p className="added-images__title">
                  Imágenes agregadas ({formData.images.length})
                </p>

                {/*
                  LISTA DE ITEMS:

                  ARRAY.MAP():
                  Transforma cada imagen en un elemento visual.

                  KEY:
                  Usa index porque las imágenes pueden no tener id único.

                  NOTA: Si las imágenes tuvieran id, sería mejor:
                  key={image.id}

                  ESTRUCTURA DE ITEM:
                  [Info (nombre + url)] [Botón eliminar]
                */}
                <div className="added-images__list">
                  {formData.images.map((image, index) => (
                    <div key={index} className="added-image-item">
                      {/* Información de la imagen */}
                      <div className="added-image-item__info">
                        <p className="added-image-item__name">{image.name}</p>
                        <p className="added-image-item__url">{image.url}</p>
                      </div>

                      {/*
                        BOTÓN ELIMINAR:

                        TYPE="button": NO dispara submit

                        VARIANT="danger": Visual destructivo

                        ONCLICK:
                        () => handleRemoveImage(index)

                        Arrow function necesaria para pasar index.

                        ARIA-LABEL:
                        Accesibilidad para screen readers.
                      */}
                      <Button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        variant="danger"
                        size={BUTTON_SIZES.SMALL}
                        ariaLabel="Eliminar imagen"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==============================================================
            ACCIONES: Cancelar y Guardar
            ==============================================================

            ORDEN UX ESTÁNDAR:
            [Cancelar (secundario)] [Guardar (primario)]
         */}
        <div className="form-actions">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
          >
            Cancelar
          </Button>

          <Button type="submit" variant="primary" size={BUTTON_SIZES.MEDIUM}>
            <span>💾</span>
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de AlbumForm
 *
 * PROPS OPCIONALES (todas):
 * - action: "create" o "edit"
 * - album: Objeto con datos del álbum
 * - onSaveAlbum: Callback al guardar
 * - onCancel: Callback al cancelar
 *
 * CONCEPTO - PropTypes.oneOf:
 * Restringe valores posibles (enum-like).
 *
 * CONCEPTO - PropTypes.shape:
 * Define estructura detallada del objeto album.
 *
 * CONCEPTO - PropTypes.arrayOf:
 * Array donde cada elemento es del tipo especificado.
 *
 * NESTED SHAPE:
 * images: PropTypes.arrayOf(PropTypes.shape({...}))
 *
 * Array de objetos, cada uno con estructura definida.
 *
 * EJEMPLO:
 * images: [
 *   { url: "http://...", name: "Image 1" },
 *   { url: "http://...", name: "Image 2" }
 * ]
 *
 * VALIDACIÓN COMPLETA:
 * PropTypes validará:
 * - images es array: ✓
 * - Cada elemento es objeto: ✓
 * - Cada objeto tiene url (string) y name (string): ✓
 * - url es isRequired: ✓
 * - name es isRequired: ✓
 *
 * ADVERTENCIAS:
 * Si la estructura no coincide, verás warnings en consola.
 *
 * NOTA DIDÁCTICA:
 * Esta validación detallada es excelente para:
 * - Documentación (estructura clara)
 * - Debugging (errores específicos)
 * - Autocompletado en IDEs
 * - Prevenir errores de tipo
 */
AlbumForm.propTypes = {
  action: PropTypes.oneOf(["create", "edit"]), // Modo del formulario

  album: PropTypes.shape({
    // Estructura del álbum
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      // Array de imágenes
      PropTypes.shape({
        // Cada imagen tiene:
        url: PropTypes.string.isRequired, // - URL (obligatoria)
        name: PropTypes.string.isRequired, // - Nombre (obligatorio)
      })
    ),
  }),

  onSaveAlbum: PropTypes.func, // Callback guardar
  onCancel: PropTypes.func, // Callback cancelar
};

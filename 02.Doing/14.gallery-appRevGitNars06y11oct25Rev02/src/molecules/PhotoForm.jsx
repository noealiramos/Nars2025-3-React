/**
 * ============================================================================
 * PHOTOFORM - FORMULARIO DE FOTO (CREAR/EDITAR)
 * ============================================================================
 *
 * Componente de formulario controlado para crear o editar fotos.
 *
 * PROPÓSITO:
 * - Capturar datos de una foto (url, título, descripción, ubicación)
 * - Validar campos obligatorios y formato URL
 * - Manejar estados de creación y edición
 * - Mostrar errores de validación
 * - Proporcionar feedback visual
 *
 * CONCEPTOS CLAVE:
 * - Controlled components: Inputs controlados por state
 * - useState: Manejo de estado del formulario
 * - Form validation: Validación de datos
 * - Error handling: Manejo y muestra de errores
 * - Computed values: Valores calculados (isEditing, title, submitText)
 * - Event handlers: onChange, onSubmit
 * - Conditional classes: CSS dinámico según errores
 *
 * FLUJO:
 * 1. Usuario escribe → onChange → actualiza state
 * 2. Usuario limpia error al escribir
 * 3. Usuario envía → onSubmit → valida
 * 4. Si válido → llama onSavePhoto
 * 5. Si inválido → muestra errores
 *
 * DIFERENCIA CREATE vs EDIT:
 * - Create: photo=undefined, campos vacíos
 * - Edit: photo={datos}, campos pre-llenados
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { useState } from "react"; // Hook para estado
import Button from "../atoms/Button"; // Botón reutilizable
import { BUTTON_SIZES } from "../utils/constants"; // Constantes
import "./PhotoForm.css"; // Estilos

// ==========================================================================
// COMPONENTE PHOTOFORM
// ==========================================================================

/**
 * PhotoForm - Formulario para crear/editar fotos
 *
 * @param {Object} props
 * @param {string} props.action - Modo: "create" o "edit" (default: "create")
 * @param {Object} props.photo - Datos de foto existente (al editar)
 * @param {Function} props.onSavePhoto - Callback al guardar
 * @param {Function} props.onCancel - Callback al cancelar
 *
 * CONCEPTO - Modo Dual (Create/Edit):
 * Un mismo componente maneja dos casos de uso:
 * 1. Crear nueva foto (action="create", photo=undefined)
 * 2. Editar foto existente (action="edit", photo={datos})
 *
 * VENTAJAS:
 * - Reutilización de código (no duplicar formulario)
 * - Consistencia en UX (mismo diseño)
 * - Mantenibilidad (un solo lugar para cambios)
 *
 * PATRÓN:
 * - action determina comportamiento
 * - photo proporciona datos iniciales (si existe)
 */
export default function PhotoForm({
  action = "create", // Default: modo crear
  photo,
  onSavePhoto,
  onCancel,
}) {
  // ========================================================================
  // VALORES CALCULADOS
  // ========================================================================

  /**
   * COMPUTED VALUES: Valores derivados de props
   *
   * Se calculan una vez por render, al inicio de la función.
   *
   * CONCEPTO - Boolean from String:
   * isEditing = action === "edit"
   *
   * Convierte string a boolean para uso en condicionales.
   * Más legible que usar action === "edit" en todo el código.
   *
   * CONCEPTO - Dynamic Text:
   * Textos que cambian según el modo (crear vs editar).
   *
   * VENTAJAS:
   * 1. DRY (Don't Repeat Yourself)
   * 2. Un solo lugar para cambiar textos
   * 3. Fácil traducción a otros idiomas
   */
  const isEditing = action === "edit";
  const title = isEditing ? "Editar foto" : "Agregar nueva foto";
  const submitText = isEditing ? "Guardar cambios" : "Guardar foto";

  // ========================================================================
  // ESTADO DEL COMPONENTE
  // ========================================================================

  /**
   * ESTADO 1: formData - Datos del formulario
   *
   * CONCEPTO - Lazy Initialization:
   * useState(() => { ... })
   *
   * La función se ejecuta solo una vez, en el primer render.
   *
   * VENTAJA:
   * Si photo tiene muchos datos o cálculos complejos,
   * solo se procesa al inicializar, no en cada render.
   *
   * NULLISH COALESCING:
   * photo?.url ?? ""
   *
   * ?. : Optional chaining (si photo es null, retorna undefined)
   * ?? : Nullish coalescing (si undefined/null, usa "")
   *
   * DIFERENCIA con ||:
   * - || : Usa fallback si valor es falsy (0, "", false, null, undefined)
   * - ?? : Usa fallback SOLO si es null o undefined
   *
   * EJEMPLO:
   * const url = photo?.url || "default"
   * Si photo.url = "" → usa "default" (puede no ser deseado)
   *
   * const url = photo?.url ?? "default"
   * Si photo.url = "" → usa "" (mantiene string vacío)
   *
   * ESTRUCTURA DE formData:
   * {
   *   url: string,
   *   title: string,
   *   description: string,
   *   location: string,
   *   tags: array
   * }
   */
  const [formData, setFormData] = useState(() => ({
    url: photo?.url ?? "",
    title: photo?.title ?? "",
    description: photo?.description ?? "",
    location: photo?.location ?? "",
    tags: photo?.tags ?? [],
  }));

  /**
   * ESTADO 2: errors - Errores de validación
   *
   * Objeto con estructura:
   * {
   *   url: "mensaje de error",
   *   title: "mensaje de error",
   *   description: "mensaje de error"
   * }
   *
   * Si no hay error, el campo no existe en el objeto.
   *
   * EJEMPLO:
   * { title: "El título es requerido" } → Solo title tiene error
   * {} → No hay errores
   */
  const [errors, setErrors] = useState({});

  // ========================================================================
  // HANDLERS - MANEJADORES DE EVENTOS
  // ========================================================================

  /**
   * handleInputChange - Maneja cambios en todos los inputs
   *
   * @param {Event} e - Evento del input
   *
   * CONCEPTO - Generic Handler:
   * Un solo handler para múltiples inputs.
   *
   * ALTERNATIVA (más código):
   * const handleUrlChange = (e) => { ... }
   * const handleTitleChange = (e) => { ... }
   * const handleDescriptionChange = (e) => { ... }
   *
   * CONCEPTO - Event Object Destructuring:
   * const { name, value } = e.target
   *
   * Extrae propiedades del elemento input:
   * - name: Atributo name del input ("url", "title", etc.)
   * - value: Valor actual del input
   *
   * CONCEPTO - Computed Property Names:
   * { [name]: value }
   *
   * Usa variable como clave de objeto.
   *
   * EJEMPLO:
   * name = "title", value = "Sunset"
   * { [name]: value } → { title: "Sunset" }
   *
   * CONCEPTO - Functional Update:
   * setFormData((prev) => ({ ...prev, [name]: value }))
   *
   * prev: Estado anterior
   * ...prev: Spread (copia todas las propiedades)
   * [name]: value: Sobrescribe/agrega la propiedad
   *
   * INMUTABILIDAD:
   * No modificamos el estado directamente.
   * Creamos un nuevo objeto con los cambios.
   *
   * EJEMPLO COMPLETO:
   * Estado anterior: { url: "abc.jpg", title: "Old" }
   * Cambio en title → "New"
   * Nuevo estado: { url: "abc.jpg", title: "New" }
   *
   * LIMPIAR ERROR AL ESCRIBIR:
   * Si el campo tenía error, lo eliminamos cuando
   * el usuario empieza a escribir (mejor UX).
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualizar valor del campo
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo si existía
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "", // Vacía el error
      }));
    }
  };

  // ========================================================================
  // VALIDACIÓN
  // ========================================================================

  /**
   * validateForm - Valida todos los campos del formulario
   *
   * @returns {boolean} - true si válido, false si hay errores
   *
   * CONCEPTO - Validation Pattern:
   * 1. Crear objeto vacío para errores
   * 2. Validar cada campo
   * 3. Si falla, agregar mensaje al objeto
   * 4. Guardar errores en state
   * 5. Retornar si hay errores o no
   *
   * STRING.TRIM():
   * Elimina espacios al inicio y final.
   * "  hello  ".trim() → "hello"
   *
   * POR QUÉ:
   * "   " (solo espacios) es truthy, pero no válido
   * "   ".trim() → "" (vacío) → falsy → inválido ✓
   *
   * VALIDACIÓN DE URL:
   * try {
   *   new URL(string);
   * } catch {
   *   // no es URL válida
   * }
   *
   * new URL() lanza error si el string no es URL válida.
   *
   * EJEMPLO:
   * new URL("https://example.com") → OK
   * new URL("not a url") → Error
   *
   * OBJETO.KEYS().LENGTH:
   * Object.keys(newErrors).length === 0
   *
   * Si el objeto está vacío → no hay errores → válido
   * Si tiene claves → hay errores → inválido
   *
   * RETORNO:
   * true: Sin errores, formulario válido
   * false: Con errores, formulario inválido
   */
  const validateForm = () => {
    const newErrors = {};

    // Validar título
    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    // Validar descripción
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    // Validar URL
    if (!formData.url.trim()) {
      newErrors.url = "La URL es requerida";
    } else {
      // Validación básica de formato URL
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = "La URL no es válida";
      }
    }

    // Guardar errores en state
    setErrors(newErrors);

    // Retornar si es válido (no hay errores)
    return Object.keys(newErrors).length === 0;
  };

  /**
   * handleSubmit - Maneja envío del formulario
   *
   * @param {Event} e - Evento del form
   *
   * CONCEPTO - Form Submit:
   * Por defecto, <form onSubmit> recarga la página.
   *
   * e.preventDefault() previene el comportamiento por defecto.
   *
   * FLUJO:
   * 1. Prevenir recarga de página
   * 2. Validar formulario
   * 3. Si válido → llamar callback onSavePhoto
   * 4. Si inválido → errores ya están en state, se muestran
   *
   * OPTIONAL CHAINING EN CALLBACK:
   * onSavePhoto?.(formData)
   *
   * Solo llama si onSavePhoto existe.
   * Pasa formData completo al callback.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSavePhoto?.(formData);
    }
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA DEL FORMULARIO:
   *
   * 1. Título (icono + texto dinámico)
   * 2. Info box (instrucciones)
   * 3. Form
   *    a. URL input
   *    b. Título input
   *    c. Descripción textarea
   *    d. Ubicación input
   *    e. Botones de acción
   *
   * PATRÓN form-group:
   * Cada campo está envuelto en .form-group para consistencia.
   *
   * ESTRUCTURA:
   * <div className="form-group">
   *   <label htmlFor="id">Texto</label>
   *   <input id="id" name="name" ... />
   *   {error && <span>error</span>}
   * </div>
   */
  return (
    <div className="photo-form">
      {/* ================================================================
          ENCABEZADO DEL FORMULARIO
          ================================================================ */}
      <h3 className="photo-form__title">
        <span className="photo-form__title-icon">📷</span>
        {title}
      </h3>

      {/* ================================================================
          INFORMACIÓN/INSTRUCCIONES
          ================================================================ */}
      <div className="form-info">
        <p className="form-info__text">
          💡 Completa todos los campos para agregar una foto a tu galería.
          Asegúrate de que la URL de la imagen sea válida y accesible.
        </p>
      </div>

      {/* ================================================================
          FORMULARIO
          ================================================================

          onSubmit: Se dispara al presionar Enter o click en button[type="submit"]
       */}
      <form className="photo-form__form" onSubmit={handleSubmit}>
        {/* ==============================================================
            CAMPO: URL DE LA IMAGEN
            ==============================================================

            TYPE="url":
            HTML5 input type para URLs.
            Proporciona validación básica del navegador.

            REQUIRED:
            Atributo HTML5 que hace el campo obligatorio.
            Muestra mensaje del navegador si está vacío.

            NOTA: También validamos en JS (validateForm) para
            control completo y mensajes personalizados.

            CLASE CONDICIONAL:
            form-input--error se agrega solo si hay error.

            Template literal:
            `form-input form-input--url ${errors.url ? "form-input--error" : ""}`

            VALUE + ONCHANGE = CONTROLLED COMPONENT:
            - value={formData.url}: React controla el valor
            - onChange={handleInputChange}: Actualiza state al cambiar

            PLACEHOLDER:
            Texto de ejemplo, ayuda al usuario.
         */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="url">
            <span className="form-group__label-icon">🔗</span>
            URL de la imagen
          </label>
          <input
            type="url"
            id="url"
            name="url"
            className={`form-input form-input--url ${
              errors.url ? "form-input--error" : ""
            }`}
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.url}
            onChange={handleInputChange}
            required
          />
          {/* Mostrar error si existe */}
          {errors.url && <span className="form-error">{errors.url}</span>}
        </div>

        {/* ==============================================================
            CAMPO: TÍTULO
            ============================================================== */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="title">
            <span className="form-group__label-icon">🏷️</span>
            Título de la imagen
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-input ${errors.title ? "form-input--error" : ""}`}
            placeholder="Ej. Atardecer en el parque"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        {/* ==============================================================
            CAMPO: DESCRIPCIÓN
            ==============================================================

            TEXTAREA:
            Para textos largos multi-línea.

            ROWS:
            Altura inicial en líneas de texto.
            Usuario puede redimensionar con resize (CSS).

            VALUE en textarea:
            En React, textarea usa value como los inputs.
            (En HTML normal, usa <textarea>contenido</textarea>)
         */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="description">
            <span className="form-group__label-icon">📝</span>
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className={`form-textarea ${
              errors.description ? "form-input--error" : ""
            }`}
            rows="4"
            placeholder="Describe la foto, el momento, los colores, la historia detrás de la imagen..."
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        {/* ==============================================================
            CAMPO: UBICACIÓN (OPCIONAL)
            ==============================================================

            SIN required:
            Campo opcional, puede dejarse vacío.

            SIN validation:
            No validamos este campo en validateForm.
         */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="location">
            <span className="form-group__label-icon">📍</span>
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            placeholder="Ej. Aguascalientes, México"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* ==============================================================
            ACCIONES: Cancelar y Guardar
            ==============================================================

            ORDEN UX:
            1. Cancelar (secundario, izquierda)
            2. Guardar (primario, derecha)

            BOTÓN CANCELAR:
            - type="button": NO dispara submit
            - variant="secondary": Estilo visual menos prominente
            - onClick: Llama callback onCancel

            BOTÓN GUARDAR:
            - type="submit": Dispara onSubmit del form
            - variant="primary": Estilo visual prominente
            - Incluye icono (💾) y texto dinámico

            SUBMIT vs CLICK:
            El botón de guardar usa type="submit" para que:
            1. Se dispare al presionar Enter en cualquier input
            2. Se active validación HTML5 (required, type="url", etc.)
            3. Siga el patrón estándar de formularios
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
 * PropTypes de PhotoForm
 *
 * PROPS OPCIONALES (todas):
 * - action: "create" o "edit" (default: "create")
 * - photo: Objeto con datos de la foto (al editar)
 * - onSavePhoto: Callback al guardar
 * - onCancel: Callback al cancelar
 *
 * CONCEPTO - PropTypes.oneOf:
 * Valida que sea uno de los valores especificados.
 * Similar a un enum en otros lenguajes.
 *
 * CONCEPTO - PropTypes.shape:
 * Define estructura del objeto photo.
 *
 * TODAS OPCIONALES:
 * Ninguna prop tiene .isRequired porque:
 * - action tiene default en destructuring
 * - photo puede no existir (modo create)
 * - Callbacks pueden no pasarse (componente solo visual)
 *
 * NOTA DIDÁCTICA:
 * En producción real, onSavePhoto y onCancel probablemente
 * serían .isRequired ya que el formulario necesita comunicarse
 * con el componente padre.
 */
PhotoForm.propTypes = {
  action: PropTypes.oneOf(["create", "edit"]), // Modo del formulario
  photo: PropTypes.shape({
    // Estructura de photo
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onSavePhoto: PropTypes.func, // Callback guardar
  onCancel: PropTypes.func, // Callback cancelar
};

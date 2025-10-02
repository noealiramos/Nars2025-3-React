import PropTypes from 'prop-types';
import './PhotoForm.css';

export default function PhotoForm({ action = 'create', photo, onCancel }) {
  const isEditing = action === 'edit';
  const title = isEditing ? 'Editar foto' : 'Agregar nueva foto';
  const submitText = isEditing ? 'Guardar cambios' : 'Guardar foto';

  return (
    <div className="photo-form">
      <h3 className="photo-form__title">
        <span className="photo-form__title-icon">📷</span>
        {title}
      </h3>

      <div className="form-info">
        <p className="form-info__text">
          💡 Completa todos los campos para agregar una foto a tu galería.
          Asegúrate de que la URL de la imagen sea válida y accesible.
        </p>
      </div>

      <form className="photo-form__form">
        {/* URL de la imagen */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="imageUrl">
            <span className="form-group__label-icon">🔗</span>
            URL de la imagen
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="form-input form-input--url"
            placeholder="https://ejemplo.com/imagen.jpg"
            defaultValue={photo?.url || ''}
          />

          {/* Preview de la imagen (placeholder visual) */}
          <div className="image-preview">
            <div className="image-preview__placeholder">
              <div className="image-preview__icon">🖼️</div>
              <p className="image-preview__text">
                Vista previa de la imagen aparecerá aquí
              </p>
            </div>
          </div>
        </div>

        {/* Título */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="imageTitle">
            <span className="form-group__label-icon">🏷️</span>
            Título de la imagen
          </label>
          <input
            type="text"
            id="imageTitle"
            name="imageTitle"
            className="form-input"
            placeholder="Ej. Atardecer en el parque"
            defaultValue={photo?.title || ''}
            required
          />
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="imageDescription">
            <span className="form-group__label-icon">📝</span>
            Descripción
          </label>
          <textarea
            id="imageDescription"
            name="imageDescription"
            className="form-textarea"
            rows="4"
            placeholder="Describe la foto, el momento, los colores, la historia detrás de la imagen..."
            defaultValue={photo?.description || ''}
            required
          />
        </div>

        {/* Ubicación */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="imageLocation">
            <span className="form-group__label-icon">📍</span>
            Ubicación
          </label>
          <input
            type="text"
            id="imageLocation"
            name="imageLocation"
            className="form-input"
            placeholder="Ej. Aguascalientes, México"
            defaultValue={photo?.location || ''}
          />
        </div>

        {/* Acciones */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            <span>💾</span>
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}

PhotoForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit']),
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string
  }),
  onCancel: PropTypes.func
};

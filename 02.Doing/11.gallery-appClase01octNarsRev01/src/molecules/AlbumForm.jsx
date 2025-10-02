import PropTypes from 'prop-types';
import './AlbumForm.css';

export default function AlbumForm({ action = 'create', album, onSaveAlbum, onCancel }) {
  const isEditing = action === 'edit';
  const title = isEditing ? 'Editar álbum' : 'Agregar nuevo álbum';
  const submitText = isEditing ? 'Guardar cambios' : 'Guardar álbum';

  return (
    <div className="album-form">
      <h3 className="album-form__title">
        <span className="album-form__title-icon">📁</span>
        {title}
      </h3>

      <div className="form-info">
        <p className="form-info__text">
          💡 Completa la información del álbum y agrega las imágenes que quieras incluir.
          Puedes añadir múltiples imágenes usando URLs válidas.
        </p>
      </div>

      <form className="album-form__form" onSubmit={()=>{}}>
        {/* Título */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="title">
            <span className="form-group__label-icon">🏷️</span>
            Título del álbum
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={album?.title}
            onChange={()=>{}}
            className="form-input"
            placeholder="Ej. City Nights"
            required
          />
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="description">
            <span className="form-group__label-icon">📝</span>
            Descripción del álbum
          </label>
          <textarea
            id="description"
            name="description"
            value={album?.description}
            onChange={()=>{}}
            className="form-textarea"
            rows="3"
            placeholder="Describe el álbum..."
            required
          />
        </div>

        {/* Imágenes */}
        <div className="form-group">
          <label className="form-group__label">
            <span className="form-group__label-icon">🖼️</span>
            Imágenes del álbum
          </label>

          <div className="image-input-group">
            <div className="image-input-row">
              <input
                type="url"
                name="url"
                value={album?.url}
                onChange={()=>{}}
                className="form-input"
                placeholder="URL de la imagen"
              />
              <input
                type="text"
                name="name"
                value={album?.name}
                onChange={()=>{}}
                className="form-input"
                placeholder="Nombre de la imagen"
              />
              <button
                type="button"
                onClick={()=>{}}
                className="btn-add"
                disabled={!album?.url || !album?.name}
              >
                +
              </button>
            </div>

            {/* Lista de imágenes agregadas */}
            {album?.images.length > 0 && (
              <div className="added-images">
                <p className="added-images__title">
                  Imágenes agregadas ({album.images.length})
                </p>
                <div className="added-images__list">
                  {album?.images.map((image, index) => (
                    <div key={index} className="added-image-item">
                      <div className="added-image-item__info">
                        <p className="added-image-item__name">{image?.name}</p>
                        <p className="added-image-item__url">{image?.url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={()=>{}}
                        className="btn-remove"
                        title="Eliminar imagen"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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

AlbumForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit']),
  album: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  }),
  onSaveAlbum: PropTypes.func,
  onCancel: PropTypes.func
};

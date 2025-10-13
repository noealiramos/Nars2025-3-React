import PhotoForm from "../molecules/PhotoForm";
import "./Pages.css";

export default function EditPhoto({
  action,
  photo,
  onSavePhoto,
  onCancel,
  isOpen,
}) {
  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  // Función para cerrar el modal al hacer clic en el backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Botón de cerrar */}
        <button
          className="modal-close-button"
          onClick={onCancel}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Contenido del formulario */}
        <PhotoForm
          action={action}
          photo={photo}
          onSavePhoto={onSavePhoto}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}

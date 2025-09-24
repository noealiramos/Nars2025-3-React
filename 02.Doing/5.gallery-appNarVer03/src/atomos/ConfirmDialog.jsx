import './ConfirmDialog.css';

export default function ConfirmDialog({ open, title = 'Delete', message = '', onCancel, onConfirm }){
  if(!open) return null;
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn" onClick={onCancel}>No</button>
          <button className="btn btn--danger" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
}

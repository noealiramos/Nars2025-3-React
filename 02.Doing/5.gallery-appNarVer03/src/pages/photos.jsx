import ConfirmDialog from '../atomos/ConfirmDialog';
import { useState } from 'react';
import './photos.css';
// 👇 default import (sin llaves)
import photoData from '../data/photos';
import PhotoCard from '../molecules/PhotoCard';

export default function Photos(){
  const [photos, setPhotos] = useState(() => (photoData || []).map((p, i) => ({ id: p.id ?? i, ...p })));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(null);

  const requestDelete = (photo) => { setPending(photo); setConfirmOpen(true); };
  const cancelDelete = () => { setConfirmOpen(false); setPending(null); };
  const confirmDelete = () => {
    setPhotos(prev => prev.filter(p => p.id !== pending.id));
    setConfirmOpen(false);
    setPending(null);
  };

  return (
    <section className="photos container">
      <h3 className="photos__title">Photos</h3>
      <div className="photos__grid">
        {photos.map((photo,i)=>(
          <div className="photos__card" key={photo.id ?? i}>
            <PhotoCard image={photo} onDelete={requestDelete} />
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete"
        message={pending ? `Are you sure you want to delete "${pending.title || 'photo'}"?` : ''}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
import './photos.css';
// 👇 default import (sin llaves)
import photoData from '../data/photos';
import PhotoCard from '../molecules/PhotoCard';

export default function Photos() {
  return (
    <section className="photos">
      <h3 className="photos__title">Photo1</h3>
      <p className="photos__description">Photo1 Description</p>
      <div className="photos__grid">
        {photoData.map((photo, i) => (
          <div className="photos__card" key={i}>
            <PhotoCard image={photo} />
          </div>
        ))}
      </div>
    </section>
  );
}

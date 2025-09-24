import './albums.css';
// 👇 default import (sin llaves)
import albumsData from '../data/albums';
import AlbumCard from '../molecules/AlbumCard';

export default function Albums() {
  return (
    <section className="albums">
      <h3 className="albums__title">My Album</h3>
      <p className="albums__description">Description</p>
      <div className="albums__grid">
        {albumsData.map((album, i) => (
          <div className="albums__card" key={i}>
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useState, Suspense, lazy } from "react";
import photos from "./photos.json";
import Gallery from "./Gallery";

const PhotoViewer = lazy(() => import("./PhotoViewer"));

export default function GalleryContainer() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div>
      <Gallery photos={photos} onSelect={setSelectedPhoto} />
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Cargando visor...</p>}
      >
        {selectedPhoto && (
          <PhotoViewer
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </Suspense>
    </div>
  );
}
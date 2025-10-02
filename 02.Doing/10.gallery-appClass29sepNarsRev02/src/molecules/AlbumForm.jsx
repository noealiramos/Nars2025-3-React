export default function AlbumForm({action,album,onSaveAlbum}){
  return(
    <div>
      <h3>Crear nuevo álbum</h3>
      <form>
        {/* Titulo */}
        <div>
          <label >Título del álbum: </label>
          <input type="text"
          id="albumTitle"
          name="albumTitle"
          placeholder="Ej. City Nights"></input>
        </div>
        {/* Descripcion */}
        <div>
          <label >Descripción del álbum: </label>
          <textarea type="text"
          id="albumDescription"
          name="albumDescription"
          rows="3"
          placeholder="Describe el álbum"></textarea>
        </div>
        {/* Imagenes */}
        <div>
          <label >Imágenes del álbum: </label>
          <div>
          <input type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="URL de la imagen"></input>
          <input type="text"
          id="imageTitle"
          name="imageTitle"
          placeholder="Nombre de la imagen"></input>
          <button>+</button>
          </div>
        </div>
        <div>
          <button type="submit">Crear Álbum</button>
          <button type="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
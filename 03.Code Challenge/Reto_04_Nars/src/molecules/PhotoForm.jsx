export default function PhotoForm(){
  return(
    <div>
      <h3>Agregar nueva foto</h3>
      <form>
        <div>
          <label>URL de la imagen: </label>
          <input type="url" id="imageUrl" name="imageUrl"
          placeholder="Escribe la URL de la imagen"></input>
        </div>
        <div>
          <label>Título de la imagen: </label>
          <input type="text" id="imageTitle" name="imageTitle"
          placeholder="Ej. Parque"></input>
        </div>
        <div>
          <label>Descripción: </label>
          <textarea type="text" id="imageDescription" name="imageDescription"
          rows="3" placeholder="Describe la foto..."></textarea>
        </div>
        <div>
          <label>Ubicación: </label>
          <input type="text" id="imageLocation" name="imageLocation"
          placeholder="Ej: AGS, MX."></input>
        </div>
        <div>
          <button type="submit">Guardar Foto</button>
          <button type="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
import useLocalStorage from "../hooks/useLocalStorage";

function Recordatorio() {
  const [texto, setTexto] = useLocalStorage("nota", "");

  return (
    <div style={{ padding: 20 }}>
      <h3>Escribe algo importante: </h3>
      <input
        type="text"
        value={texto}
        onChange={(e) => { setTexto(e.target.value) }}
        placeholder="Tu nota aquí" />
      <p>Guardado: {texto}</p>
    </div>
  );
}

export default Recordatorio;
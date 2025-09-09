import { useState } from "react";

function SimpleForm() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: ""
  });
  const [error, setError] = useState("");
  const [isSave, setIsSave] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.email) {
      setError("Todos los campos son obligatorios");
      setIsSave(false);
      return;
    }

    if (!formulario.email.includes("@")) {
      setError("El correo no es válido");
      setIsSave(false);
      return;
    }
    setIsSave(true);
    setError("");
    console.log("Formulario enviado");
  }

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={manejarEnvio}>
      <label>
        Nombre:
        <input name="nombre" type="text" value={formulario.nombre}
          onChange={manejarCambio} />
      </label>
      <label>
        Email:
        <input name="email" type="text" value={formulario.email}
          onChange={manejarCambio} />
      </label>
      <button type="submit">Enviar</button>
      {isSave && <p>Hola, {formulario.nombre}. Te enviaremos en breve información a {formulario.email}</p>}
      {error && <p style={{ color: 'red' }} >{error}</p>}
    </form>
  );
}

export default SimpleForm;
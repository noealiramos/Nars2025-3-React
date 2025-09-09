import React, { useState } from "react";

const Usuario = React.memo(function Usuario({ index, nombre }) {
  console.log("Renderizado: ", nombre);
  return <li key={index}>{nombre}</li>;
});

export default function ListaUsuarios() {
  const [contador, setContador] = useState(0);
  const usuarios = ["Ana", "Luis", "Pedro"];

  return (
    <>
      {console.log("Render")}
      <h2>Usuarios Registrados</h2>
      <ul>
        {usuarios &&
          usuarios.map((usuario, index) => (
            <Usuario key={index} nombre={usuario} />
          ))}
      </ul>
      <button
        onClick={() => {
          console.log("onClick");
          setContador(contador + 1);
        }}
      >
        Incrementar Contador {contador}
      </button>
    </>
  );
}

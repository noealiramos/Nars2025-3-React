import useContador from "../hooks/useContador";

function Contador() {
  const { contador, incrementar, decrementar, reiniciar } = useContador();

  return (
    <div style={{ padding: 20 }}>
      <h3>Contador: {contador}</h3>
      <button onClick={incrementar} >+</button>
      <button onClick={decrementar} >-</button>
      <button onClick={reiniciar} >Reiniciar</button>
    </div>
  );
}

export default Contador;
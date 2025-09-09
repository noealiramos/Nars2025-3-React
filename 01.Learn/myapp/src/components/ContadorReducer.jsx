import useContadorReducer from "../hooks/useContadorReducer";

function ContadorReducer() {
  const { contador, incrementar, decrementar, reiniciar } = useContadorReducer(10);

  return (
    <div style={{ padding: 20 }}>
      <h2>Contador (Reducer):{contador}</h2>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
      <button onClick={() => reiniciar(0)}>Reiniciar</button>
    </div>
  );
}

export default ContadorReducer;
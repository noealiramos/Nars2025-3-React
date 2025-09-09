import useTeclaPresionada from "../hooks/useTeclaPresionada";

function TeclaDetector(props) {
  const tecla = useTeclaPresionada(props.tecla);

  return (
    <div style={{ padding: 20 }}>
      <p>{tecla ?
        `¡Estás presionando la tecla ${props.tecla}!` :
        `¡Presiona la tecla ${props.tecla}!`}</p>
    </div>
  );
}

export default TeclaDetector;
import { useReducer } from "react";

const acciones = {
  INCREMENTAR: "incrementar",
  DECREMENTAR: "decrementar",
  REINICIAR: "reiniciar",
};

function reducer(state, action) {
  switch (action.type) {
    case acciones.INCREMENTAR:
      return { contador: state.contador + 1 };
    case acciones.DECREMENTAR:
      return { contador: state.contador - 1 };
    case acciones.REINICIAR:
      return { contador: action.payload || 0 };
    default:
      return state;
  }
}

function useContadorReducer(valorInicial = 0) {
  const [state, dispach] = useReducer(reducer, { contador: valorInicial });

  const incrementar = () => dispach({ type: acciones.INCREMENTAR });
  const decrementar = () => dispach({ type: acciones.DECREMENTAR });
  const reiniciar = (v = valorInicial) => dispach({ type: acciones.REINICIAR, payload: v });

  return { contador: state.contador, incrementar, decrementar, reiniciar };
}

export default useContadorReducer;
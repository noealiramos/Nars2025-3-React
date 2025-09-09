import { useState } from "react";

function Conditional() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ?
        <p>Bienvenido, usuario</p> :
        <button onClick={(e) => { setIsLoggedIn(!isLoggedIn) }}>Iniciar Sesión</button>
      }
    </div>
  );
}

export default Conditional;

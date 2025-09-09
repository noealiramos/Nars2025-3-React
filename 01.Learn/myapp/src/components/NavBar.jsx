import { Link } from "react-router-dom";
import BotonTema from "./theme/BotonTema";

function NavBar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      |
      <Link to="/contacto">Contacto</Link>
      <BotonTema />
    </nav>);
}

export default NavBar;
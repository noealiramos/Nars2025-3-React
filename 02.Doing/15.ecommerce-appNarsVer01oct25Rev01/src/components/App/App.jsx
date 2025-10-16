import { CartProvider } from "../../context/CartContext";
import Layout from "../../layout/Layout";
import Cart from "../../pages/Cart";
import Home from "../../pages/Home";

function App() {
  return (
    <CartProvider>
      <Layout>
        <Cart />
        <Home />
      </Layout>
    </CartProvider>
  );
}

export default App;

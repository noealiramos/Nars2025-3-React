import { CartProvider } from "../../context/CartContext";
import Layout from "../../layout/Layout";
import Cart from "../../pages/Cart";
import Home from "../../pages/Home";
import { Router, Routes } from "react-router-dom";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      <Layout>
        <Routes>
        <Route path = "/" element ={<Home />} />
        <Route path = "/cart" element ={<Cart />} />
         <Route path = "*" element ={<Cart />} />
      <Home></Home>

        <Cart />
        <Home />>

      </Layout>
    </CartProvider>
  );
}

export default App;

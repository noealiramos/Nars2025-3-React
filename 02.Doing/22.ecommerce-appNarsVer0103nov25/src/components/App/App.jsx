import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import Layout from "../../layout/Layout";
import Cart from "../../pages/Cart";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Product from "../../pages/Product";
import Profile from "../../pages/Profile";
import ProtectedRoute from "../../pages/ProtectedRoute";
import SearchResults from "../../pages/SearchResults";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="*" element={<div>Ruta no encontrada</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

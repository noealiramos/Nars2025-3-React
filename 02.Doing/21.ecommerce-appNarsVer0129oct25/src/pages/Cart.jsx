import Button from "../components/common/Button";
import Icon from "../components/common/Icon/Icon";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <Icon name="cart" size={100}></Icon>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega algunos productos para empezar a comprar</p>
        <Button to="/" variant="primary">
          Continuar Comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <Icon name="cart" size={50}></Icon>
        <h2>Carrito de Compras</h2>
        <span>{`Tu carrito tiene ${getTotalItems()} articulo(s)`}</span>{" "}
        {/* Corregir template literal */}
        <Button variant="primary" size="sm" onClick={clearCart}>
          Limpiar Carrito
        </Button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <div className="cart-item-image">
              <img src={item.imagesUrl[0]} alt={item.name} />
            </div>

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{`$${item.price.toFixed(2)}`}</p>
            </div>

            <div className="cart-item-quantity">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
              >
                <Icon name="minus" size={15}></Icon>
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                <Icon name="plus" size={15}></Icon>
              </Button>
            </div>

            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <Button size="sm" onClick={() => removeFromCart(item._id)}>
              <Icon name="trash" size={15}></Icon>
            </Button>
          </div>
        ))}

        <div className="cart-summary">
          <div className="cart-total">
            <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
          </div>
          <Button variant="primary" size="md">
            Proceder al pago
          </Button>
        </div>
      </div>
    </div>
  );
}

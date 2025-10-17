import Button from "../components/common/Button";
import Icon from "../components/common/Icon/Icon";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const cartItems = [
    {
      _id: "68b0d4189b825d20ce1e573e",
      name: "AirPods Pro 2",
      description: "Auriculares inalámbricos con audio espacial.",
      price: 299,
      stock: 40,
      imagesUrl: ["/img/products/airpodspro2.jpeg"],
      category: {
        _id: "68b0d4189b825d20ce1e572a",
        name: "Auriculares",
        description: "Audífonos y accesorios",
        imageURL: "https://placehold.co/800x600.png",
        parentCategory: "68b0d4179b825d20ce1e5720",
      },
      quantity: 2,
    },
    {
      _id: "68b0d4189b825d20ce1e5736",
      name: "Apple Watch Series 9",
      description: "Smartwatch avanzado con sensores de salud.",
      price: 499,
      stock: 25,
      imagesUrl: ["/img/products/applewatch9.png"],
      category: {
        _id: "68b0d4189b825d20ce1e5728",
        name: "Smartwatch",
        description: "Relojes inteligentes",
        imageURL: "https://placehold.co/800x600.png",
        parentCategory: "68b0d4179b825d20ce1e5720",
      },
      quantity: 5,
    },
    {
      _id: "68b0d4189b825d20ce1e5734",
      name: "Dell XPS 15",
      description: "Laptop potente para trabajo y gaming.",
      price: 1899,
      stock: 12,
      imagesUrl: ["/img/products/Dell XPS 13.jpeg"],
      category: {
        _id: "68b0d4189b825d20ce1e572c",
        name: "Gaming",
        description: "PCs para gaming",
        imageURL: "https://placehold.co/800x600.png",
        parentCategory: "68b0d4179b825d20ce1e571e",
      },
      quantity: 1,
    },
  ];
  const {
    //cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  // if (cartItems.length === 0) {
  //   return (
  //     <div className="cart-empty">
  //       <Icon name="shopping-cart" size="small"></Icon>
  //       <h2>Tu carrito está vacío</h2>
  //       <p>Agrega algunos productos para empezar a comprar</p>
  //       <Button to="/" variant="primary">
  //         Continuar Comprando
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className="cart">
      <div className="cart-header">
        <Icon name="shopping-cart" size="small"></Icon>
        <h2>Carrito de Compras</h2>
        <Button variant="secondary" size="small" onClick={clearCart}>
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
                size="small"
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="secondary"
                size="small"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                +
              </Button>
            </div>

            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <Button onClick={() => removeFromCart(item._id)}>
              <Icon name="trash" size="small"></Icon>
            </Button>
          </div>
        ))}
        <div className="cart-summary">
          <div className="cart-total">
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          </div>
          <Button variant="primary" size="large">
            Proceder al pago
          </Button>
        </div>
      </div>
    </div>
  );
}

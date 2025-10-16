import {useCart} from "../context/CarContext";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon/Icon";

export default function Cart(){
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
    } = useCart();


    if(cartItems.length === 0){
        return (
    <div className="cart-empty">
        <Icon name="shopping-cart" size="small"></Icon>
        <h2>Your cart is empty</h2>
        <p>Agrega algunos productos para empezar a comprar</p>
        <Button to="/" variant ="primary">
        Continuar Comprando
        </Button>
    </div>
    );
    }

    return ( 
    <div className="cart">
        <Icon name="shopping-cart" size="small"></Icon>
        <h2>Carrito de compras</h2>
        <Button variant ="secondary" size = "smaall" onClick={clearCart}>
            Limpiar Carrito
            </Button>
        </div>
        <div className="cart-items">
            {cartItems.map(item=>(
                <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>className="cart-item-price">{item.price}</p>    
        </div>
        

        </div>    
        </div>
    </div>
    );
}   
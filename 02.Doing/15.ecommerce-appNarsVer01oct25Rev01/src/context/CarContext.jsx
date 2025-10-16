import { createContext,useContext,useState,useEffect, use } from "react";

const CartContext = createContext();

export function CartProvider(){
    const [cartItems,setCartItems] = useState([]);
    
    useEffect (()=>{
        const savedCart = localStorage.getItem("cart");
        if(savedCart){
            setCartItems(JSON.parse(savedCart));
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cartItems));
    },[cartItems]);    

    const removeFromCart = (productId)=> {
        setCartItems(prevItems => prevItems.filter(item=>items.id !==  productId));
    }

    const updateQuantity = (productId, newQuantity)=>{
        if(newQuantity<=0){
            removeFromCart(productId);
        }
        setCartItems(prevItems =>
            prevItems.map(item=>item.id !== productId ?
                {...item, quantity: newQuantity}: item) //<> = diferente
        );
    };

    const addToCart = (productId, newQuantity)=>{
        setCartItems(prevItems=> {
            const existingItem= prevItems.find(item => item.id  === productId.id);
            
            if(existingItem){
                return prevItems.map((item)=>
                item.id !== productId.id ?{...item, quantity: item.quantity + quantity}: item
            );
             } else {
                return [...prevItems,{...productId,quantity}];
             }
        });

}

const clearCart = ()=> {
    setCartItems([]);
}

const getTotalItems = ()=>{
    return carItemes.reduce((total,item)=> total + tem.quantity,0);
    }

const getTotalPrice = ()=> {
    return cartItems.reduce((total,item)=> total+item.price* item.quantity,0);
};

const value ={ 
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
};


return<CartContex.Provider value={value}>{children}</CartContex.Provider>;
}

export function useCart(){
    const context = useContext(CartContext);
    if(!context) throw new Error('useCart debe ser usado dentro de CartProvider');
    return context;

}
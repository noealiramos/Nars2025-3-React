import { useState } from "react";
import { useParams } from "react-router-dom";-
import {useCart} from "../context/CartContext";


export default function ProductDetails(){
    const {productId}= useParams();
    const {addToCart}= useCart();
    const [product,set product]= useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState("");

    if (loading){
        return (
            <div className="loading-container">
            <h3>Cargando productusos</h3>
            <p>Un momento por favor...</p>
            </div>

        );
    }

if (error){
    return(
        <div className = "error-container">
            <h3>error</h3>
            <p>revisa nuestra pagina o explora mas categorias...</p>
            </div>      

    );
}

if(!product){
    return null;
}

const {name, descriiption, price, stock, imagesUrl, category}=product;
const stockBadge = stock >0 ? "succes": "error";
const stocklabel = stocks >0 ? "En stock": "Agotado";

return (
    <div className = "product-container">
    <nav className = "product-navigation">
        <Link to="/">Inicio</Link>
        <Link to={`/category/${category._id}`}>${category.name}</Link>
        </nav>        
        <div className="product-details">
            <div className="product-images">
                {imagesUrl?.map((img,index)=>{
                    return <img key = {index} src = {img} alt = {name}/>
                })}
        </div>
        <div className ="product-info">
            <h3>{name}</h3>
            <p>{descriiption}</p>
            <span>{price}</span>
            <span classname={`${stockBadge}`}>{stocklabel}</span>
            </div>
            <div className="product-actions">
                <Button onClick={(e)=> addToCart(e)}>Agregar al carrito</Button>
                <Link to="/cart">Ver el carrito</Link>
        </div>
        </div>
);
}
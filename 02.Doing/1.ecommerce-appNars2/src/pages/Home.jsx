import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel";
import ProductCard from "../components/ProductCard/ProductCard";
import homeImages from "../data/homeImages.json";
import { fetchProducts } from "../services/productService";

export default function Home() {
  const [products, setProducts]=useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(()=>{
    const loadProducts = async()=>{
      try{
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    loadProducts();
  },[]);

  return (<div>
    <BannerCarousel banners={homeImages} />
    {loading ?
    <div style={{
      textAlign:"center",
      padding:"2rem",
      background:"var(--surface)",
      borderRadius:"18px",
      border: "1px solid var(--border)",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }}>Cargando Productos...</div>:
    products && products.length > 0 ?
    (<div className="grid grid-3">
      {products.map((product)=>{
        return <ProductCard key={product._id}
        product={product}/>
      })}
    </div>) :
    (<div>No hay productos en el catálogo</div>)}
  </div>);
}
import products from '../data/products.json';

export const fetchProducts = async () => {
  // Simular delay de red de 2-3 segundos
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 2000); // 2 segundos de delay
  });
};
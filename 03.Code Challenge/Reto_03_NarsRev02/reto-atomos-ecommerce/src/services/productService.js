import { products } from './../data/products';

export async function fetchProducts({ minDelayMs = 1200, maxDelayMs = 2400, failRate = 0 } = {}) {
  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
  const delay = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;
  await sleep(delay);
  if (failRate > 0 && Math.random() < failRate) throw new Error('Simulated network error');
  return Array.isArray(products) ? [...products] : products;
}

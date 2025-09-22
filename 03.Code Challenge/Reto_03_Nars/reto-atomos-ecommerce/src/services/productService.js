// src/services/productService.js
// Simula una API real con delay y (opcional) fallos controlados
import { products } from "../data/products";

/**
 * Obtiene productos simulando una llamada HTTP.
 * @param {Object} [opts]
 * @param {number} [opts.minDelay=1000]  - milisegundos
 * @param {number} [opts.maxDelay=3000]  - milisegundos
 * @param {number} [opts.failRate=0]     - 0 a 1 (porcentaje de error simulado)
 * @returns {Promise<Array>}
 */
export async function fetchProducts(opts = {}) {
  const { minDelay = 1000, maxDelay = 3000, failRate = 0 } = opts;
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < failRate;
      if (shouldFail) {
        reject(new Error("Error de red simulado"));
      } else {
        // Se puede clonar para imitar respuesta inmutable
        resolve([...products]);
      }
    }, delay);
  });
}

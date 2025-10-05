/**
 * Utilidades para manejar localStorage de forma segura
 */

/**
 * Obtiene un valor del localStorage y lo parsea como JSON
 * @param {string} key - Clave del localStorage
 * @param {any} defaultValue - Valor por defecto si no existe o hay error
 * @returns {any} - Valor parseado del localStorage o defaultValue
 */
export const getFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Guarda un valor en localStorage como string JSON
 * @param {string} key - Clave del localStorage
 * @param {any} value - Valor a guardar (será convertido a JSON)
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving to localStorage key "${key}":`, error);
  }
};

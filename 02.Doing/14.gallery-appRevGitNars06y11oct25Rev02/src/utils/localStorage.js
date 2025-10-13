/**
 * ============================================================================
 * LOCALSTORAGE - UTILIDADES DE ALMACENAMIENTO LOCAL
 * ============================================================================
 *
 * Funciones helper para manejar localStorage de forma segura.
 *
 * PROPÓSITO:
 * - Abstrae la API de localStorage
 * - Maneja JSON parse/stringify automáticamente
 * - Maneja errores gracefully (sin romper la app)
 * - Proporciona valores por defecto
 * - Centraliza lógica de storage
 *
 * CONCEPTOS CLAVE:
 * - localStorage API del navegador
 * - JSON serialization/deserialization
 * - Try/catch error handling
 * - Default values
 * - Console.warn para debugging
 *
 * LOCALSTORAGE API NATIVA:
 * localStorage.setItem(key, value)  // Solo acepta strings
 * localStorage.getItem(key)         // Devuelve string o null
 * localStorage.removeItem(key)      // Elimina item
 * localStorage.clear()              // Elimina todo
 *
 * LIMITACIONES:
 * - Solo strings (por eso necesitamos JSON.stringify/parse)
 * - ~5-10MB límite por dominio
 * - Síncrono (puede bloquear UI si son datos grandes)
 * - No expira automáticamente
 * - Accesible por JavaScript (no seguro para datos sensibles)
 *
 * USO EN LA APP:
 * import { getFromStorage, saveToStorage } from './utils/localStorage';
 * import { STORAGE_KEYS } from './utils/constants';
 *
 * // Guardar
 * saveToStorage(STORAGE_KEYS.ALBUMS, albums);
 *
 * // Cargar
 * const albums = getFromStorage(STORAGE_KEYS.ALBUMS, []);
 */

// ==========================================================================
// FUNCIÓN: OBTENER DESDE LOCALSTORAGE
// ==========================================================================

/**
 * Obtiene un valor del localStorage y lo parsea como JSON
 *
 * @param {string} key - Clave del localStorage (ej: "gallery-albums")
 * @param {any} defaultValue - Valor por defecto si no existe o hay error
 * @returns {any} - Valor parseado del localStorage o defaultValue
 *
 * FLUJO:
 * 1. Intenta obtener item de localStorage
 * 2. Si existe, parsearlo de JSON a objeto/array
 * 3. Si no existe, devolver defaultValue
 * 4. Si hay error, devolver defaultValue y loguear warning
 *
 * EJEMPLO DE USO:
 *
 * // Cargar álbumes (array por defecto)
 * const albums = getFromStorage(STORAGE_KEYS.ALBUMS, []);
 * → Si existe: devuelve array guardado
 * → Si no existe: devuelve []
 * → Si error: devuelve [] y muestra warning en consola
 *
 * // Cargar configuración (objeto por defecto)
 * const config = getFromStorage('app-config', { theme: 'light' });
 * → Si existe: devuelve objeto guardado
 * → Si no existe: devuelve { theme: 'light' }
 *
 * // Cargar contador (número por defecto)
 * const count = getFromStorage('visit-count', 0);
 * → Si existe: devuelve número guardado
 * → Si no existe: devuelve 0
 *
 * CASOS DE ERROR POSIBLES:
 *
 * 1. localStorage no disponible (navegador privado, deshabilitado):
 *    → try/catch captura error
 *    → Devuelve defaultValue
 *
 * 2. JSON inválido (datos corruptos):
 *    → JSON.parse() lanza error
 *    → try/catch captura error
 *    → Devuelve defaultValue
 *
 * 3. Quota excedida (localStorage lleno):
 *    → No aplica en GET, solo en SET
 *
 * 4. Key no existe:
 *    → getItem() devuelve null
 *    → Devuelve defaultValue
 */
export const getFromStorage = (key, defaultValue) => {
  try {
    // =======================================================================
    // PASO 1: OBTENER ITEM DE LOCALSTORAGE
    // =======================================================================

    /**
     * localStorage.getItem(key)
     *
     * CONCEPTO:
     * Obtiene el valor asociado a la key.
     *
     * RETORNA:
     * - String: Si la key existe
     * - null: Si la key no existe
     *
     * EJEMPLO:
     * localStorage.setItem('name', 'John');
     * localStorage.getItem('name');  // "John"
     * localStorage.getItem('age');   // null (no existe)
     *
     * NOTA:
     * Siempre devuelve string o null.
     * Por eso necesitamos JSON.parse para objetos/arrays.
     */
    const item = localStorage.getItem(key);

    // =======================================================================
    // PASO 2: PARSEAR JSON O DEVOLVER DEFAULT
    // =======================================================================

    /**
     * TERNARIO CONDICIONAL:
     * item ? JSON.parse(item) : defaultValue
     *
     * LÓGICA:
     * Si item existe (truthy):
     *   → Parsear de JSON string a JavaScript value
     * Si item no existe (null):
     *   → Devolver defaultValue
     *
     * JSON.PARSE():
     * Convierte string JSON a valor JavaScript.
     *
     * EJEMPLOS:
     * JSON.parse('123')                    → 123 (number)
     * JSON.parse('"hello"')                → "hello" (string)
     * JSON.parse('true')                   → true (boolean)
     * JSON.parse('[1,2,3]')                → [1, 2, 3] (array)
     * JSON.parse('{"name":"John"}')        → { name: "John" } (object)
     * JSON.parse('null')                   → null
     * JSON.parse('undefined')              → Error! (invalid JSON)
     *
     * POR QUÉ NECESITAMOS JSON:
     * localStorage solo guarda strings.
     * Si guardamos un array directamente:
     * localStorage.setItem('arr', [1, 2, 3]);
     * → Se convierte a "[object Array]" (inútil!)
     *
     * CORRECTO:
     * localStorage.setItem('arr', JSON.stringify([1, 2, 3]));
     * → Se guarda como "[1,2,3]"
     *
     * localStorage.getItem('arr');
     * → Devuelve "[1,2,3]" (string)
     *
     * JSON.parse(localStorage.getItem('arr'));
     * → Devuelve [1, 2, 3] (array)
     *
     * DEFAULTVALUE:
     * Si item es null (no existe), devuelve defaultValue.
     *
     * VENTAJA:
     * No necesitamos código extra para verificar si existe.
     * La función siempre devuelve un valor válido.
     */
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    // =======================================================================
    // MANEJO DE ERRORES
    // =======================================================================

    /**
     * CONCEPTO - Defensive Programming:
     * Anticipar y manejar errores sin romper la app.
     *
     * ERRORES POSIBLES:
     *
     * 1. localStorage no disponible:
     *    - Navegador en modo privado/incógnito
     *    - localStorage deshabilitado por usuario
     *    - Navegador antiguo sin soporte
     *    → Error: "localStorage is not defined"
     *
     * 2. JSON inválido:
     *    - Datos corruptos en localStorage
     *    - Alguien modificó manualmente en DevTools
     *    - Versión antigua incompatible
     *    → Error: "Unexpected token..."
     *
     * 3. Otros errores de seguridad:
     *    - CORS issues
     *    - SecurityError en iframes
     *
     * CONSOLE.WARN():
     * Muestra mensaje de warning en consola del navegador.
     *
     * DIFERENCIA CON CONSOLE.ERROR:
     * - console.error: Para errores críticos (rojo en consola)
     * - console.warn: Para advertencias (amarillo en consola)
     * - console.log: Para info general
     *
     * VENTAJA DE WARN:
     * Indica que algo salió mal pero no es crítico.
     * La app sigue funcionando con defaultValue.
     *
     * TEMPLATE LITERAL:
     * `Error reading localStorage key "${key}":`, error
     *
     * Incluye la key en el mensaje para facilitar debugging.
     *
     * EJEMPLO EN CONSOLA:
     * ⚠️ Error reading localStorage key "gallery-albums":
     *    SyntaxError: Unexpected token < in JSON at position 0
     *
     * RETURN DEFAULTVALUE:
     * Si hay error, devolver defaultValue.
     *
     * RESULTADO:
     * App sigue funcionando, aunque sin datos guardados.
     * Usuario puede empezar desde cero.
     *
     * GRACEFUL DEGRADATION:
     * La app funciona incluso si localStorage falla.
     * Mejor UX que mostrar error y romper.
     */
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// ==========================================================================
// FUNCIÓN: GUARDAR EN LOCALSTORAGE
// ==========================================================================

/**
 * Guarda un valor en localStorage como string JSON
 *
 * @param {string} key - Clave del localStorage (ej: "gallery-albums")
 * @param {any} value - Valor a guardar (será convertido a JSON)
 * @returns {void} - No devuelve nada
 *
 * FLUJO:
 * 1. Convierte value a string JSON
 * 2. Guarda en localStorage con la key
 * 3. Si hay error, loguearlo y continuar
 *
 * EJEMPLO DE USO:
 *
 * // Guardar array de álbumes
 * const albums = [
 *   { id: 1, title: 'Vacation 2024' },
 *   { id: 2, title: 'Family Photos' }
 * ];
 * saveToStorage(STORAGE_KEYS.ALBUMS, albums);
 *
 * // Guardar objeto de configuración
 * const config = { theme: 'dark', language: 'es' };
 * saveToStorage('app-config', config);
 *
 * // Guardar número
 * saveToStorage('visit-count', 42);
 *
 * // Guardar booleano
 * saveToStorage('first-visit', false);
 *
 * CASOS DE ERROR POSIBLES:
 *
 * 1. Quota excedida (localStorage lleno):
 *    → Error: "QuotaExceededError"
 *    → try/catch captura error
 *    → Muestra warning
 *    → No guarda (datos antiguos permanecen)
 *
 * 2. localStorage no disponible:
 *    → Error: "localStorage is not defined"
 *    → try/catch captura error
 *    → Muestra warning
 *
 * 3. Value no serializable:
 *    → JSON.stringify() puede fallar con:
 *      - Funciones
 *      - undefined
 *      - Símbolos
 *      - Referencias circulares
 *    → Error: "Converting circular structure to JSON"
 *    → try/catch captura error
 *    → Muestra warning
 *
 * NOTA IMPORTANTE:
 * Esta función NO valida si el guardado fue exitoso.
 * Solo intenta guardar y captura errores.
 *
 * SI NECESITAS CONFIRMACIÓN:
 * const saveToStorage = (key, value) => {
 *   try {
 *     localStorage.setItem(key, JSON.stringify(value));
 *     return true;  // Éxito
 *   } catch (error) {
 *     console.warn(...);
 *     return false; // Falló
 *   }
 * };
 *
 * // Uso:
 * if (saveToStorage(key, value)) {
 *   showMessage('Guardado correctamente');
 * } else {
 *   showMessage('Error al guardar');
 * }
 */
export const saveToStorage = (key, value) => {
  try {
    // =======================================================================
    // PASO 1: CONVERTIR VALUE A JSON STRING
    // =======================================================================

    /**
     * JSON.STRINGIFY(value)
     *
     * CONCEPTO:
     * Convierte valor JavaScript a string JSON.
     *
     * EJEMPLOS:
     * JSON.stringify(123)                          → "123"
     * JSON.stringify("hello")                      → '"hello"'
     * JSON.stringify(true)                         → "true"
     * JSON.stringify([1, 2, 3])                    → "[1,2,3]"
     * JSON.stringify({ name: "John", age: 30 })    → '{"name":"John","age":30}'
     * JSON.stringify(null)                         → "null"
     * JSON.stringify(undefined)                    → undefined (no válido!)
     *
     * VALORES ESPECIALES:
     *
     * 1. undefined:
     *    JSON.stringify({ a: undefined })  → "{}"
     *    Propiedad con undefined se omite.
     *
     * 2. Funciones:
     *    JSON.stringify({ fn: () => {} })  → "{}"
     *    Funciones se omiten.
     *
     * 3. Fechas:
     *    JSON.stringify(new Date())        → '"2024-10-09T..."'
     *    Se convierten a string ISO.
     *
     * 4. Referencias circulares:
     *    const obj = {};
     *    obj.self = obj;
     *    JSON.stringify(obj);  → Error!
     *
     * OPCIONES AVANZADAS (NO USADAS AQUÍ):
     * JSON.stringify(value, replacer, space)
     *
     * - replacer: Función para transformar valores
     * - space: Indentación (para pretty-print)
     *
     * EJEMPLO CON INDENTACIÓN:
     * JSON.stringify({ name: "John" }, null, 2)
     * → '{
     *      "name": "John"
     *    }'
     *
     * EN ESTE CÓDIGO:
     * Solo stringify básico.
     * Mínima representación (sin espacios).
     */

    /**
     * localStorage.setItem(key, stringValue)
     *
     * CONCEPTO:
     * Guarda un par key-value en localStorage.
     *
     * PARÁMETROS:
     * - key: String (identificador único)
     * - value: String (JSON.stringify lo convierte)
     *
     * COMPORTAMIENTO:
     * - Si key existe: Sobrescribe el valor
     * - Si key no existe: Crea nueva entrada
     * - Si quota excedida: Lanza error
     *
     * EJEMPLO:
     * localStorage.setItem('name', 'John');
     * localStorage.setItem('name', 'Jane');  // Sobrescribe
     * localStorage.getItem('name');  // "Jane"
     *
     * SINCRONÍA:
     * setItem es síncrono (bloquea el thread).
     * No es problema con datos pequeños (<100KB).
     * Para datos grandes, considerar IndexedDB.
     *
     * PERSISTENCIA:
     * Datos persisten indefinidamente hasta:
     * - Usuario borra datos del navegador
     * - localStorage.removeItem(key)
     * - localStorage.clear()
     * - Código lo sobrescribe
     *
     * NO EXPIRA:
     * A diferencia de cookies, localStorage no tiene expiración.
     * Si necesitas expiración, debes implementarla:
     *
     * const saveWithExpiry = (key, value, ttl) => {
     *   const item = {
     *     value: value,
     *     expiry: Date.now() + ttl,
     *   };
     *   localStorage.setItem(key, JSON.stringify(item));
     * };
     *
     * const getWithExpiry = (key) => {
     *   const itemStr = localStorage.getItem(key);
     *   if (!itemStr) return null;
     *   const item = JSON.parse(itemStr);
     *   if (Date.now() > item.expiry) {
     *     localStorage.removeItem(key);
     *     return null;
     *   }
     *   return item.value;
     * };
     */
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // =======================================================================
    // MANEJO DE ERRORES
    // =======================================================================

    /**
     * CONCEPTO - Silent Failure:
     * No lanzar error hacia arriba, solo loguear warning.
     *
     * VENTAJA:
     * App sigue funcionando aunque no pueda guardar.
     * Usuario puede usar la app, aunque datos no persistan.
     *
     * ALTERNATIVA - Throw Error:
     * catch (error) {
     *   console.warn(...);
     *   throw error;  // Re-lanzar error
     * }
     *
     * DESVENTAJA:
     * Código que llama saveToStorage debe manejar el error.
     * Más complejo.
     *
     * DECISIÓN ACTUAL:
     * Silent failure → Simplicidad.
     * Para app de galería, no es crítico si falla guardado ocasional.
     *
     * CONSOLE.WARN():
     * Mismo patrón que getFromStorage.
     * Logea warning para debugging.
     *
     * EJEMPLO EN CONSOLA:
     * ⚠️ Error saving to localStorage key "gallery-albums":
     *    QuotaExceededError: Failed to execute 'setItem' on 'Storage'
     *
     * ACCIÓN DEL USUARIO:
     * Si ve este warning frecuentemente:
     * - Limpiar localStorage en DevTools
     * - Eliminar datos de sitios que no usa
     * - Usar menos datos en la app
     *
     * MEJORA POSIBLE:
     * Mostrar mensaje al usuario:
     * if (error.name === 'QuotaExceededError') {
     *   showToast('Error: Almacenamiento lleno. Por favor elimina álbumes antiguos.');
     * }
     */
    console.warn(`Error saving to localStorage key "${key}":`, error);
  }
};

// ==========================================================================
// FUNCIONES ADICIONALES (NO IMPLEMENTADAS)
// ==========================================================================

/**
 * EXTENSIONES POSIBLES:
 *
 * // Eliminar un item
 * export const removeFromStorage = (key) => {
 *   try {
 *     localStorage.removeItem(key);
 *   } catch (error) {
 *     console.warn(`Error removing localStorage key "${key}":`, error);
 *   }
 * };
 *
 * // Limpiar todo
 * export const clearStorage = () => {
 *   try {
 *     localStorage.clear();
 *   } catch (error) {
 *     console.warn('Error clearing localStorage:', error);
 *   }
 * };
 *
 * // Verificar si key existe
 * export const hasKey = (key) => {
 *   return localStorage.getItem(key) !== null;
 * };
 *
 * // Obtener todas las keys
 * export const getAllKeys = () => {
 *   return Object.keys(localStorage);
 * };
 *
 * // Tamaño usado (aproximado)
 * export const getStorageSize = () => {
 *   let total = 0;
 *   for (let key in localStorage) {
 *     if (localStorage.hasOwnProperty(key)) {
 *       total += localStorage[key].length + key.length;
 *     }
 *   }
 *   return total; // bytes
 * };
 *
 * // Migrar datos (cambiar estructura)
 * export const migrateStorage = (oldKey, newKey, transform) => {
 *   const oldData = getFromStorage(oldKey, null);
 *   if (oldData) {
 *     const newData = transform(oldData);
 *     saveToStorage(newKey, newData);
 *     removeFromStorage(oldKey);
 *   }
 * };
 *
 * ============================================================================
 */

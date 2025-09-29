
# ⚡ Reto Semana 3 — Carga asíncrona (mock)

## 🎯 Objetivo

Implementar carga asíncrona de productos simulando una API real con **async/await** y **useEffect**. Este reto te enseñará a manejar estados de carga y crear una mejor experiencia de usuario.

---

## 📋 Alcance del Proyecto

### 🔄 Servicios Asíncronos

- **services/productService.js**: Función que simula una API con setTimeout
- **Estado de carga**: Loading, success y error states
- **Render condicional**: Mostrar diferentes UI según el estado

### 📱 Funcionalidades

- ⏳ Mensaje "Cargando..." mientras se obtienen los datos
- ✅ Renderizado de productos una vez cargados
- ❌ Manejo de errores (opcional)

---

## ✅ Requisitos Técnicos

### 🔧 1. Servicio de Productos

- [ ] Archivo `src/services/productService.js`
- [ ] Función `fetchProducts()` asíncrona
- [ ] Simulación de delay con `setTimeout` (1-3 segundos)
- [ ] Retorna el array de productos mock

### 🏠 2. Componente Home Actualizado

- [ ] Estado `loading` para controlar la carga
- [ ] Estado `products` para almacenar los datos
- [ ] useEffect para ejecutar la carga al montar el componente
- [ ] Render condicional basado en el estado de loading

### 🎨 3. UI/UX

- [ ] Mensaje de "Cargando..." visible y centrado
- [ ] Transición suave entre estados
- [ ] Mantener el diseño responsive

---

## 📤 Entregables

### 🚀 Archivos Requeridos

- [ ] `src/services/productService.js` - Servicio asíncrono implementado
- [ ] `src/pages/Home.jsx` - Componente actualizado con async loading
- [ ] Screenshot del estado de carga en funcionamiento

### 🎯 Funcionalidad Mínima

- [ ] La página muestra "Cargando..." al iniciar
- [ ] Después de 2-3 segundos se muestran los productos
- [ ] No hay errores en la consola
- [ ] La UI no se bloquea durante la carga

---

## 🔍 Criterios de Revisión

### ✅ Implementación Técnica

- [ ] **useEffect correcto**: Con array de dependencias vacío `[]`
- [ ] **async/await**: Uso apropiado sin bloquear la UI
- [ ] **Estados de carga**: Manejo limpio de loading/loaded
- [ ] **Código limpio**: Sin console.logs o código comentado

### 🎨 Experiencia de Usuario

- [ ] **Loading visible**: El mensaje de carga es claro
- [ ] **Transiciones suaves**: Sin saltos bruscos en la UI
- [ ] **Responsive**: Funciona bien en móvil y desktop

### 📱 Buenas Prácticas

- [ ] **Separation of concerns**: Lógica de servicio separada del componente
- [ ] **Error handling**: Manejo básico de errores (try/catch)
- [ ] **Performance**: Sin re-renders innecesarios

---

## 💡 Pistas y Guía de Implementación

### 🔧 Paso 1: Crear el Servicio

**Pista para `src/services/productService.js`:**
```javascript
// Necesitas importar tus productos existentes
// Crear una función async que retorne una Promise
// Usar setTimeout para simular delay de red
// Resolver la Promise con los datos después del delay
```

### 🏠 Paso 2: Actualizar Home Component

**Pistas para el estado:**
```javascript
// ¿Qué hooks necesitas para manejar datos asincrónicos?
// ¿Cómo sabes si los datos están cargando?
// ¿Dónde guardas los productos una vez cargados?
```

**Pistas para useEffect:**
```javascript
// ¿Cuándo debe ejecutarse la carga de datos?
// ¿Qué dependencias necesita el useEffect?
// ¿Cómo llamas una función async dentro de useEffect?
```

**Pistas para render condicional:**
```javascript
// ¿Qué mostrar mientras loading es true?
// ¿Cómo cambiar entre loading y contenido?
// ¿Dónde poner el mensaje de carga?
```

### 🎨 Paso 3: Estilos de Loading

**Pistas para CSS:**
```css
/* ¿Cómo centrar contenido vertical y horizontalmente? */
/* ¿Qué altura mínima para que se vea bien? */
/* ¿Cómo hacer el texto más llamativo? */
```

---

## 🧠 Conceptos Clave a Investigar

### 📚 Antes de Empezar, Estudia:

- **Promise vs async/await**: ¿Cuál es más legible?
- **useEffect dependency array**: ¿Qué pasa con `[]` vacío?
- **Estados de carga**: ¿loading, success, error?
- **Conditional rendering**: ¿early return vs ternario?

### 🔍 Preguntas para Reflexionar:

1. ¿Por qué separar la lógica de datos en un servicio?
2. ¿Qué pasa si no manejo el estado de loading?
3. ¿Cómo mejora la UX mostrar un estado de carga?
4. ¿Qué errores pueden ocurrir con datos asincrónicos?

---

## 🌟 Extra (Opcional)

Si terminas rápido, investiga estos conceptos:

### 🔥 Mejoras Avanzadas

- [ ] **Simulación de errores**: ¿Cómo manejar un 10% de fallos?
- [ ] **Retry functionality**: ¿Botón para reintentar?
- [ ] **Loading skeleton**: ¿Placeholders en lugar de texto?

### 🎨 Mejoras Visuales

- [ ] **Spinner animado**: ¿CSS loading spinner?
- [ ] **Fade transitions**: ¿Animaciones suaves?
- [ ] **Progress indicator**: ¿Barra de progreso?

---

## 🚀 Testing y Validación

### ⚡ Comandos para Probar

```bash
# Iniciar el proyecto
npm start

# Verificar que no hay errores
npm run build
```

### 🔍 Lista de Verificación

1. **Abrir** `http://localhost:3000`
2. **Observar** que aparece "Cargando..." primero
3. **Esperar** 2-3 segundos
4. **Verificar** que aparecen los productos
5. **Refresh** la página y repetir
6. **Revisar** consola (no errores)

---

## 🆘 Ayuda y Recursos

### ❌ Si Te Atascas, Verifica:

- **Imports**: ¿Importaste useState y useEffect?
- **Sintaxis**: ¿La función async está bien escrita?
- **Estados**: ¿Inicializaste loading en true?
- **Dependencias**: ¿useEffect tiene array vacío []?

### 💡 Tips de Debug

- Usa `console.log` para ver el flujo de estados
- Revisa las Dev Tools para errores
- Prueba diferentes tiempos de delay

### 🔗 Recursos Útiles

- [React useEffect Hook](https://react.dev/reference/react/useEffect)
- [Async/Await Guide](https://javascript.info/async-await)
- [Promise Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

---

## 🎯 Objetivos de Aprendizaje

Al completar este reto habrás dominado:

- ✅ **Async/await**: Manejar operaciones asíncronas en React
- ✅ **useEffect**: Hook para efectos secundarios
- ✅ **Estado de carga**: Patrón loading/success/error
- ✅ **Servicios**: Separar lógica de datos de componentes
- ✅ **UX**: Crear mejor experiencia durante cargas

---

<div align="center">

**⏰ Tiempo estimado:** 3-4 horas
**📚 Dificultad:** ⭐⭐⭐ Intermedio
**🎯 Enfoque:** Async/await y useEffect

---

**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>
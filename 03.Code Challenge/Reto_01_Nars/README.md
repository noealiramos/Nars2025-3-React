# 🚀 Reto Semana 1 — Átomos que venden

## 🎯 Objetivo

Crear los componentes base de un ecommerce aplicando **Atomic Design** con **React**. Este reto te permitirá aprender a crear componentes reutilizables y trabajar con arrays de objetos para mostrar datos dinámicos.

---

## 📋 Alcance del Proyecto

### 🔬 Componentes Atómicos (3)

```
src/components/
├── Button.jsx
├── Input.jsx
├── Badge.jsx
└── ProductCard.jsx
```

### 🧬 Componente Molecular (1)

- **ProductCard**: Combina los átomos Button, Badge y elementos básicos para crear una tarjeta de producto

### 📋 Datos de Ejemplo

```
src/
├── data/
│   └── products.js
└── components/
    ├── Button.jsx
    ├── Input.jsx
    ├── Badge.jsx
    └── ProductCard.jsx
```

---

## ⚙️ Requisitos Técnicos

### 🛠️ Stack Tecnológico

- **React 19+** (Create React App)
- **CSS** para estilos (archivos .css normales)
- **JavaScript** moderno (ES6+)

### 🚀 Creación del Proyecto

```bash
# Crear nuevo proyecto con Create React App
npx create-react-app reto-atomos-ecommerce

# Navegar al directorio
cd reto-atomos-ecommerce

# Iniciar servidor de desarrollo
npm start
```

### 📱 Especificaciones de Componentes

#### Button (Átomo)

```jsx
function Button({ children, onClick, disabled, variant }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Uso del componente:
<Button variant="primary" onClick={() => alert("Clicked!")}>
  Agregar al carrito
</Button>;
```

#### Input (Átomo)

```jsx
function Input({ label, type, value, onChange, placeholder }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

// Uso del componente:
<Input
  label="Buscar productos"
  type="text"
  placeholder="Escribe aquí..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>;
```

#### Badge (Átomo)

```jsx
function Badge({ text, variant }) {
  return (
    <span className={`badge badge-${variant}`}>
      {text}
    </span>
  );
}

// Uso del componente:
<Badge text="En stock" variant="success" />
<Badge text="Descuento" variant="warning" />
```

#### ProductCard (Molécula)

```jsx
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <Badge
        text={product.stock > 0 ? "En stock" : "Agotado"}
        variant={product.stock > 0 ? "success" : "error"}
      />
      <Button
        variant="primary"
        onClick={() => alert(`Agregado: ${product.name}`)}
        disabled={product.stock === 0}
      >
        Agregar al carrito
      </Button>
    </div>
  );
}
```

### 📋 Datos de Ejemplo

Crea un archivo `src/data/products.js` con un array de productos:

```javascript
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://es.digitaltrends.com/wp-content/uploads/2023/09/apple-iphone-15-vs-iphone-15-pro.jpg",
    stock: 5,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 899,
    image: "https://via.placeholder.com/300x200?text=Samsung+S24",
    stock: 0,
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 1299,
    image: "https://via.placeholder.com/300x200?text=MacBook+Air",
    stock: 3,
  },
  ...
];
```

### 🏠 Página Principal (App.js)

```jsx
import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 Mi Tienda Online</h1>
        <p>Reto de Componentes Atómicos</p>
      </header>

      <main className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

export default App;
```

---

## 🎨 Estilos CSS Básicos

Agrega estos estilos básicos a tu `src/App.css`:

```css
/* App.css */
.App {
  text-align: center;
  padding: 20px;
}

.App-header {
  margin-bottom: 40px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilos para Button */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilos para Badge */
.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-error {
  background-color: #dc3545;
  color: white;
}

.badge-warning {
  background-color: #ffc107;
  color: black;
}

/* Estilos para ProductCard */
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
}

.product-card h3 {
  margin: 10px 0;
  color: #333;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin: 10px 0;
}

/* Estilos para Input */
.input-group {
  margin: 10px 0;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}
```

---

## 📦 Entregables

### 📁 Estructura Final del Proyecto

```
reto-atomos-ecommerce/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Button.jsx ok
│   │   ├── Button.css ok
│   │   ├── Input.jsx ok 
│   │   ├── Input.css ok 
│   │   ├── Badge.jsx
│   │   ├── Badge.css
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.css
│   ├── data/
│   │   └── products.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── package-lock.json
└── README.md
```

### 🎯 Lo que debes entregar

1. **4 componentes** funcionando correctamente
2. **Array de productos** con al menos 3 elementos
3. **Página principal** que muestre todas las tarjetas
4. **Estilos CSS** básicos aplicados
5. **Funcionalidad de click** en los botones (puede ser un alert simple)

### 📋 Estructura Adicional Recomendada

Si quieres organizarte mejor, puedes seguir esta estructura más avanzada:

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── index.js
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Input/
│   │   │   ├── index.js
│   │   │   ├── Input.jsx
│   │   │   └── Input.css
│   │   └── Badge/
│   │       ├── index.js
│   │       ├── Badge.jsx
│   │       └── Badge.css
│   └── molecules/
│       └── ProductCard/
│           ├── index.js
│           ├── ProductCard.jsx
│           └── ProductCard.css
├── data/
│   └── products.js
├── styles/
│   ├── globals.css
│   └── variables.css
└── utils/
    └── helpers.js
```

**Nota**: Para este primer reto, usa la estructura simple. La estructura avanzada es opcional para quienes quieran practicar organización de archivos.

---

## ✅ Criterios de Evaluación

### 📝 Funcionalidad Básica

- [ ] Los 4 componentes están creados y funcionan
- [ ] Los componentes reciben props correctamente
- [ ] ProductCard utiliza los componentes Button y Badge
- [ ] Los datos se muestran desde el array de productos
- [ ] Los botones responden a eventos (onClick)

### 🎨 Presentación

- [ ] La página se ve ordenada y presentable
- [ ] Los estilos CSS están aplicados
- [ ] Las imágenes se muestran correctamente
- [ ] El layout es responsivo (se ve bien en móvil y desktop)

### 💻 Código Limpio

- [ ] Nombres de componentes y variables son descriptivos
- [ ] El código está bien organizado en carpetas
- [ ] No hay errores en la consola
- [ ] Los componentes son reutilizables

---

## 🚀 Instalación y Ejecución

### 📋 Prerequisitos

- **Node.js LTS** (versión 20.x o superior)
- **npm** (incluido con Node.js)

### ⚡ Pasos para empezar

1. **Crear el proyecto**

```bash
npx create-react-app reto-atomos-ecommerce
cd reto-atomos-ecommerce
```

2. **Iniciar el servidor de desarrollo**

```bash
npm start
```

3. **Ver tu proyecto**
   - Abre tu navegador en `http://localhost:3000`
   - ¡Tu aplicación estará corriendo!

### 📱 Comandos útiles

```bash
npm start          # Iniciar servidor de desarrollo
npm run build      # Crear versión de producción
npm test           # Ejecutar pruebas (opcional)
```

---

## 🎁 Extras Opcionales

Si terminas rápido, puedes intentar estos desafíos adicionales:

### 🎨 Mejoras Visuales

- [ ] Agrega más variantes de colores para los botones
- [ ] Implementa efectos hover más elaborados
- [ ] Agrega iconos a los badges

### 🔧 Funcionalidades

- [ ] Contador en el botón para mostrar cantidad agregada
- [ ] Filtro para mostrar solo productos en stock
- [ ] Buscador de productos por nombre

### 📱 Responsividad

- [ ] Mejora la vista en tablets
- [ ] Agrega animaciones suaves
- [ ] Implementa un diseño diferente para móviles

---

## 📚 Recursos de Ayuda

### 📖 Documentación

- [Documentación oficial de React](https://es.react.dev/)
- [Create React App](https://create-react-app.dev/)
- [Guía de CSS](https://developer.mozilla.org/es/docs/Web/CSS)

### 🎨 Inspiración

- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [Ejemplos de tarjetas de producto](https://dribbble.com/tags/product_card)

### 🆘 Si necesitas ayuda

- Lee los errores en la consola del navegador (F12)
- Revisa que todos los imports estén correctos
- Verifica que los nombres de archivos y componentes coincidan
- Pregunta en clase si algo no funciona

---

## 📋 Reglas Generales para Todos los Retos

### 🛠️ Tecnologías Permitidas

- **React 18+** con Create React App
- **CSS** puro (sin frameworks como Bootstrap o Tailwind)
- **JavaScript** moderno (ES6+)
- **Node.js LTS** (versión 20.x)

### 📝 Estándares de Código

- **Componentes funcionales** solamente
- **Nombres descriptivos** para variables y funciones
- **Archivos organizados** en carpetas lógicas
- **Código sin errores** en la consola

### 📤 Proceso de Entrega

- **Desarrollo en clase**: Trabaja durante las horas de laboratorio
- **Revisión en vivo**: Muestra tu avance al instructor
- **Sin repositorios externos**: Todo se trabaja localmente
- **Presentación grupal**: Comparte tu resultado con la clase

### 📏 Evaluación

- ✅ **COMPLETADO**: Cumple todos los requisitos básicos
- ⭐ **EXCELENTE**: Incluye extras opcionales
- ❌ **INCOMPLETO**: Faltan elementos esenciales

### 🎯 Consejos de Éxito

- **Empieza simple**: Haz que funcione primero, luego mejóralo
- **Prueba frecuentemente**: Guarda y recarga el navegador seguido
- **Pide ayuda**: Si te atoras más de 15 minutos, pregunta
- **Comparte conocimiento**: Ayuda a tus compañeros

---

## 🎯 Documentación de Decisiones

> **Al terminar el reto, documenta aquí tus decisiones técnicas**

### 🔧 ¿Qué fue lo más difícil?

- [ ] Escribe 2-3 oraciones sobre los retos que enfrentaste

### 🎨 ¿Qué estilo elegiste y por qué?

- [ ] Explica las decisiones de diseño que tomaste

### 💡 ¿Qué aprendiste nuevo?

- [ ] Menciona 2-3 conceptos nuevos que descubriste

### 🔮 ¿Qué mejorarías?

- [ ] Si tuvieras más tiempo, ¿qué agregarías?

---

**🎉 ¡Felicidades por completar tu primer reto de React! 🚀**

# 🏗️ Reto Semana 2 — Arma el esqueleto

## 🎯 Objetivo

Configurar el esqueleto del proyecto y estructura de carpetas para escalar de manera eficiente y organizada.

---

## 📋 Alcance del Proyecto

- ⚛️ **Proyecto base** con Create React App (CRA)
- 📁 **Estructura de carpetas**: `components/`, `pages/`, `data/`, `services/`, `context/`, `layout/`
- 🏠 **Página Home** que muestra productos usando datos mock
- 🎨 **Componentes reutilizables** siguiendo principios de Atomic Design

---

## ✅ Requisitos Técnicos

### **📦 1. Estructura de Datos**

- [ ] Archivo `src/data/products.js` con **mínimo 6 productos**
- [ ] Cada producto debe incluir: `id`, `name`, `price`, `image`, `description`

### **🏠 2. Página Principal**

- [ ] Componente `Home` que renderiza lista de productos
- [ ] Uso del componente `ProductCard` para mostrar cada producto
- [ ] Integración con datos del archivo mock

### **📁 3. Estructura de Carpetas**

```
src/
├── components/     # Componentes reutilizables (OK)
├── pages/         # Páginas principales (OK)
├── layout/        # Componentes de layout (Header, Footer, Layout) (OK)
├── data/          # Datos mock y constantes (OK)
├── services/      # Servicios y APIs  (OK)
└── context/       # Context providers  (OK)
```

---

## 📤 Entregables

### **🚀 Proyecto Funcional**

- [ ] Proyecto compilando sin errores
- [ ] Navegación funcional a la página Home
- [ ] Renderizado correcto de productos

### **📸 Documentación Visual**

- [ ] Captura de pantalla del Home en el README del proyecto
- [ ] Descripción breve de la funcionalidad implementada

---

## 🔍 Criterios de Revisión

### **✅ Calidad del Código**

- [ ] **Estructura limpia y consistente** en todas las carpetas
- [ ] **Imports relativos claros** y bien organizados
- [ ] **Sin warnings en consola** del navegador o terminal

### **🏗️ Arquitectura**

- [ ] Separación correcta de responsabilidades
- [ ] Componentes reutilizables y bien estructurados
- [ ] Nomenclatura consistente en archivos y componentes

### **📱 Funcionalidad**

- [ ] Renderizado correcto de todos los productos
- [ ] Responsive design básico
- [ ] Performance adecuado (sin re-renders innecesarios)

---

## 🌟 Extra (Opcional)

### **🎨 Layout Mejorado**

- [ ] **Header básico** con navegación en `src/layout/Header.jsx`
- [ ] **Footer** con información del proyecto en `src/layout/Footer.jsx`
- [ ] **Layout wrapper** en `src/layout/Layout.jsx` que contenga Header + contenido + Footer

### **💡 Mejoras Adicionales**

- [ ] Loading states para simulación de carga
- [ ] Hover effects en ProductCard
- [ ] Grid responsivo para diferentes tamaños de pantalla

---

## 📝 Estructura de Ejemplo

### **🗂️ Archivos Principales**

```
src/
├── components/
│   └── ProductCard/
│       ├── ProductCard.jsx
│       └── ProductCard.css
├── pages/
│   └── Home/
│       ├── Home.jsx
│       └── Home.css
├── layout/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Layout.jsx
├── data/
│   └── products.js
├── services/
│   └── .gitkeep
└── context/
    └── .gitkeep
```

### **📊 Ejemplo de Datos Mock**

```javascript
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Producto 1",
    price: 29.99,
    image: "https://via.placeholder.com/300x200",
    description: "Descripción del producto 1",
  },
  // ... más productos
];
```

### **🏗️ Ejemplo de Layout**

```jsx
// src/layout/Layout.jsx
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
```

---

## 🎯 Objetivos de Aprendizaje

- **📁 Organización**: Crear una estructura escalable de proyecto
- **🔄 Reutilización**: Implementar componentes reutilizables
- **📊 Manejo de datos**: Trabajar con datos mock estructurados
- **🎨 UI/UX**: Aplicar principios básicos de diseño
- **🏗️ Arquitectura**: Establecer bases sólidas para el crecimiento del proyecto

---

## 🚀 Próximos Pasos

Una vez completado este reto:

1. 📋 **Revisa** que todos los criterios estén cumplidos
2. 📸 **Documenta** tu progreso con capturas
3. 🔍 **Prueba** la funcionalidad en diferentes dispositivos
4. 🚀 **Prepárate** para el Reto de la Semana 3

---

<div align="center">

**⏰ Tiempo estimado:** 4-6 horas
**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>

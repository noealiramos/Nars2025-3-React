# ⛑️ Reto Semana 4 — Props con casco + Layout Makeover

## 🎯 Objetivo

Aprender a **validar props con PropTypes** mientras mejoras el layout de tu Gallery App para que coincida con los mockups de diseño. Este reto combina robustez de código con mejores interfaces de usuario.

---

## 📋 Alcance del Proyecto

### 🔍 Parte A: PropTypes (Robustez)
- **Validación de props** en todos los componentes
- **Documentación automática** mediante tipos
- **Debugging mejorado** con errores claros

### 🎨 Parte B: Layout Makeover (UX)
- **StatusBar inteligente** que muestra información relevante
- **AlbumCard mejorado** con grid de imágenes
- **Navegación visual** que refleje el estado actual

---

## 🔧 Step-by-Step: Cómo Declarar PropTypes

### 📝 Paso 1: Instalación y Import

```bash
# Verifica si prop-types está instalado
npm list prop-types

# Si no está instalado:
npm install prop-types
```

```javascript
// Al inicio de tu componente
import PropTypes from 'prop-types';
```

### 📝 Paso 2: Sintaxis Básica

```javascript
// Después de tu componente, antes del export
function MiComponente({ nombre, edad, activo }) {
  return <div>{nombre}</div>;
}

// Declaración de PropTypes
MiComponente.propTypes = {
  nombre: PropTypes.string.isRequired,
  edad: PropTypes.number,
  activo: PropTypes.bool.isRequired
};

export default MiComponente;
```

### 📝 Paso 3: Tipos Básicos Disponibles

```javascript
ComponenteEjemplo.propTypes = {
  // Texto
  titulo: PropTypes.string,
  descripcion: PropTypes.string.isRequired,

  // Números
  cantidad: PropTypes.number,
  precio: PropTypes.number.isRequired,

  // Booleanos
  visible: PropTypes.bool,
  activo: PropTypes.bool.isRequired,

  // Funciones
  onClick: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,

  // Arrays
  items: PropTypes.array,
  tags: PropTypes.array.isRequired,

  // Objetos
  usuario: PropTypes.object,
  config: PropTypes.object.isRequired
};
```

### 📝 Paso 4: isRequired vs Opcional

```javascript
// ¿Cuándo usar .isRequired?
MiComponente.propTypes = {
  // REQUERIDO: El componente no funciona sin esto
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,

  // OPCIONAL: Tiene valor por defecto o es opcional
  className: PropTypes.string,
  disabled: PropTypes.bool
};
```

---

## ✅ Requisitos Técnicos

### 🔧 1. PropTypes en Componentes Base

**Layout System:**
- [ ] `src/layout/Layout.jsx` - Validar `children`, `currentView`, `onViewChange`
- [ ] `src/layout/NavBar.jsx` - Validar props de navegación
- [ ] `src/layout/StatusBar.jsx` - Validar `currentView` y props adicionales

**Atomic Components:**
- [ ] `src/atoms/DeleteButton.jsx` - Props de acción (`onClick`, `disabled`)
- [ ] `src/atoms/PlayButton.jsx` - Props de reproducción (`onClick`, `isPlaying`)
- [ ] `src/atoms/TagButton.jsx` - Props de etiqueta (`label`, `onClick`)

### 🎨 2. Mejoras de Layout

**StatusBar Enhancement:**
- [ ] Mostrar contador correcto según vista actual
- [ ] Agregar información contextual (ej: "3 albums, 12 fotos total")
- [ ] Estados de "vacío" cuando no hay contenido

**NavBar Visual Feedback:**
- [ ] Botones disabled deben verse diferentes
- [ ] Estado activo claro para vista actual
- [ ] Pistas visuales para acciones disponibles

### 🧩 3. Component Enhancement

**AlbumCard Makeover:**
- [ ] Grid de imágenes como en mockup
- [ ] PropTypes para validar props básicas
- [ ] Manejo de albums vacíos

**PhotoCard Polish:**
- [ ] Validación de props de imagen
- [ ] Estados de carga/error para imágenes
- [ ] Layout mejorado según mockup

---

## 💡 Pistas de Implementación

### 🔧 StatusBar Inteligente

**Pistas para mejorar StatusBar:**
```javascript
// ¿Qué PropTypes necesita StatusBar?
// currentView: string requerido
// ¿Qué más podría recibir como props?

// ¿Cómo calcular información contextual?
// ¿Qué debería mostrar en vista 'photos' vs 'albums'?
// ¿Cómo manejar vistas de "edición"?
```

### 🎨 AlbumCard con Grid

**Pistas para grid de imágenes:**
```javascript
// ¿Qué props necesita AlbumCard?
// album: object requerido
// onClick: function opcional

// ¿Cómo mostrar las primeras 4 imágenes de un album?
// ¿Qué hacer si un album tiene menos de 4 imágenes?
// ¿Cómo acceder a album.photos o album.images?
```

### 🧩 Botones Atómicos

**Pistas para componentes atómicos:**
```javascript
// DeleteButton podría recibir:
// onClick: PropTypes.func.isRequired
// disabled: PropTypes.bool

// PlayButton podría recibir:
// onClick: PropTypes.func.isRequired
// isPlaying: PropTypes.bool

// TagButton podría recibir:
// label: PropTypes.string.isRequired
// onClick: PropTypes.func
```

---

## 📤 Entregables

### 🚀 Archivos Modificados

**PropTypes Implementation:**
- [ ] `src/layout/Layout.jsx` - Con PropTypes completos
- [ ] `src/layout/NavBar.jsx` - Validación de navegación
- [ ] `src/layout/StatusBar.jsx` - Props contextuales
- [ ] Todos los componentes en `src/atoms/` y `src/molecules/`

**Layout Improvements:**
- [ ] StatusBar muestra información contextual correcta
- [ ] AlbumCard renderiza grid de imágenes
- [ ] NavBar con feedback visual mejorado

### 🎯 Funcionalidad Mínima

- [ ] **PropTypes funcionando**: Sin warnings en uso normal
- [ ] **Layout mejorado**: Coincide mejor con mockups
- [ ] **Navegación visual**: Estados claros y feedback
- [ ] **Información contextual**: StatusBar útil e informativo

---

## 🔍 Criterios de Revisión

### ✅ Código (PropTypes)

- [ ] **Validación completa**: Todos los componentes tienen PropTypes
- [ ] **Tipos correctos**: string, number, func, bool, array, object
- [ ] **Required vs Optional**: Diferenciación clara
- [ ] **Console limpia**: Sin warnings en uso normal

### 🎨 UX (Layout)

- [ ] **StatusBar útil**: Información relevante por vista
- [ ] **Visual feedback**: Estados activos/disabled claros
- [ ] **Grid de imágenes**: AlbumCard como en mockup
- [ ] **Consistencia**: Layout coherente entre vistas

### 📱 Robustez

- [ ] **Manejo de errores**: Props faltantes no rompen la app
- [ ] **Estados vacíos**: Mensajes apropiados sin contenido
- [ ] **Escalabilidad**: Fácil agregar nuevas vistas/componentes

---

## 🧠 Conceptos Clave a Investigar

### 📚 PropTypes Básicos:

- **string vs string.isRequired**: ¿Cuándo es obligatorio vs opcional?
- **func para callbacks**: ¿Cómo validar funciones onClick, onSubmit?
- **bool para estados**: ¿Validar estados como disabled, active?
- **array vs object**: ¿Cuándo usar cada tipo?

### 🎨 Layout Patterns:

- **Conditional rendering**: ¿Cuándo mostrar qué información?
- **Dynamic classes**: ¿Estilos basados en props?
- **Component composition**: ¿Cómo combinar componentes efectivamente?

---

## 🌟 Extra (Opcional)

### 🔥 PropTypes Adicionales

- [ ] **PropTypes.arrayOf(PropTypes.string)**: Arrays de un tipo específico
- [ ] **PropTypes.oneOf(['option1', 'option2'])**: Props con valores específicos
- [ ] **defaultProps**: Definir valores por defecto

### 🎨 UX Enhancements

- [ ] **Loading states**: Indicadores de carga simulados
- [ ] **Empty states**: Mensajes para contenido vacío
- [ ] **Hover effects**: Mejores interacciones de botones

---

## 🚀 Guía Paso a Paso

### 📋 Checkpoint 1: PropTypes Base (45 min)
1. **Instalar prop-types** si no está disponible
2. **Agregar PropTypes a Layout.jsx** siguiendo el step-by-step
3. **Probar warnings** pasando props incorrectas
4. **Aplicar a NavBar y StatusBar**

### 🎨 Checkpoint 2: StatusBar Inteligente (45 min)
1. **Analizar mockup** - ¿qué información mostrar por vista?
2. **Implementar lógica** de contadores contextuales
3. **Agregar PropTypes** para cualquier nueva prop necesaria

### 🧩 Checkpoint 3: Componentes Atómicos (45 min)
1. **DeleteButton PropTypes** - onClick y disabled
2. **PlayButton PropTypes** - onClick e isPlaying
3. **TagButton PropTypes** - label y onClick
4. **Probar cada componente** con props correctas e incorrectas

### ✨ Checkpoint 4: AlbumCard Grid (45 min)
1. **Analizar datos** - estructura de albums y photos
2. **Implementar grid** de primeras 4 imágenes
3. **Agregar PropTypes** para validar album object
4. **Manejar casos edge** (albums vacíos, pocas imágenes)

### 🔍 Checkpoint 5: Testing & Polish (30 min)
1. **Verificar consola limpia** en uso normal
2. **Probar warnings** con props incorrectas
3. **Verificar layout** coincide con mockup
4. **Documentar** cualquier decisión importante

---

## 🆘 Ayuda y Debug

### ❌ PropTypes Troubleshooting:

```javascript
// ❌ Error común: Import incorrecto
import propTypes from 'prop-types'; // Minúscula

// ✅ Correcto:
import PropTypes from 'prop-types'; // Mayúscula

// ❌ Error común: Sintaxis incorrecta
MiComponente.PropTypes = {} // Mayúscula

// ✅ Correcto:
MiComponente.propTypes = {} // Minúscula
```

### 🎨 Layout Troubleshooting:

- **StatusBar no actualiza**: ¿Pasaste currentView como prop?
- **Grid no se ve**: ¿Tienes datos de prueba con imágenes?
- **Warnings no aparecen**: ¿Estás en modo development?

---

## 🎯 Objetivos de Aprendizaje

Al completar este reto habrás dominado:

- ✅ **PropTypes básicos**: string, number, bool, func, array, object
- ✅ **Required vs Optional**: Cuándo usar .isRequired
- ✅ **Layout contextual**: Información relevante por vista
- ✅ **Component validation**: Componentes más robustos
- ✅ **Debugging skills**: Encontrar errores de props rápidamente

---

<div align="center">

**⏰ Tiempo estimado:** 3-4 horas
**📚 Dificultad:** ⭐⭐ Básico-Intermedio
**🎯 Enfoque:** PropTypes Fundamentals + Layout Polish

---

**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>
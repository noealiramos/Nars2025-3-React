# 📚 Índice de Documentación - Gallery App

> **Navegación central**: Usa este archivo para encontrar lo que necesitas

## 🎯 Empieza aquí según tu nivel

### 🔵 Primero lee esto
👉 **[README.md](README.md)** - Punto de entrada principal con instalación rápida y visión general

### � Quiero entender los conceptos
👉 Lee: **[CONCEPTOS.md](CONCEPTOS.md)**
- 12 conceptos React fundamentales
- Explicado con ejemplos de la vida real (galletas🍪, perros🐕, frutas🍎)
- Cada concepto en 2-3 minutos
- Con referencias a código real

### 🔵 Solo quiero copiar código
👉 Lee: **[CHEATSHEET.md](CHEATSHEET.md)**
- Snippets listos para copiar y pegar
- Patrones comunes (agregar, eliminar, editar)
- Errores comunes vs soluciones
- Comandos útiles

---

## 📂 Archivos de Código (leer en orden)

| Orden | Archivo | Nivel | Tiempo | Concepto Principal |
|-------|---------|-------|--------|-------------------|
| 1 | `atoms/Button.jsx` | 🟢 | 15 min | Props básicos |
| 2 | `layout/StatusBar.jsx` | 🟢 | 20 min | Usar props |
| 3 | `molecules/AlbumCard.jsx` | 🟡 | 30 min | Composición |
| 4 | `pages/Albums.jsx` | 🟡 | 40 min | Listas |
| 5 | `molecules/AlbumForm.jsx` | 🟡 | 45 min | Formularios |
| 6 | `App.js` | 🔴 | 60 min | State management |
| 7 | `pages/AlbumCarousel.jsx` | 🔴 | 50 min | useEffect |

**Total**: ~4 horas de lectura activa

---

## 📖 Guías de Documentación

### README.md
**Para quién**: Todos (punto de entrada)
**Qué tiene**:
- ¿Qué hace la app?
- Instalación rápida
- Conceptos nivel 1, 2 y 3
- Archivos para leer en orden
- 5 imágenes sugeridas para crear

### CONCEPTOS.md
**Para quién**: Todos los niveles
**Qué tiene**:
- 12 conceptos React explicados con ejemplos simples
- useState, props, arrays, useEffect, localStorage, etc.
- Analogías de la vida real (galletas, perros, frutas)
- Tabla de dónde ver cada concepto en el código
- Comparaciones (qué NO hacer ❌ vs qué hacer ✅)

### CHEATSHEET.md
**Para quién**: Referencia rápida
**Qué tiene**:
- Snippets de código listo para copiar y pegar
- Patrones comunes (agregar, eliminar, editar items)
- Errores comunes y sus soluciones
- Comandos útiles de terminal
- Tips de debugging

---

## 🎨 Diagramas Visuales

Las 5 imágenes están ubicadas en la carpeta `diagrams/` y referenciadas en la documentación:

| Imagen | Ubicación en Docs | Concepto |
|--------|-------------------|----------|
| `flujo-datos.png` | README.md, CONCEPTOS.md §7 | Flujo completo de datos |
| `estructura.png` | README.md | Atomic Design |
| `props.png` | README.md, CONCEPTOS.md §2 | Props de padre a hijo |
| `usestate.png` | README.md, CONCEPTOS.md §1 | Anatomía de useState |
| `filter.png` | README.md, CONCEPTOS.md §3 | Arrays con filter() |

**Ver todas**: [README.md - Sección Diagramas Visuales](README.md#diagrama-flujo)

---

## 🗺️ Mapeo Rápido de Conceptos

| Concepto | Archivo Fácil | Archivo Medio | Archivo Difícil |
|----------|---------------|---------------|-----------------|
| useState | Button.jsx | AlbumForm.jsx | App.js |
| Props | Button.jsx | AlbumCard.jsx | Albums.jsx |
| Arrays (map/filter) | StatusBar.jsx | Albums.jsx | App.js |
| useEffect | - | AlbumCarousel.jsx | PhotoViewer.jsx |
| Forms | - | AlbumForm.jsx | PhotoForm.jsx |
| localStorage | - | - | App.js + utils/localStorage.js |
| Callbacks | Button.jsx | AlbumCard.jsx | App.js |
| Condicionales | StatusBar.jsx | Albums.jsx | ConfirmDialog.jsx |

---

## 🔍 Cómo Buscar Información

**¿Cómo funciona useState?**
→ [CONCEPTOS.md](CONCEPTOS.md) sección 1

**¿Cómo elimino un elemento de un array?**
→ [CHEATSHEET.md](CHEATSHEET.md) → "Patrón: Eliminar item"

**¿Qué es el flujo de datos?**
→ [README.md](README.md) → "Nivel 3 - Flujo de datos"

**¿Cómo hago un formulario?**
→ [CONCEPTOS.md](CONCEPTOS.md) sección 8 + `AlbumForm.jsx`

**Necesito copiar código de [concepto]**
→ [CHEATSHEET.md](CHEATSHEET.md) → busca el concepto

**¿Por dónde empiezo?**
→ [README.md](README.md) → tabla de archivos para leer en orden

---

## ✨ Recordatorio

No leas TODO de una vez. Sigue el orden sugerido.

React es como LEGO: piezas pequeñas → combinadas → app grande.

**¡Tú puedes hacerlo! 🚀**

---

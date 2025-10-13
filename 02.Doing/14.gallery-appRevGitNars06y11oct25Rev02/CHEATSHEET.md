# ⚡ Cheatsheet - Copia y Pega

> **💡 ¿Quieres entender los conceptos?** Lee [CONCEPTOS.md](CONCEPTOS.md)
>
> **📚 ¿No sabes por dónde empezar?** Ve a [README.md](README.md)

---

## 📦 useState

```javascript
// Crear
const [valor, setValor] = useState(inicial);

// Usar
console.log(valor);  // Leer
setValor(nuevo);     // Cambiar
```

**Ejemplos reales:**
```javascript
const [titulo, setTitulo] = useState("");
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [albums, setAlbums] = useState([]);
```

---

## 🗂️ Arrays

### map() - Mostrar lista
```javascript
albums.map(album => (
  <AlbumCard key={album.id} album={album} />
))
```

### filter() - Eliminar de lista
```javascript
const nuevos = albums.filter(a => a.id !== idEliminar);
setAlbums(nuevos);
```

### Spread - Agregar a lista
```javascript
setAlbums([...albums, nuevoAlbum]);
```

### Actualizar en lista
```javascript
setAlbums(albums.map(a =>
  a.id === idCambiar
    ? {...a, titulo: "Nuevo"}
    : a
));
```

---

## 📨 Props

```javascript
// Enviar
<Componente
  nombre="Pedro"
  edad={25}
  onClick={miFuncion}
/>

// Recibir
function Componente({ nombre, edad, onClick }) {
  return <button onClick={onClick}>{nombre}</button>
}
```

---

## ⚡ useEffect

```javascript
// Ejecutar una vez al cargar
useEffect(() => {
  console.log("Componente cargado");
}, []);

// Ejecutar cuando cambie algo
useEffect(() => {
  console.log("Count cambió:", count);
}, [count]);

// Con limpieza
useEffect(() => {
  document.addEventListener('keydown', handler);

  return () => {
    document.removeEventListener('keydown', handler);
  };
}, []);
```

---

## 💾 localStorage

```javascript
// Guardar
localStorage.setItem('clave', 'valor');
localStorage.setItem('datos', JSON.stringify(objeto));

// Recuperar
const valor = localStorage.getItem('clave');
const objeto = JSON.parse(localStorage.getItem('datos'));

// Con valor por defecto
const datos = JSON.parse(localStorage.getItem('datos')) || [];
```

---

## 📝 Forms

```javascript
const [nombre, setNombre] = useState("");

<input
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>

<form onSubmit={(e) => {
  e.preventDefault();
  // Hacer algo con nombre
}}>
  {/* inputs */}
</form>
```

---

## 🎯 Events

```javascript
// Click simple
<button onClick={miFuncion}>Click</button>

// Click con parámetro
<button onClick={() => eliminar(id)}>Eliminar</button>

// Change
<input onChange={(e) => setValor(e.target.value)} />

// Submit
<form onSubmit={(e) => {
  e.preventDefault();
  // tu código
}}>
```

---

## 🎨 Condicional

```javascript
// Ternario
{condicion ? <Mostrar /> : <OtraOpcion />}

// AND
{condicion && <Mostrar />}

// Early return
if (!datos) return <Cargando />;
return <ContenidoNormal />;
```

---

## 🔄 Callbacks

```javascript
// Padre
function Padre() {
  const manejar = (id) => {
    console.log("Recibí:", id);
  };

  return <Hijo onAccion={manejar} />;
}

// Hijo
function Hijo({ onAccion }) {
  return <button onClick={() => onAccion(123)}>Click</button>;
}
```

---

## 🧩 Composition

```javascript
// Padre
function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

// Uso
<Layout>
  <MiContenido />
</Layout>
```

---

## ⚠️ Errores Comunes

### ❌ Mutar estado
```javascript
albums.push(nuevo);  // MAL
albums[0] = nuevo;   // MAL
```

### ✅ Inmutabilidad
```javascript
setAlbums([...albums, nuevo]);              // BIEN
setAlbums(albums.map(a => a.id === 1 ? nuevo : a));  // BIEN
```

---

### ❌ Olvidar key
```javascript
albums.map(album => <AlbumCard album={album} />)  // MAL
```

### ✅ Con key
```javascript
albums.map(album => (
  <AlbumCard key={album.id} album={album} />
))  // BIEN
```

---

### ❌ Callback sin arrow function
```javascript
<button onClick={eliminar(id)}>  // Se ejecuta inmediatamente
```

### ✅ Con arrow function
```javascript
<button onClick={() => eliminar(id)}>  // Se ejecuta al click
```

---

## 🎯 Patrón: Agregar item

```javascript
const [items, setItems] = useState([]);

const agregar = (nuevoItem) => {
  setItems([...items, nuevoItem]);
};
```

---

## 🎯 Patrón: Eliminar item

```javascript
const eliminar = (id) => {
  setItems(items.filter(item => item.id !== id));
};
```

---

## 🎯 Patrón: Editar item

```javascript
const editar = (id, nuevosDatos) => {
  setItems(items.map(item =>
    item.id === id
      ? { ...item, ...nuevosDatos }
      : item
  ));
};
```

---

## 🎯 Patrón: Toggle booleano

```javascript
const toggle = () => {
  setIsOpen(!isOpen);
};
```

---

## 🎯 Patrón: Form submit

```javascript
const [titulo, setTitulo] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();

  // Validar
  if (!titulo.trim()) {
    alert("Campo requerido");
    return;
  }

  // Usar
  onSave({ titulo });

  // Limpiar
  setTitulo("");
};
```

---

## 📂 Dónde encontrar ejemplos

| Patrón | Archivo | Línea |
|--------|---------|-------|
| useState básico | `Button.jsx` | 20 |
| useState complejo | `App.js` | 35 |
| useEffect | `AlbumCarousel.jsx` | 50 |
| Forms | `AlbumForm.jsx` | 80 |
| localStorage | `localStorage.js` | 10 |
| map() | `Albums.jsx` | 40 |
| filter() | `App.js` | 120 |
| Props | `AlbumCard.jsx` | 15 |
| Callbacks | `App.js` | 100 |

---

## 💡 Comandos útiles

```bash
# Instalar
npm install

# Ejecutar
npm start

# Crear componente nuevo
# En src/components/MiComponente.jsx

# Importar componente
import MiComponente from './components/MiComponente';
```

---

## 🐛 Debug

```javascript
// Ver valor en consola
console.log("albums:", albums);

// Ver valor en pantalla
<p>{JSON.stringify(albums, null, 2)}</p>

// Ver cuando cambia
useEffect(() => {
  console.log("albums cambió:", albums);
}, [albums]);
```

---

**💡 Tip**: Guarda este archivo. Cópialo y pégalo cuando necesites recordar algo.

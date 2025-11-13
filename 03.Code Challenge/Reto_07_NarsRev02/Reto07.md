# Reto 07: Refactorización del Checkout

## Objetivo del Reto
Mejorar la estructura y mantenibilidad de nuestra página de checkout mediante la creación de componentes reutilizables, y aplicar el cambio de nombre de `PurchaseOrder.jsx` a `Checkout.jsx` para mejor claridad.

## Descripción del Problema Actual
En el archivo `PurchaseOrder.jsx` encontramos:
- Código duplicado para direcciones y métodos de pago
- Toda la lógica mezclada en un solo componente
- Dificultad para reutilizar funcionalidades en otras partes del proyecto
- Nombre del componente no refleja claramente su propósito
## Ejercicio Guiado

### Fase 1: Preparación
1. (Opcional) Crear una nueva rama: `feature/checkout-refactor`
2. Renombrar el archivo:
   - De: `src/pages/PurchaseOrder.jsx`
   - A: `src/pages/Checkout.jsx`
3. Actualizar las importaciones en los archivos que lo utilicen

### Fase 2: Estructura de Componentes
Crear la siguiente estructura en el proyecto:

```
src/
└── components/
    └── Checkout/
        ├── Address/
        │   ├── AddressList.jsx
        │   ├── AddressItem.jsx
        │   └── AddressForm.jsx
        ├── Payment/
        │   ├── PaymentList.jsx
        │   ├── PaymentItem.jsx
        │   └── PaymentForm.jsx
        └── shared/
            ├── SectionTitle.jsx
            └── FormField.jsx
```

### Fase 3: Implementación Paso a Paso

#### 1. Componentes de Visualización
a) **AddressList y AddressItem**
   ```jsx
   // Ejemplo de estructura básica
   const AddressList = ({ addresses }) => {
     return (
       <div className="address-list">
         {addresses.map(address => (
           <AddressItem key={address.id} address={address} />
         ))}
       </div>
     );
   };
   ```

b) **PaymentList y PaymentItem**
   - Seguir estructura similar a las direcciones
   - Mostrar solo información segura de las tarjetas
   - Implementar selección de método predeterminado

#### 2. Formularios
a) **AddressForm**
   - Campos requeridos: nombre, dirección, código postal, ciudad
   - Validación básica de campos obligatorios
   - Opción para marcar como predeterminada

b) **PaymentForm**
   - Campos para tarjeta: número, fecha, CVV
   - Validación de formato de tarjeta
   - Opción para guardar como predeterminada

#### 3. Integración
a) **Estado Global**
   ```jsx
   // En Checkout.jsx
   const [addresses, setAddresses] = useState([]);
   const [payments, setPayments] = useState([]);
   const [selectedAddress, setSelectedAddress] = useState(null);
   const [selectedPayment, setSelectedPayment] = useState(null);
   ```

b) **Manejo de Eventos**
   - Función para agregar dirección
   - Función para agregar método de pago
   - Función para seleccionar predeterminados

c) **Flujo de Datos**
   - Props drilling inicial
   - Refactorizar a context si es necesario

## Lista de Verificación

### Nivel Básico ✨
Completa estos elementos para tener una implementación funcional:

#### Estructura del Proyecto
- [ ] Renombrar `PurchaseOrder.jsx` a `Checkout.jsx`
- [ ] Crear la estructura de carpetas sugerida
- [ ] Mover los componentes a sus respectivas carpetas

#### Componentes de Dirección
- [ ] Crear `AddressList.jsx` que muestre la lista de direcciones
- [ ] Crear `AddressItem.jsx` para mostrar cada dirección individual
- [ ] Implementar `AddressForm.jsx` con campos básicos

#### Componentes de Pago
- [ ] Crear `PaymentList.jsx` para mostrar métodos de pago
- [ ] Crear `PaymentItem.jsx` para cada tarjeta
- [ ] Implementar `PaymentForm.jsx` con campos básicos

#### Funcionalidad Base
- [ ] Mostrar/ocultar formularios
- [ ] Seleccionar dirección predeterminada
- [ ] Seleccionar método de pago predeterminado
- [ ] Guardar nuevas direcciones
- [ ] Guardar nuevos métodos de pago

### Nivel Avanzado 🚀
Estos elementos llevarán tu implementación al siguiente nivel:

#### Mejoras de UX
- [ ] Añadir validaciones en tiempo real
- [ ] Mostrar mensajes de error descriptivos
- [ ] Implementar animaciones de transición
- [ ] Añadir confirmaciones de acciones
- [ ] Implementar estados de carga

#### Mejoras Técnicas
- [ ] Crear un contexto para el checkout
- [ ] Implementar manejo de errores
- [ ] Añadir persistencia de datos
- [ ] Optimizar renders con useMemo/useCallback
- [ ] Implementar lazy loading para formularios

#### Extras
- [ ] Añadir modo de edición para direcciones/pagos
- [ ] Implementar eliminación de elementos
- [ ] Añadir resumen de orden
- [ ] Implementar búsqueda/filtrado de direcciones
- [ ] Añadir vista previa de tarjeta

## Guía Detallada de Implementación

### 1. Inicio del Proyecto
```bash
# 1. Crear nueva rama
git checkout -b feature/checkout-refactor

# 2. Crear estructura de carpetas
mkdir -p src/components/Checkout/{Address,Payment,shared}

# 3. Mover y renombrar archivo principal
mv src/pages/PurchaseOrder.jsx src/pages/Checkout.jsx
```

### 2. Desarrollo de Componentes

#### Componente Address
```jsx
// AddressItem.jsx - Ejemplo básico
export const AddressItem = ({ address, onSelect }) => {
  return (
    <div className="address-item" onClick={() => onSelect(address)}>
      <h4>{address.name}</h4>
      <p>{address.address1}</p>
      <p>{address.city}, {address.postalCode}</p>
      {address.default && <span className="default-badge">Predeterminada</span>}
    </div>
  );
};
```

#### Manejo de Estado
```jsx
// Ejemplo de estado en Checkout.jsx
const [showAddressForm, setShowAddressForm] = useState(false);
const [addresses, setAddresses] = useState(addressList);

const addNewAddress = (newAddress) => {
  setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
  setShowAddressForm(false);
};
```

### 3. Tips de Implementación

#### Para Formularios
- Usa un objeto para el estado del formulario
- Implementa validación básica antes de guardar
- Muestra feedback visual al usuario

#### Para Listas
- Usa keys únicas en los mapeos
- Implementa filtros si la lista crece
- Considera paginación para muchos elementos

#### Para el Estado
- Mantén el estado lo más cerca posible de donde se usa
- Eleva el estado solo cuando sea necesario
- Usa callbacks para comunicación hijo-padre

## Preguntas de Reflexión
1. ¿Por qué es mejor tener componentes pequeños y específicos?
2. ¿Cómo decides qué debe ser un componente separado?
3. ¿Cuál es la ventaja de tener una estructura de carpetas organizada?

## Recursos de Ayuda
- [Documentación de React sobre Componentes y Props](https://reactjs.org/docs/components-and-props.html)
- [Guía de Estructura de Proyectos React](https://reactjs.org/docs/faq-structure.html)
- [Mejores Prácticas de React](https://reactjs.org/docs/thinking-in-react.html)

## Entregables
1. Código refactorizado con la nueva estructura
2. Breve documentación de los cambios realizados
3. Lista de mejoras implementadas

## Consejos para el Desarrollo
- Comienza con los componentes más pequeños
- Prueba cada componente de forma aislada
- Mantén la consistencia en el estilo de código
- Documenta decisiones importantes
- Realiza commits frecuentes y descriptivos

---

Nota: Este reto está diseñado para ser completado en una semana. Si tienes dudas, no dudes en preguntar durante las sesiones de clase.
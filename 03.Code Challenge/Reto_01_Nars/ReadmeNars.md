

npx create-react-app reto-atomos-ecommerce

crear carpetas dentro de scr:
*components - componentes prales de la aplicación
*pages - donde estarán las páginas prales
*styles - estilos prales
*utils
*services - donde se programará como nos conectamos a la app
*cambiar el nombre de "App.js" a "App.jsx" (para usar java script y html dentro de un mismo archivo)

NOTA:

Pasos:
1) npx create-react-app reto-atomos-ecommerce
2) cd reto-atomos-ecommerce

3) npm i prop-types

👉 ¿Qué es una prop?
Las props (propiedades) son los valores que le pasas a un componente, por ejemplo:

👉 ¿Qué hace prop-types?
Sirve para:
*Validar el tipo de datos que recibe un componente.
*Ejemplo: que variant sea un string y no un número.
*Detectar errores temprano. Si alguien usa mal el componente, React mostrará una advertencia en la consola.

¿Qué pasa si no lo instalas? >>> se refiere a "npm i prop-types"

El código sigue funcionando normal (React no se rompe).

Pero no tendrás las advertencias en consola cuando pases mal una prop.

👉 Es como ponerle “cinturón de seguridad” a tus componentes. 🚗💨


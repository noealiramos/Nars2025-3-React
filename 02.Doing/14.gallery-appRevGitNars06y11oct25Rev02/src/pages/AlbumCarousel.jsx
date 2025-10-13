/**
 * ============================================================================
 * ALBUMCAROUSEL - CARRUSEL DE IMÁGENES DE ÁLBUM
 * ============================================================================
 *
 * Componente modal que muestra las fotos de un álbum en formato carrusel.
 *
 * PROPÓSITO:
 * - Visualizar fotos del álbum una por una
 * - Navegar entre fotos (flechas, teclado, thumbnails)
 * - Cerrar con tecla Escape o botón
 * - Navegación circular (última → primera)
 * - Resetear a primera foto al abrir
 *
 * CONCEPTOS CLAVE:
 * - useState: Estado local (índice actual)
 * - useEffect: Side effects (reset índice, eventos teclado)
 * - Event listeners: Keyboard navigation
 * - Cleanup functions: Remover listeners
 * - Circular navigation: Lógica con ternarios
 * - Switch statement: Múltiples casos de teclado
 * - Optional chaining: Acceso seguro (?.)
 * - Conditional rendering: Botones, thumbnails
 * - Disabled state: Botones con una sola imagen
 *
 * DIFERENCIA CON PHOTOVIEWER:
 * - PhotoViewer: Una sola foto (estática)
 * - AlbumCarousel: Múltiples fotos (navegación + thumbnails)
 *
 * HOOKS USADOS:
 * - useState: currentImageIndex
 * - useEffect (2 veces): Reset + Keyboard
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

import PropTypes from "prop-types";
import { useEffect, useState } from "react"; // Hooks
import Button from "../atoms/Button"; // Componente botón
import { BUTTON_SIZES } from "../utils/constants"; // Constantes de tamaños
import "./AlbumCarousel.css"; // Estilos

// ==========================================================================
// COMPONENTE ALBUMCAROUSEL
// ==========================================================================

/**
 * AlbumCarousel - Modal para navegar fotos de un álbum
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - REQUERIDO: Si el carrusel está abierto
 * @param {Object} props.album - Datos del álbum con imágenes
 * @param {Function} props.onClose - REQUERIDO: Callback para cerrar
 *
 * CONCEPTO - Image Carousel / Slideshow:
 * Patrón común para ver colecciones de imágenes.
 * También llamado "slider", "gallery", "lightbox carousel".
 *
 * CARACTERÍSTICAS IMPLEMENTADAS:
 * - Una imagen visible a la vez
 * - Navegación anterior/siguiente
 * - Thumbnails clicables
 * - Navegación por teclado (flechas, Escape)
 * - Contador de posición (3 de 10)
 * - Navegación circular
 * - Resetear al abrir
 * - Deshabilitar botones si solo hay 1 imagen
 *
 * CARACTERÍSTICAS NO IMPLEMENTADAS (POSIBLES):
 * - Autoplay (avanzar automáticamente)
 * - Zoom de imagen
 * - Swipe gestures (táctil)
 * - Animaciones de transición
 * - Fullscreen mode
 *
 * SIMILARES EN LA WEB:
 * - Instagram posts (swipe horizontal)
 * - Amazon product images
 * - Lightbox galleries (fancybox, photoswipe)
 * - YouTube thumbnails preview
 */
export default function AlbumCarousel({ isOpen, album, onClose }) {
  // ========================================================================
  // STATE: ÍNDICE DE IMAGEN ACTUAL
  // ========================================================================

  /**
   * CONCEPTO - Current Index:
   * currentImageIndex controla qué foto se muestra.
   *
   * RANGO VÁLIDO:
   * 0 hasta album.images.length - 1
   *
   * EJEMPLO:
   * Si album tiene 5 imágenes:
   * - Índices válidos: 0, 1, 2, 3, 4
   * - currentImageIndex = 0 → Primera imagen
   * - currentImageIndex = 4 → Última imagen
   *
   * INITIAL VALUE:
   * useState(0)
   *
   * Siempre empieza en 0 (primera imagen).
   *
   * ALTERNATIVA CON PROP:
   * Si quisieras empezar en otra imagen:
   *
   * function AlbumCarousel({ ..., initialIndex = 0 }) {
   *   const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
   * }
   *
   * USO:
   * <AlbumCarousel album={album} initialIndex={3} />
   * → Empezaría en la 4ta imagen
   *
   * DECISIÓN DE DISEÑO:
   * Este código resetea a 0 con useEffect (ver abajo).
   */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ========================================================================
  // EFFECT 1: RESET ÍNDICE AL ABRIR
  // ========================================================================

  /**
   * CONCEPTO - Reset on Open:
   * Resetear el índice a 0 cada vez que se abre el carrusel.
   *
   * PROBLEMA SIN ESTO:
   * Usuario:
   * 1. Abre álbum A, navega a imagen 5
   * 2. Cierra carrusel
   * 3. Abre álbum B
   * 4. Ve imagen 5 de álbum B (confuso!)
   *
   * MEJOR UX:
   * Siempre empezar en primera imagen de cada álbum.
   *
   * useEffect(() => { ... }, [isOpen])
   *
   * DEPENDENCIAS:
   * [isOpen]
   *
   * Se ejecuta cuando isOpen cambia.
   *
   * FLUJO:
   * 1. isOpen cambia de false → true (se abre)
   * 2. Effect se ejecuta
   * 3. if (isOpen) → true
   * 4. setCurrentImageIndex(0)
   * 5. Resetea a primera imagen
   *
   * CUANDO CIERRA:
   * isOpen cambia de true → false
   * Effect se ejecuta pero if (isOpen) es false
   * → No hace nada
   *
   * ALTERNATIVA SIN IF:
   * useEffect(() => {
   *   setCurrentImageIndex(0);
   * }, [isOpen]);
   *
   * PROBLEMA:
   * También resetea cuando cierra (innecesario).
   *
   * CON IF:
   * Solo resetea cuando abre.
   *
   * NO CLEANUP:
   * No hay return porque no necesitamos limpiar nada.
   * Solo actualizamos state.
   */
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // ========================================================================
  // EFFECT 2: KEYBOARD NAVIGATION
  // ========================================================================

  /**
   * CONCEPTO - Keyboard Controls:
   * Permite navegar con teclado para mejor UX.
   *
   * TECLAS MANEJADAS:
   * - Escape: Cerrar carrusel
   * - ArrowLeft: Imagen anterior
   * - ArrowRight: Imagen siguiente
   *
   * TECLAS NO MANEJADAS (PODRÍAN AGREGARSE):
   * - Home: Primera imagen
   * - End: Última imagen
   * - Page Up/Down: Saltar varias
   * - Números 1-9: Ir a imagen específica
   * - Space: Autoplay toggle
   *
   * useEffect(() => { ... }, [isOpen, onClose, album])
   *
   * DEPENDENCIAS:
   * [isOpen, onClose, album]
   *
   * El effect se ejecuta cuando cambia:
   * 1. isOpen: Carrusel se abre/cierra
   * 2. onClose: Función de cierre cambia (raro pero correcto)
   * 3. album: Se cambia el álbum (necesario para album.images.length)
   *
   * POR QUÉ ALBUM EN DEPS:
   * handleKeyDown usa album?.images?.length.
   * Si album cambia, necesitamos recrear el listener
   * con la nueva referencia del álbum.
   *
   * EARLY RETURN:
   * if (!isOpen || !album?.images?.length) return;
   *
   * Solo responde a teclas si:
   * 1. Carrusel está abierto (isOpen)
   * 2. Hay álbum (album existe)
   * 3. Álbum tiene imágenes (images.length > 0)
   *
   * OPTIONAL CHAINING:
   * album?.images?.length
   *
   * EQUIVALENTE A:
   * album && album.images && album.images.length
   *
   * Si alguno es null/undefined, retorna undefined (falsy).
   *
   * SWITCH STATEMENT:
   * switch (e.key) { ... }
   *
   * CONCEPTO - Switch vs If/Else:
   * Cuando hay múltiples casos para el mismo valor.
   *
   * VENTAJAS:
   * - Más legible para múltiples casos
   * - Más fácil agregar nuevos casos
   * - Mejor rendimiento (debatible)
   *
   * CASOS:
   * case "Escape":
   *   onClose();
   *   break;
   *
   * Si e.key === "Escape", ejecuta onClose() y sale (break).
   *
   * BREAK:
   * Necesario para salir del switch.
   * Sin break, continúa al siguiente caso (fall-through).
   *
   * DEFAULT:
   * case default:
   *   break;
   *
   * Se ejecuta si ningún caso coincide.
   * En este código no hace nada (solo break).
   *
   * NAVEGACIÓN CIRCULAR:
   * Ver setCurrentImageIndex en cada caso.
   *
   * ARROWLEFT:
   * setCurrentImageIndex((prev) =>
   *   prev === 0 ? album.images.length - 1 : prev - 1
   * )
   *
   * LÓGICA:
   * Si prev === 0 (primera imagen):
   *   → ir a album.images.length - 1 (última imagen)
   * Si no:
   *   → prev - 1 (imagen anterior)
   *
   * EJEMPLO CON 5 IMÁGENES (0-4):
   * prev = 4 → 4 - 1 = 3
   * prev = 3 → 3 - 1 = 2
   * prev = 2 → 2 - 1 = 1
   * prev = 1 → 1 - 1 = 0
   * prev = 0 → 5 - 1 = 4 (circular!)
   *
   * ARROWRIGHT:
   * setCurrentImageIndex((prev) =>
   *   prev === album.images.length - 1 ? 0 : prev + 1
   * )
   *
   * LÓGICA:
   * Si prev === última imagen:
   *   → ir a 0 (primera imagen)
   * Si no:
   *   → prev + 1 (imagen siguiente)
   *
   * EJEMPLO CON 5 IMÁGENES (0-4):
   * prev = 0 → 0 + 1 = 1
   * prev = 1 → 1 + 1 = 2
   * prev = 2 → 2 + 1 = 3
   * prev = 3 → 3 + 1 = 4
   * prev = 4 → 0 (circular!)
   *
   * FUNCTIONAL UPDATE:
   * setCurrentImageIndex((prev) => ...)
   *
   * VENTAJA:
   * Usa el valor más reciente del state.
   * Evita closures obsoletos.
   *
   * ALTERNATIVA CON MÓDULO:
   * setCurrentImageIndex((prev) => (prev + 1) % album.images.length)
   *
   * Más compacto pero menos obvio.
   *
   * CLEANUP:
   * return () => removeEventListener
   *
   * Remueve el listener cuando:
   * - Componente se desmonta
   * - Antes de re-ejecutar effect (deps cambian)
   *
   * CRÍTICO:
   * Sin cleanup → memory leaks, listeners múltiples.
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Solo actuar si está abierto y hay imágenes
      if (!isOpen || !album?.images?.length) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          // Navegar a imagen anterior (circular)
          setCurrentImageIndex((prev) =>
            prev === 0 ? album.images.length - 1 : prev - 1
          );
          break;
        case "ArrowRight":
          // Navegar a imagen siguiente (circular)
          setCurrentImageIndex((prev) =>
            prev === album.images.length - 1 ? 0 : prev + 1
          );
          break;
        default:
          break;
      }
    };

    // Agregar listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup: remover listener
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, album]);

  // ========================================================================
  // HANDLERS - FUNCIONES DE NAVEGACIÓN
  // ========================================================================

  /**
   * ========================================================================
   * GOTONEXT - IR A IMAGEN SIGUIENTE
   * ========================================================================
   *
   * Función para botón "siguiente".
   *
   * LÓGICA:
   * Idéntica a ArrowRight en el effect anterior.
   *
   * OPTIONAL CHAINING:
   * album?.images?.length
   *
   * Previene error si album o images es null/undefined.
   *
   * NAVEGACIÓN CIRCULAR:
   * Si está en última → va a primera.
   * Si no → avanza uno.
   *
   * LLAMADA:
   * <Button onClick={goToNext}>›</Button>
   */
  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === album?.images?.length - 1 ? 0 : prev + 1
    );
  };

  /**
   * ========================================================================
   * GOTOPREVIOUS - IR A IMAGEN ANTERIOR
   * ========================================================================
   *
   * Función para botón "anterior".
   *
   * LÓGICA:
   * Idéntica a ArrowLeft en el effect anterior.
   *
   * NAVEGACIÓN CIRCULAR:
   * Si está en primera → va a última.
   * Si no → retrocede uno.
   *
   * LLAMADA:
   * <Button onClick={goToPrevious}>‹</Button>
   */
  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? album?.images?.length - 1 : prev - 1
    );
  };

  // ========================================================================
  // EARLY RETURN - CARRUSEL CERRADO O SIN DATOS
  // ========================================================================

  /**
   * GUARD CLAUSE: No renderizar si no hay datos válidos
   *
   * CONDICIONES:
   * !isOpen || !album || !album.images || album.images.length === 0
   *
   * No renderiza si:
   * 1. isOpen es false (cerrado)
   * 2. album es null/undefined
   * 3. album.images es null/undefined
   * 4. album.images está vacío (length === 0)
   *
   * ORDEN:
   * Importante verificar en orden de existencia:
   * 1. isOpen (booleano)
   * 2. album (objeto)
   * 3. album.images (array)
   * 4. album.images.length (número)
   *
   * SHORT-CIRCUIT:
   * Si isOpen es false, no evalúa el resto.
   * Si album es null, no evalúa album.images (evita error).
   *
   * HOOKS PRIMERO:
   * Regla de hooks: siempre en el mismo orden.
   * useEffect/useState deben estar ANTES del return.
   *
   * INCORRECTO:
   * if (!isOpen) return null;
   * useEffect(() => { ... });  // ERROR: Hook después de return
   *
   * CORRECTO:
   * useEffect(() => { ... });  // Hooks primero
   * if (!isOpen) return null;  // Early return después
   */
  if (!isOpen || !album || !album.images || album.images.length === 0) {
    return null;
  }

  // ========================================================================
  // FUNCIÓN AUXILIAR - IR A IMAGEN ESPECÍFICA
  // ========================================================================

  /**
   * ========================================================================
   * GOTOIMAGE - IR A IMAGEN POR ÍNDICE
   * ========================================================================
   *
   * @param {number} index - Índice de la imagen destino
   *
   * PROPÓSITO:
   * Navegar directamente a una imagen específica.
   * Usado por thumbnails clicables.
   *
   * LÓGICA:
   * setCurrentImageIndex(index)
   *
   * Simple: cambia el índice al valor dado.
   *
   * LLAMADA DESDE THUMBNAIL:
   * onClick={() => goToImage(index)}
   *
   * Usuario click thumbnail → Salta a esa imagen.
   *
   * ARROW FUNCTION NECESARIA:
   * () => goToImage(index)
   *
   * Necesitamos pasar el index específico de cada thumbnail.
   *
   * SIN ARROW FUNCTION (INCORRECTO):
   * onClick={goToImage}  // No funciona, falta parámetro
   *
   * VALIDACIÓN (NO IMPLEMENTADA):
   * Podría validar que index esté en rango:
   *
   * const goToImage = (index) => {
   *   if (index >= 0 && index < album.images.length) {
   *     setCurrentImageIndex(index);
   *   }
   * };
   *
   * VENTAJA:
   * Previene índices inválidos.
   *
   * EN ESTE CÓDIGO:
   * No valida porque thumbnails solo pasan índices válidos.
   */
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // ========================================================================
  // VARIABLE DERIVADA - IMAGEN ACTUAL
  // ========================================================================

  /**
   * CONCEPTO - Derived State:
   * Variable calculada desde state/props.
   * NO almacenar en state.
   *
   * CURRENTIMAGE:
   * const currentImage = album.images[currentImageIndex];
   *
   * Imagen actualmente visible.
   *
   * ACCESO POR ÍNDICE:
   * album.images[0] → Primera imagen
   * album.images[1] → Segunda imagen
   * album.images[currentImageIndex] → Imagen actual
   *
   * POSIBLE UNDEFINED:
   * Si currentImageIndex >= album.images.length,
   * currentImage será undefined.
   *
   * EN ESTE CÓDIGO:
   * No debería pasar porque:
   * 1. Validamos album.images.length en early return
   * 2. goToNext/goToPrevious usan lógica circular
   * 3. goToImage solo recibe índices de thumbnails válidos
   *
   * PERO ES BUENA PRÁCTICA:
   * Verificar antes de usar:
   * {currentImage && <img src={currentImage.url} />}
   */
  const currentImage = album.images[currentImageIndex];

  // ========================================================================
  // RENDER
  // ========================================================================

  /**
   * ESTRUCTURA:
   *
   * 1. .carousel-modal-overlay
   *    - Fondo oscuro pantalla completa
   *    - Click para cerrar
   *
   * 2. .carousel-modal
   *    - Contenedor principal centrado
   *    - Click NO cierra (stopPropagation)
   *
   * 3. .carousel-header
   *    - Título del álbum, descripción, botón cerrar
   *
   * 4. .carousel-main
   *    - Botón anterior + Imagen + Botón siguiente
   *
   * 5. .carousel-thumbnails (condicional)
   *    - Miniaturas clicables (solo si > 1 imagen)
   *
   * ONCLICK OVERLAY:
   * onClick={onClose}
   *
   * Click en overlay oscuro cierra el carrusel.
   * Patrón UX estándar para modales.
   *
   * E.STOPPROPAGATION():
   * onClick={(e) => e.stopPropagation()}
   *
   * CONCEPTO - Event Bubbling:
   * Sin stopPropagation:
   * - Click en modal → También dispara onClick del overlay → Cierra
   *
   * Con stopPropagation:
   * - Click en modal → Detiene bubbling → NO dispara overlay → NO cierra
   *
   * RESULTADO:
   * - Click en overlay → Cierra
   * - Click en modal (contenido) → No cierra
   *
   * PATRÓN:
   * <div onClick={close}>
   *   <div onClick={(e) => e.stopPropagation()}>
   *     contenido
   *   </div>
   * </div>
   */
  return (
    <div className="carousel-modal-overlay" onClick={onClose}>
      <div className="carousel-modal" onClick={(e) => e.stopPropagation()}>
        {/* ==============================================================
            HEADER - INFORMACIÓN DEL ÁLBUM
            ============================================================== */}
        <div className="carousel-header">
          <div className="carousel-album-info">
            {/*
              TÍTULO DEL ÁLBUM:

              ICONO:
              ▶️ emoji play

              Indica que es un "slideshow" reproducible.
            */}
            <h2 className="carousel-album-title">
              <span className="carousel-play-icon">▶️</span>
              {album.title}
            </h2>

            {/* Descripción del álbum */}
            <p className="carousel-album-description">{album.description}</p>
          </div>

          {/*
            BOTÓN CERRAR:

            COMPOSITION:
            Usa Button de atoms.

            PROPS:
            - className: Clase específica para posicionamiento
            - onClick: Cierra el carrusel
            - variant: "secondary" (no tan prominente)
            - size: MEDIUM
            - ariaLabel: Accesibilidad

            CHILDREN:
            × (símbolo cerrar)

            ALTERNATIVAS:
            - ✕ (unicode)
            - Icon component
            - SVG
          */}
          <Button
            className="carousel-close-button"
            onClick={onClose}
            variant="secondary"
            size={BUTTON_SIZES.MEDIUM}
            ariaLabel="Cerrar carrusel"
          >
            ×
          </Button>
        </div>

        {/* ==============================================================
            MAIN - NAVEGACIÓN E IMAGEN PRINCIPAL
            ==============================================================

            LAYOUT:
            [Botón <] [Imagen] [Botón >]

            CSS típico:
            .carousel-main {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 1rem;
            }
         */}
        <div className="carousel-main">
          {/*
            BOTÓN ANTERIOR:

            DISABLED:
            disabled={album.images.length <= 1}

            Si solo hay 1 imagen, deshabilitar botón.
            No tiene sentido navegar si solo hay una.

            CONCEPTO - Disabled State:
            Button recibe prop disabled.
            Debe manejarlo internamente:
            - Agregar clase CSS
            - Prevenir onClick
            - Cambiar cursor
            - Reducir opacidad

            ONCLICK:
            onClick={goToPrevious}

            Sin arrow function porque no pasamos parámetros.

            VARIANT:
            "secondary" (menos prominente)

            SIZE:
            LARGE (fácil de clickear)

            CHILDREN:
            ‹ (single left-pointing angle quotation mark)

            ALTERNATIVAS:
            - ← (leftwards arrow)
            - < (less-than)
            - Font Awesome: <FaChevronLeft />

            CLASSNAME:
            Dos clases:
            - carousel-nav-button: Estilos base
            - carousel-nav-button--prev: Estilos específicos (posición left)

            ARIALABEL:
            "Imagen anterior"

            Para screen readers.
          */}
          <Button
            className="carousel-nav-button carousel-nav-button--prev"
            onClick={goToPrevious}
            disabled={album.images.length <= 1}
            variant="secondary"
            size={BUTTON_SIZES.LARGE}
            ariaLabel="Imagen anterior"
          >
            ‹
          </Button>

          {/*
            CONTENEDOR DE IMAGEN:

            Agrupa imagen + info para mejor layout.
           */}
          <div className="carousel-image-container">
            {/*
              IMAGEN PRINCIPAL:

              SRC:
              src={currentImage.url}

              URL de la imagen actual.

              ALT:
              alt={currentImage.name || `Imagen ${currentImageIndex + 1}`}

              Usa nombre de la imagen.
              Si no hay, usa "Imagen 1", "Imagen 2", etc.

              NULLISH COALESCING:
              currentImage.name || fallback

              Si name es falsy (null, undefined, ""), usa fallback.

              CLASSNAME:
              carousel-image

              CSS típico:
              .carousel-image {
                max-width: 100%;
                max-height: 60vh;
                object-fit: contain;
                display: block;
              }

              OBJECT-FIT CONTAIN:
              - Mantiene aspect ratio
              - No recorta
              - Agrega espacio si necesario

              ALTERNATIVAS:
              - cover: Llena, puede recortar
              - fill: Estira (distorsiona)
              - none: Tamaño original
            */}
            <img
              src={currentImage.url}
              alt={currentImage.name || `Imagen ${currentImageIndex + 1}`}
              className="carousel-image"
            />

            {/*
              INFO DE IMAGEN:

              Título y contador debajo de la imagen.
             */}
            <div className="carousel-image-info">
              {/* Título/nombre de la imagen actual */}
              <h3 className="carousel-image-title">{currentImage.name}</h3>

              {/*
                CONTADOR:

                FORMATO:
                "3 de 10"

                CÁLCULO:
                - Actual: currentImageIndex + 1 (índices 0-based)
                - Total: album.images.length

                EJEMPLO:
                currentImageIndex = 2 (tercera imagen, 0-indexed)
                album.images.length = 10
                → "3 de 10"

                UX:
                Usuario sabe posición en la colección.

                ACCESIBILIDAD:
                Screen readers leen: "3 de 10".
              */}
              <p className="carousel-image-counter">
                {currentImageIndex + 1} de {album.images.length}
              </p>
            </div>
          </div>

          {/*
            BOTÓN SIGUIENTE:

            Idéntico a botón anterior, pero:
            - onClick: goToNext
            - className: --next (posición right)
            - ariaLabel: "siguiente"
            - Children: › (right angle)

            DISABLED:
            disabled={album.images.length <= 1}

            Igual que botón anterior.
          */}
          <Button
            className="carousel-nav-button carousel-nav-button--next"
            onClick={goToNext}
            disabled={album.images.length <= 1}
            variant="secondary"
            size={BUTTON_SIZES.LARGE}
            ariaLabel="Imagen siguiente"
          >
            ›
          </Button>
        </div>

        {/* ==============================================================
            THUMBNAILS - MINIATURAS CLICABLES (CONDICIONAL)
            ==============================================================

            CONDICIÓN:
            {album.images.length > 1 && ( ... )}

            Solo muestra thumbnails si hay más de 1 imagen.

            RAZÓN:
            Si solo hay 1 imagen, no tiene sentido mostrar thumbnails.

            CONCEPTO - Thumbnail Grid:
            Permite saltar directamente a cualquier imagen.
            Patrón común en galerías.

            ARRAY.MAP():
            Transforma cada imagen en un thumbnail clicable.

            MAP CON ÍNDICE:
            album.images.map((image, index) => ...)

            PARÁMETROS:
            - image: Objeto imagen actual
            - index: Posición en el array (0, 1, 2, ...)

            KEY:
            key={index}

            Usa index como key.

            IDEAL:
            key={image.id}

            Si images tienen id único, usarlo.

            PROBLEMA CON INDEX:
            Si el orden cambia, React no detecta bien.

            EN ESTE CASO:
            El orden de imágenes no cambia dinámicamente,
            así que index es aceptable.
         */}
        {album.images.length > 1 && (
          <div className="carousel-thumbnails">
            <div className="carousel-thumbnails-container">
              {album.images.map((image, index) => (
                /*
                  THUMBNAIL BUTTON:

                  COMPOSITION:
                  Cada thumbnail es un Button de atoms.

                  POR QUÉ BUTTON:
                  - Accesibilidad (focusable, teclado)
                  - Consistencia (mismo componente)
                  - Estilos (variant, size)

                  ALTERNATIVA:
                  <div onClick={...}> o <img onClick={...}>

                  PEOR UX:
                  - No focusable con Tab
                  - No responde a Enter/Space
                  - Screen readers no lo identifican como botón

                  CLASSNAME CONDICIONAL:
                  className={`carousel-thumbnail ${
                    index === currentImageIndex
                      ? "carousel-thumbnail--active"
                      : ""
                  }`}

                  TEMPLATE LITERAL:
                  `clase-base ${condicional}`

                  CONDICIONAL:
                  index === currentImageIndex ? "active" : ""

                  Si es el thumbnail de la imagen actual,
                  agregar clase "carousel-thumbnail--active".

                  RESULTADO:
                  Imagen actual:
                  "carousel-thumbnail carousel-thumbnail--active"

                  Otras imágenes:
                  "carousel-thumbnail"

                  CSS típico:
                  .carousel-thumbnail {
                    padding: 0;
                    border: 2px solid transparent;
                    opacity: 0.6;
                    transition: all 0.3s;
                  }

                  .carousel-thumbnail--active {
                    opacity: 1;
                    border-color: #007bff;
                    transform: scale(1.1);
                  }

                  .carousel-thumbnail:hover {
                    opacity: 1;
                  }

                  ONCLICK:
                  onClick={() => goToImage(index)}

                  Arrow function necesaria para pasar index.

                  VARIANT:
                  "ghost"

                  Botón sin fondo (solo contenido).
                  Común para botones con imágenes.

                  SIZE:
                  SMALL

                  Thumbnails pequeños.

                  ARIALABEL:
                  ariaLabel={image.name || `Imagen ${index + 1}`}

                  Accesibilidad para screen readers.
                */
                <Button
                  key={index}
                  className={`carousel-thumbnail ${
                    index === currentImageIndex
                      ? "carousel-thumbnail--active"
                      : ""
                  }`}
                  onClick={() => goToImage(index)}
                  variant="ghost"
                  size={BUTTON_SIZES.SMALL}
                  ariaLabel={image.name || `Imagen ${index + 1}`}
                >
                  {/*
                    IMAGEN THUMBNAIL:

                    SRC:
                    src={image.url}

                    URL de la imagen.

                    OPTIMIZACIÓN:
                    Idealmente usar thumbnail más pequeño:
                    src={image.thumbnailUrl || image.url}

                    VENTAJA:
                    - Menor tamaño de archivo
                    - Carga más rápida
                    - Menos ancho de banda

                    ALT:
                    alt={image.name || `Thumbnail ${index + 1}`}

                    Descripción para accesibilidad.

                    CLASSNAME:
                    carousel-thumbnail-image

                    CSS típico:
                    .carousel-thumbnail-image {
                      width: 60px;
                      height: 60px;
                      object-fit: cover;
                      display: block;
                      border-radius: 4px;
                    }

                    OBJECT-FIT COVER:
                    - Llena el espacio
                    - Mantiene aspect ratio
                    - Recorta si necesario

                    MEJOR PARA THUMBNAILS:
                    Queremos tamaño uniforme, no importa si recorta.
                  */}
                  <img
                    src={image.url}
                    alt={image.name || `Thumbnail ${index + 1}`}
                    className="carousel-thumbnail-image"
                  />
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// VALIDACIÓN DE PROPS
// ==========================================================================

/**
 * PropTypes de AlbumCarousel
 *
 * PROPS REQUERIDAS:
 * - isOpen: Boolean (obligatorio)
 * - onClose: Función (obligatorio)
 *
 * PROPS OPCIONALES:
 * - album: Objeto con estructura detallada
 *
 * ALBUM SHAPE:
 * PropTypes.shape({ ... })
 *
 * Define estructura esperada del objeto album.
 *
 * DENTRO DE SHAPE:
 * - id: oneOfType([string, number])
 * - title: string.isRequired (obligatorio dentro de album)
 * - description: string (opcional)
 * - images: arrayOf(shape).isRequired (obligatorio)
 *
 * IMAGES SHAPE:
 * Array de objetos imagen.
 *
 * CADA IMAGEN:
 * PropTypes.shape({
 *   url: string.isRequired,
 *   name: string,
 * })
 *
 * URL REQUERIDA:
 * Necesaria para renderizar <img>.
 *
 * NAME OPCIONAL:
 * Puede faltar, usamos fallback en código.
 *
 * ALBUM NO ES REQUIRED:
 * Porque verificamos !album en código (early return).
 *
 * ALTERNATIVA:
 * Hacerlo required y no verificar en código:
 * album: PropTypes.shape({ ... }).isRequired
 *
 * VENTAJA ACTUAL:
 * Más flexible, permite cerrar carrusel sin álbum.
 *
 * VALIDACIÓN EN CONSOLA:
 * PropTypes muestra warnings en desarrollo si:
 * - Falta prop requerida
 * - Tipo incorrecto
 * - Estructura no coincide
 *
 * EJEMPLO WARNING:
 * "Warning: Failed prop type: The prop `album.images[0].url`
 * is marked as required in `AlbumCarousel`, but its value is `undefined`."
 *
 * VENTAJAS:
 * - Detecta errores temprano
 * - Documentación auto-generada
 * - Autocompletado en IDEs
 * - Previene bugs de tipos
 *
 * NO REEMPLAZA TYPESCRIPT:
 * PropTypes es validación en runtime.
 * TypeScript es validación en compile-time.
 *
 * MIGRACIÓN A TYPESCRIPT:
 * interface AlbumCarouselProps {
 *   isOpen: boolean;
 *   album?: {
 *     id?: string | number;
 *     title: string;
 *     description?: string;
 *     images: {
 *       url: string;
 *       name?: string;
 *     }[];
 *   };
 *   onClose: () => void;
 * }
 */
AlbumCarousel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  album: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

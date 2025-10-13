/**
 * ============================================================================
 * GALLERY APP - COMPONENTE PRINCIPAL
 * ============================================================================
 *
 * Este es el componente raíz de la aplicación Gallery App.
 * Maneja todo el estado global y coordina la comunicación entre componentes.
 *
 * CONCEPTOS CLAVE QUE SE APLICAN AQUÍ:
 * - useState: Para manejar múltiples estados locales
 * - useEffect: Para sincronizar datos con localStorage
 * - Props: Para pasar datos y funciones a componentes hijos
 * - Lifting State Up: El estado vive aquí y se comparte con hijos
 * - Ciclo de vida: Montaje, actualización y efectos secundarios
 */

// ==========================================================================
// IMPORTACIONES
// ==========================================================================

// 1. Hooks de React necesarios
import { useEffect, useState } from "react";

// 2. Estilos globales de la aplicación
import "./App.css";

// 3. Datos iniciales (mock data)
import albumsCollection from "./data/albums";
import photosCollection from "./data/photos";

// 4. Componentes de Layout
import Layout from "./layout/Layout";

// 5. Componentes Moleculares (componentes compuestos)
import ConfirmDialog from "./molecules/ConfirmDialog";

// 6. Componentes de Páginas (vistas principales)
import AlbumCarousel from "./pages/AlbumCarousel";
import Albums from "./pages/Albums";
import EditAlbum from "./pages/EditAlbum";
import EditPhoto from "./pages/EditPhoto";
import Photos from "./pages/Photos";
import PhotoViewer from "./pages/PhotoViewer";

// 7. Utilidades (constantes y funciones helper)
import { STORAGE_KEYS, VIEWS } from "./utils/constants";
import { getFromStorage, saveToStorage } from "./utils/localStorage";

// ==========================================================================
// COMPONENTE APP
// ==========================================================================

function App() {
  // ========================================================================
  // ESTADO: NAVEGACIÓN
  // ========================================================================

  /**
   * Estado que controla qué vista se muestra actualmente
   *
   * VALORES POSIBLES:
   * - VIEWS.ALBUMS: Muestra la galería de álbumes
   * - VIEWS.PHOTOS: Muestra la galería de fotos
   *
   * CONCEPTO: Este estado controla el renderizado condicional de la app
   */
  const [currentView, setCurrentView] = useState(VIEWS.ALBUMS);

  // ========================================================================
  // ESTADO: DATOS PRINCIPALES (Albums y Photos)
  // ========================================================================

  /**
   * Estado de álbumes con LAZY INITIALIZATION
   *
   * CONCEPTO IMPORTANTE - Lazy Initialization:
   * Al pasar una FUNCIÓN a useState, React solo la ejecuta UNA VEZ
   * durante el montaje inicial. Esto es útil cuando la inicialización
   * es costosa (como leer de localStorage).
   *
   * FLUJO:
   * 1. Primera renderización: ejecuta getFromStorage()
   * 2. Siguientes renders: usa el valor del estado sin ejecutar la función
   *
   * ALTERNATIVA (menos eficiente):
   * useState(getFromStorage(STORAGE_KEYS.ALBUMS, albumsCollection))
   * Esto ejecutaría getFromStorage en CADA render
   */
  const [albums, setAlbums] = useState(() =>
    getFromStorage(STORAGE_KEYS.ALBUMS, albumsCollection)
  );

  /**
   * Estado de fotos con el mismo patrón de lazy initialization
   *
   * NOTA: Mantenemos albums y photos como estados separados porque
   * son entidades independientes en nuestra aplicación
   */
  const [photos, setPhotos] = useState(() =>
    getFromStorage(STORAGE_KEYS.PHOTOS, photosCollection)
  );

  // ========================================================================
  // ESTADO: MODAL DE ÁLBUMES
  // ========================================================================

  /**
   * Control de visibilidad del modal de álbumes
   * true = modal abierto, false = modal cerrado
   */
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  /**
   * Tipo de acción que se está realizando en el modal
   * "create" = crear nuevo álbum, "edit" = editar álbum existente
   *
   * CONCEPTO: Un modal que sirve para dos propósitos (crear/editar)
   */
  const [albumModalAction, setAlbumModalAction] = useState("create");

  /**
   * Álbum seleccionado para editar
   * null cuando estamos creando uno nuevo
   * Objeto álbum cuando estamos editando
   */
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // ========================================================================
  // ESTADO: MODAL DE FOTOS
  // ========================================================================

  /**
   * Estados para el modal de fotos (mismo patrón que álbumes)
   *
   * PATRÓN OBSERVADO: Los tres estados trabajan juntos:
   * 1. isPhotoModalOpen: Controla visibilidad
   * 2. photoModalAction: Define el comportamiento ("create" o "edit")
   * 3. selectedPhoto: Almacena los datos cuando editamos
   */
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoModalAction, setPhotoModalAction] = useState("create");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // ========================================================================
  // ESTADO: CARRUSEL DE ÁLBUM
  // ========================================================================

  /**
   * Estados para el modal del carrusel (presentación de diapositivas)
   *
   * isCarouselModalOpen: Controla si el carrusel está visible
   * carouselAlbum: El álbum cuyas fotos se están mostrando en el carrusel
   */
  const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
  const [carouselAlbum, setCarouselAlbum] = useState(null);

  // ========================================================================
  // ESTADO: DIÁLOGO DE CONFIRMACIÓN - ELIMINAR ÁLBUM
  // ========================================================================

  /**
   * Estados para el diálogo de confirmación al eliminar álbumes
   *
   * PATRÓN DE CONFIRMACIÓN:
   * Antes de realizar una acción destructiva (eliminar), pedimos confirmación.
   *
   * isConfirmDialogOpen: Muestra/oculta el diálogo
   * albumToDelete: Guarda temporalmente el álbum que se va a eliminar
   *                Si el usuario confirma, usamos este valor
   *                Si cancela, lo limpiamos (null)
   */
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);

  // ========================================================================
  // ESTADO: DIÁLOGO DE CONFIRMACIÓN - ELIMINAR FOTO
  // ========================================================================

  /**
   * Estados para el diálogo de confirmación al eliminar fotos
   * (Mismo patrón que eliminar álbumes, pero para fotos)
   *
   * NOTA IMPORTANTE: Tenemos diálogos separados para álbumes y fotos
   * porque pueden estar abiertos en contextos diferentes de la aplicación
   */
  const [isPhotoConfirmDialogOpen, setIsPhotoConfirmDialogOpen] =
    useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  // ========================================================================
  // ESTADO: VISOR DE FOTOS EN FULLSCREEN
  // ========================================================================

  /**
   * Estados para el visor de fotos en pantalla completa
   *
   * isPhotoViewerOpen: Controla si el visor está activo
   * photoToView: La foto que se está mostrando en pantalla completa
   */
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [photoToView, setPhotoToView] = useState(null);

  // ========================================================================
  // EFECTOS: PERSISTENCIA DE DATOS CON useEffect
  // ========================================================================

  /**
   * useEffect #1: Auto-guardar álbumes en localStorage
   *
   * CONCEPTO CLAVE - useEffect:
   * useEffect permite ejecutar código después de que el componente se renderiza.
   * Es perfecto para "efectos secundarios" como guardar en localStorage.
   *
   * ANATOMÍA:
   * useEffect(() => {
   *   // Código a ejecutar
   * }, [dependencias]);
   *
   * FLUJO DE EJECUCIÓN:
   * 1. El componente se renderiza
   * 2. React compara el valor actual de 'albums' con el valor anterior
   * 3. Si cambió, ejecuta saveToStorage()
   * 4. Los datos se guardan automáticamente
   *
   * DEPENDENCIAS: [albums]
   * - Este efecto solo se ejecuta cuando 'albums' cambia
   * - Sin las dependencias, se ejecutaría en cada render (ineficiente)
   * - Con [], solo se ejecutaría una vez al montar (no serviría para guardar cambios)
   *
   * RESULTADO: Auto-save automático. ¡El usuario nunca pierde sus datos!
   */
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ALBUMS, albums);
  }, [albums]);

  /**
   * useEffect #2: Auto-guardar fotos en localStorage
   *
   * NOTA: Mantenemos dos useEffect separados (uno para albums, otro para photos)
   * porque son entidades independientes. Esto también hace el código más claro
   * y fácil de mantener.
   *
   * ALTERNATIVA (no recomendada):
   * useEffect(() => {
   *   saveToStorage(STORAGE_KEYS.ALBUMS, albums);
   *   saveToStorage(STORAGE_KEYS.PHOTOS, photos);
   * }, [albums, photos]);
   *
   * Esto funcionaría, pero se ejecutaría cuando CUALQUIERA cambie,
   * guardando ambos incluso si solo uno cambió.
   */
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PHOTOS, photos);
  }, [photos]);

  // ========================================================================
  // HANDLERS: NAVEGACIÓN
  // ========================================================================

  /**
   * handleViewChange - Maneja el cambio de vista principal
   *
   * @param {string} newView - La nueva vista a mostrar (ej: VIEWS.ALBUMS, VIEWS.PHOTOS)
   *
   * CONCEPTO - Lifting State Up:
   * Esta función se pasa como prop al componente Layout (NavBar).
   * Cuando el usuario hace clic en el NavBar, llama a esta función.
   * Así el estado vive en App (padre) pero se controla desde NavBar (hijo).
   *
   * LÓGICA ESPECIAL:
   * Algunas "vistas" en realidad abren modales en lugar de cambiar la vista:
   * - VIEWS.NEW_ALBUM → Abre modal de crear álbum
   * - VIEWS.NEW_PHOTO → Abre modal de crear foto
   * - Otras vistas → Cambian la vista realmente
   *
   * FLUJO:
   * 1. Usuario hace clic en NavBar
   * 2. NavBar llama onViewChange(nuevaVista)
   * 3. Esta función decide si cambiar vista o abrir modal
   * 4. Se actualiza el estado correspondiente
   * 5. React re-renderiza mostrando la nueva vista/modal
   */
  const handleViewChange = (newView) => {
    // Si es una acción de crear/editar, abrir modal en lugar de cambiar vista
    if (newView === VIEWS.NEW_ALBUM) {
      // Configurar modal para CREAR álbum
      setAlbumModalAction("create");
      setSelectedAlbum(null); // null porque no hay álbum seleccionado
      setIsAlbumModalOpen(true);
    } else if (newView === VIEWS.NEW_PHOTO) {
      // Configurar modal para CREAR foto
      setPhotoModalAction("create");
      setSelectedPhoto(null);
      setIsPhotoModalOpen(true);
    } else {
      // Para otras vistas, simplemente cambiar la vista actual
      setCurrentView(newView);
    }
  };

  // ========================================================================
  // HANDLERS: GESTIÓN DE ÁLBUMES
  // ========================================================================

  /**
   * handleEditAlbum - Abre el modal para EDITAR un álbum existente
   *
   * @param {Object} album - El álbum que se va a editar
   *
   * FLUJO:
   * 1. Usuario hace clic en "Editar" en una tarjeta de álbum
   * 2. El componente Albums llama a onEditAlbum(album)
   * 3. Esta función recibe el álbum y configura el modal:
   *    - Modo "edit" (no "create")
   *    - Guarda el álbum seleccionado
   *    - Abre el modal
   * 4. El modal EditAlbum usa estos datos para pre-llenar el formulario
   *
   * CONCEPTO - Callback Props:
   * Esta función se pasa como prop 'onEditAlbum' al componente Albums
   */
  const handleEditAlbum = (album) => {
    setAlbumModalAction("edit");
    setSelectedAlbum(album);
    setIsAlbumModalOpen(true);
  };

  /**
   * handlePlayAlbum - Abre el carrusel de fotos de un álbum
   *
   * @param {Object} album - El álbum cuyas fotos se mostrarán
   *
   * PROPÓSITO: Mostrar todas las fotos del álbum en modo presentación
   */
  const handlePlayAlbum = (album) => {
    setCarouselAlbum(album);
    setIsCarouselModalOpen(true);
  };

  /**
   * handleDeleteAlbum - Inicia el proceso de eliminación de un álbum
   *
   * @param {Object} album - El álbum que se quiere eliminar
   *
   * IMPORTANTE: Esta función NO elimina directamente.
   * Solo prepara el diálogo de confirmación.
   * La eliminación real ocurre en handleConfirmDeleteAlbum()
   *
   * PATRÓN: Confirmación antes de acción destructiva
   */
  const handleDeleteAlbum = (album) => {
    setAlbumToDelete(album);
    setIsConfirmDialogOpen(true);
  };

  /**
   * handleConfirmDeleteAlbum - Elimina el álbum después de confirmación
   *
   * CONCEPTO CLAVE - Inmutabilidad:
   * NO modificamos el array 'albums' directamente.
   * Creamos un NUEVO array sin el álbum eliminado.
   *
   * FLUJO:
   * 1. Usuario confirma la eliminación en el diálogo
   * 2. Esta función se ejecuta
   * 3. Filtramos el array eliminando el álbum con el ID específico
   * 4. Actualizamos el estado con setAlbums()
   * 5. React detecta el cambio y re-renderiza
   * 6. useEffect detecta el cambio y guarda en localStorage
   * 7. Limpiamos los estados temporales
   *
   * POR QUÉ USAR FILTER:
   * filter() crea un NUEVO array. No modifica el original.
   * React necesita un nuevo array para detectar el cambio.
   *
   * LOGS: Para debugging y seguimiento en desarrollo
   */
  const handleConfirmDeleteAlbum = () => {
    if (albumToDelete) {
      // INMUTABILIDAD: Crear nuevo array sin el álbum eliminado
      const updatedAlbums = albums.filter((a) => a.id !== albumToDelete.id);
      setAlbums(updatedAlbums);

      // Logs informativos para desarrollo
      console.log(`Álbum "${albumToDelete.title}" eliminado exitosamente`);
      console.log(`Número de álbumes restantes: ${updatedAlbums.length}`);
    }

    // IMPORTANTE: Limpiar estados temporales
    // Esto previene que el diálogo muestre datos viejos la próxima vez
    setIsConfirmDialogOpen(false);
    setAlbumToDelete(null);
  };

  /**
   * handleCancelDeleteAlbum - Usuario cancela la eliminación
   *
   * PROPÓSITO: Cerrar el diálogo y limpiar estados sin eliminar nada
   */
  const handleCancelDeleteAlbum = () => {
    setIsConfirmDialogOpen(false);
    setAlbumToDelete(null);
  };

  // ========================================================================
  // HANDLERS: GESTIÓN DE FOTOS - ELIMINACIÓN
  // ========================================================================

  /**
   * handleDeletePhoto - Inicia el proceso de eliminación de una foto
   *
   * @param {Object} photo - La foto que se quiere eliminar
   *
   * Mismo patrón que handleDeleteAlbum
   */
  const handleDeletePhoto = (photo) => {
    setPhotoToDelete(photo);
    setIsPhotoConfirmDialogOpen(true);
  };

  /**
   * handleConfirmDeletePhoto - Elimina la foto después de confirmación
   *
   * DIFERENCIA CON handleConfirmDeleteAlbum:
   * Aquí usamos la forma de FUNCIÓN UPDATER en setPhotos()
   *
   * CONCEPTO - Función Updater:
   * setPhotos(prevPhotos => ...)
   *
   * CUÁNDO USAR FUNCIÓN UPDATER:
   * - Cuando el nuevo estado depende del estado anterior
   * - Garantiza que siempre trabajas con el valor más reciente
   * - Previene problemas de sincronización
   *
   * ALTERNATIVA (también válida):
   * const updatedPhotos = photos.filter(p => p.id !== photoToDelete.id);
   * setPhotos(updatedPhotos);
   *
   * AMBAS FORMAS SON CORRECTAS. La función updater es más "segura".
   */
  const handleConfirmDeletePhoto = () => {
    if (photoToDelete) {
      // FUNCIÓN UPDATER: Recibe el estado anterior como parámetro
      setPhotos((prevPhotos) =>
        prevPhotos.filter((p) => p.id !== photoToDelete.id)
      );

      console.log(`Foto "${photoToDelete.title}" eliminada exitosamente`);
    }

    // Limpiar estados temporales
    setIsPhotoConfirmDialogOpen(false);
    setPhotoToDelete(null);
  };

  /**
   * handleCancelDeletePhoto - Usuario cancela la eliminación de foto
   */
  const handleCancelDeletePhoto = () => {
    setIsPhotoConfirmDialogOpen(false);
    setPhotoToDelete(null);
  };

  // ========================================================================
  // HANDLERS: VISOR DE FOTOS FULLSCREEN
  // ========================================================================

  /**
   * handleViewPhoto - Abre el visor de fotos en pantalla completa
   *
   * @param {Object} photo - La foto a mostrar en fullscreen
   */
  const handleViewPhoto = (photo) => {
    setPhotoToView(photo);
    setIsPhotoViewerOpen(true);
  };

  /**
   * handleClosePhotoViewer - Cierra el visor de fotos
   *
   * IMPORTANTE: Limpiar ambos estados (visibilidad y foto)
   */
  const handleClosePhotoViewer = () => {
    setIsPhotoViewerOpen(false);
    setPhotoToView(null);
  };

  // ========================================================================
  // HANDLERS: GESTIÓN DE ÁLBUMES - CREAR/EDITAR
  // ========================================================================

  /**
   * handleSaveAlbum - Guarda un álbum (crear nuevo o actualizar existente)
   *
   * @param {Object} albumData - Datos del álbum del formulario
   *
   * CONCEPTO: Una función, dos comportamientos
   * Dependiendo de 'albumModalAction', esta función crea o edita.
   *
   * FLUJO CREAR:
   * 1. Usuario llena formulario y da "Guardar"
   * 2. EditAlbum llama onSaveAlbum(datosDelFormulario)
   * 3. Creamos objeto completo con ID y timestamp
   * 4. Agregamos al array con spread operator (inmutabilidad)
   * 5. React re-renderiza, useEffect guarda en localStorage
   *
   * FLUJO EDITAR:
   * 1. Usuario modifica formulario pre-llenado y da "Guardar"
   * 2. EditAlbum llama onSaveAlbum(datosActualizados)
   * 3. Usamos map() para crear nuevo array
   * 4. Solo actualizamos el álbum que coincide con el ID
   * 5. Agregamos timestamp 'updatedAt'
   *
   * INMUTABILIDAD EN ACCIÓN:
   * - Crear: [...prevAlbums, newAlbum]
   * - Editar: albums.map(album => condición ? actualizado : original)
   */
  const handleSaveAlbum = (albumData) => {
    if (albumModalAction === "create") {
      // CREAR NUEVO ÁLBUM
      const newAlbum = {
        ...albumData, // Spread: Copia todas las propiedades de albumData
        id: Date.now(), // ID único usando timestamp
        createdAt: new Date().toISOString(), // Fecha de creación
      };
      // Agregar al array existente (inmutabilidad)
      setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
    } else {
      // EDITAR ÁLBUM EXISTENTE
      setAlbums((prevAlbums) =>
        prevAlbums.map(
          (album) =>
            album.id === selectedAlbum.id
              ? {
                  ...album, // Mantener propiedades originales
                  ...albumData, // Sobrescribir con nuevos datos
                  updatedAt: new Date().toISOString(), // Timestamp de edición
                }
              : album // Dejar sin cambios los demás álbumes
        )
      );
    }
    // Cerrar modal después de guardar
    setIsAlbumModalOpen(false);
  };

  /**
   * handleCloseAlbumModal - Cierra el modal sin guardar
   *
   * Usuario presiona "Cancelar" o hace clic fuera del modal
   */
  const handleCloseAlbumModal = () => {
    setIsAlbumModalOpen(false);
    setSelectedAlbum(null);
  };

  // ========================================================================
  // HANDLERS: GESTIÓN DE FOTOS - CREAR/EDITAR
  // ========================================================================

  /**
   * handleEditPhoto - Abre el modal para editar una foto
   *
   * @param {Object} photo - La foto a editar
   *
   * Mismo patrón que handleEditAlbum
   */
  const handleEditPhoto = (photo) => {
    setPhotoModalAction("edit");
    setSelectedPhoto(photo);
    setIsPhotoModalOpen(true);
  };

  /**
   * handleSavePhoto - Guarda una foto (crear o editar)
   *
   * @param {Object} photoData - Datos de la foto del formulario
   *
   * MISMO PATRÓN que handleSaveAlbum:
   * - Usa photoModalAction para decidir si crear o editar
   * - Mantiene inmutabilidad con spread y map
   * - Agrega timestamps automáticamente
   */
  const handleSavePhoto = (photoData) => {
    if (photoModalAction === "create") {
      // CREAR NUEVA FOTO
      const newPhoto = {
        ...photoData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    } else {
      // EDITAR FOTO EXISTENTE
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === selectedPhoto.id
            ? {
                ...photo,
                ...photoData,
                updatedAt: new Date().toISOString(),
              }
            : photo
        )
      );
    }
    setIsPhotoModalOpen(false);
  };

  /**
   * handleClosePhotoModal - Cierra el modal de fotos sin guardar
   */
  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedPhoto(null);
  };

  /**
   * handleCloseCarousel - Cierra el modal del carrusel
   */
  const handleCloseCarousel = () => {
    setIsCarouselModalOpen(false);
    setCarouselAlbum(null);
  };

  // ========================================================================
  // RENDERIZADO CONDICIONAL: VISTA ACTUAL
  // ========================================================================

  /**
   * renderCurrentView - Renderiza la vista actual basándose en el estado
   *
   * CONCEPTO - Renderizado Condicional:
   * Dependiendo del valor de 'currentView', mostramos un componente diferente.
   *
   * FLUJO:
   * 1. currentView contiene VIEWS.ALBUMS o VIEWS.PHOTOS
   * 2. switch evalúa el valor
   * 3. Retorna el componente JSX correspondiente
   * 4. Ese JSX se inserta en el return principal
   *
   * PROPS PASADOS:
   * - Datos: albums, photos (para mostrar)
   * - Callbacks: onEditAlbum, onDeleteAlbum, etc. (para interactuar)
   *
   * CONCEPTO - Props Callback (Funciones como Props):
   * Los componentes hijos no pueden modificar el estado directamente.
   * Les pasamos funciones que SÍ pueden hacerlo.
   * Cuando el hijo llama a la función, el estado se actualiza aquí (padre).
   *
   * EJEMPLO DE FLUJO COMPLETO:
   * 1. Usuario hace clic en "Eliminar" en una tarjeta de álbum
   * 2. Albums llama a onDeleteAlbum(album)
   * 3. Se ejecuta handleDeleteAlbum aquí
   * 4. Se actualiza el estado
   * 5. React re-renderiza todo
   *
   * Esto es "Lifting State Up" en acción.
   */
  const renderCurrentView = () => {
    switch (currentView) {
      case VIEWS.ALBUMS:
        return (
          <Albums
            albums={albums} // PROP: Datos a mostrar
            onEditAlbum={handleEditAlbum} // PROP: Callback para editar
            onPlayAlbum={handlePlayAlbum} // PROP: Callback para carrusel
            onDeleteAlbum={handleDeleteAlbum} // PROP: Callback para eliminar
          />
        );
      case VIEWS.PHOTOS:
        return (
          <Photos
            photos={photos}
            onEditPhoto={handleEditPhoto}
            onDeletePhoto={handleDeletePhoto}
            onViewPhoto={handleViewPhoto}
          />
        );
      default:
        // Vista por defecto: Albums
        return (
          <Albums
            albums={albums}
            onEditAlbum={handleEditAlbum}
            onPlayAlbum={handlePlayAlbum}
            onDeleteAlbum={handleDeleteAlbum}
          />
        );
    }
  };

  // ========================================================================
  // RENDER PRINCIPAL
  // ========================================================================

  /**
   * ESTRUCTURA DEL JSX:
   *
   * <App>
   *   <Layout> (NavBar + contenedor principal)
   *     {Vista actual} (Albums o Photos)
   *   </Layout>
   *
   *   <EditAlbum /> (Modal flotante)
   *   <EditPhoto /> (Modal flotante)
   *   <AlbumCarousel /> (Modal flotante)
   *   <ConfirmDialog /> x2 (Modales de confirmación)
   *   <PhotoViewer /> (Modal fullscreen)
   * </App>
   *
   * PATRÓN OBSERVADO:
   * - Layout envuelve el contenido principal
   * - Los modales están al mismo nivel, fuera del Layout
   * - Cada modal controla su propia visibilidad con isOpen
   * - Los modales están en el DOM pero ocultos (display: none)
   *
   * VENTAJA DE ESTE PATRÓN:
   * Los modales pueden superponerse a cualquier contenido
   * porque están al nivel raíz del App.
   */
  return (
    <div className="App">
      {/* ============================================================
          LAYOUT PRINCIPAL CON CONTENIDO
          ============================================================

          Layout: Estructura principal (NavBar + contenido)

          PROPS:
          - currentView: Para resaltar la opción activa en NavBar
          - onViewChange: Callback cuando usuario cambia de vista
          - albums, photos: Para mostrar contadores en StatusBar

          CHILDREN:
          - {renderCurrentView()}: El contenido dinámico (Albums o Photos)

          CONCEPTO - Children Prop:
          Layout no sabe qué contenido va a recibir.
          Simplemente lo envuelve y lo muestra donde corresponda.
          Esto hace a Layout reutilizable.
       */}
      <Layout
        currentView={currentView}
        onViewChange={handleViewChange}
        albums={albums}
        photos={photos}
      >
        {renderCurrentView()}
      </Layout>

      {/* ============================================================
          MODALES DE EDICIÓN
          ============================================================

          Modal de Álbumes (Crear/Editar)

          PROPS IMPORTANTES:
          - isOpen: Controla visibilidad (true/false)
          - action: "create" o "edit" (cambia el comportamiento del modal)
          - album: Los datos pre-llenados (null si es crear)
          - onSaveAlbum: Callback cuando usuario guarda
          - onCancel: Callback cuando usuario cancela

          CONCEPTO: Modal Controlado
          El modal no maneja su propio estado de visibilidad.
          El padre (App) lo controla completamente.
       */}
      <EditAlbum
        isOpen={isAlbumModalOpen}
        action={albumModalAction}
        album={selectedAlbum}
        onSaveAlbum={handleSaveAlbum}
        onCancel={handleCloseAlbumModal}
      />

      {/* Modal de Fotos (Crear/Editar) - Mismo patrón que EditAlbum */}
      <EditPhoto
        isOpen={isPhotoModalOpen}
        action={photoModalAction}
        photo={selectedPhoto}
        onSavePhoto={handleSavePhoto}
        onCancel={handleClosePhotoModal}
      />

      {/* ============================================================
          MODAL DE CARRUSEL
          ============================================================

          Modal del Carrusel de Álbum
          Muestra las fotos del álbum en modo presentación
       */}
      <AlbumCarousel
        isOpen={isCarouselModalOpen}
        album={carouselAlbum}
        onClose={handleCloseCarousel}
      />

      {/* ============================================================
          DIÁLOGOS DE CONFIRMACIÓN
          ============================================================

          Diálogo de confirmación para ELIMINAR ÁLBUM

          PROPÓSITO: Prevenir eliminaciones accidentales

          PROPS:
          - type: "danger" (colorea de rojo para indicar peligro)
          - title: Título del diálogo
          - message: Mensaje descriptivo (usa template string)
          - confirmText, cancelText: Textos de los botones
          - onConfirm, onCancel: Callbacks para cada acción

          NOTA: El mensaje es dinámico (usa albumToDelete.title)
          Por eso validamos con operador ternario
       */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        type="danger"
        title="Eliminar álbum"
        message={
          albumToDelete
            ? `¿Estás seguro de que quieres eliminar el álbum "${albumToDelete.title}"?\n\nEsta acción también eliminará todas las fotos asociadas y no se puede deshacer.`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDeleteAlbum}
        onCancel={handleCancelDeleteAlbum}
      />

      {/* Diálogo de confirmación para ELIMINAR FOTO - Mismo patrón que el diálogo de álbum */}
      <ConfirmDialog
        isOpen={isPhotoConfirmDialogOpen}
        type="danger"
        title="Eliminar foto"
        message={
          photoToDelete
            ? `¿Estás seguro de que quieres eliminar la foto "${photoToDelete.title}"?\n\nEsta acción no se puede deshacer.`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDeletePhoto}
        onCancel={handleCancelDeletePhoto}
      />

      {/* ============================================================
          VISOR DE FOTOS FULLSCREEN
          ============================================================

          PhotoViewer: Muestra una foto en pantalla completa

          FUNCIONALIDAD:
          - Overlay oscuro de fondo
          - Foto centrada
          - Botón para cerrar
       */}
      <PhotoViewer
        isOpen={isPhotoViewerOpen}
        photo={photoToView}
        onClose={handleClosePhotoViewer}
      />
    </div>
  );
}

// ==========================================================================
// EXPORTACIÓN
// ==========================================================================

/**
 * Exportamos App como default export
 * Esto permite importarlo así: import App from './App'
 */
export default App;

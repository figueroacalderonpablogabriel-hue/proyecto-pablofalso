import { obtenerProductosAPI } from './api.js';
import { renderizarProductos } from './style.js';
import { cargarCarrito, agregarAlCarrito } from './cart.js';

// Variable global donde guardamos la lista original de la API
let listaGlobalProductos = [];

// Función para iniciar la aplicación
async function iniciarApp() {
  // 1. Cargamos el carrito que estaba en el navegador
  cargarCarrito();

  // 2. Traemos los productos del servidor
  listaGlobalProductos = await obtenerProductosAPI();

  // 3. Los pintamos en la pantalla por primera vez
  renderizarProductos(listaGlobalProductos, agregarAlCarrito);

  // 4. Activamos los detectores de eventos (búsqueda y orden)
  activarEventos();
}

// Función para filtrar y ordenar lo que ve el usuario
function filtrarYOrdenar() {
  const textoBuscado = document.getElementById('search-input').value.toLowerCase().trim();
  const tipoOrden = document.getElementById('sort-select').value;

  // Paso 1: Filtramos los productos por el título
  let resultados = listaGlobalProductos.filter(producto => {
    return producto.title.toLowerCase().includes(textoBuscado);
  });

  // Paso 2: Ordenamos según la opción seleccionada en el menú desplegable
  if (tipoOrden === 'asc') {
    resultados.sort((a, b) => a.price - b.price); // De menor a mayor precio
  } else if (tipoOrden === 'desc') {
    resultados.sort((a, b) => b.price - a.price); // De mayor a menor precio
  }

  // Paso 3: Volvemos a renderizar la pantalla con los datos filtrados
  renderizarProductos(resultados, agregarAlCarrito);
}

// Función para escuchar cuando el usuario escribe o cambia el orden
function activarEventos() {
  const inputBusqueda = document.getElementById('search-input');
  const selectOrden = document.getElementById('sort-select');

  if (inputBusqueda) {
    inputBusqueda.addEventListener('input', filtrarYOrdenar);
  }

  if (selectOrden) {
    selectOrden.addEventListener('change', filtrarYOrdenar);
  }
}

// Arrancamos todo cuando el HTML termine de cargar
document.addEventListener('DOMContentLoaded', iniciarApp);



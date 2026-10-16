let carrito = [];


export function cargarCarrito() {
  const guardado = localStorage.getItem('carritoTienda');
  if (guardado) {
    carrito = JSON.parse(guardado);
  }
  return carrito;
}


function guardarEnLocalStorage() {
  localStorage.setItem('carritoTienda', JSON.stringify(carrito));
}


export function agregarAlCarrito(producto) {
  
  const productoExistente = carrito.find(item => item.id === producto.id);

  if (productoExistente) {
    
    productoExistente.quantity += 1;
  } else {
    
    carrito.push({ ...producto, quantity: 1 });
  }

  guardarEnLocalStorage();
}


export function calcularTotal() {
  const total = carrito.reduce((acumulador, item) => {
    return acumulador + (item.price * item.quantity);
  }, 0);

  return total.toFixed(2);
} 
//hola mundo 
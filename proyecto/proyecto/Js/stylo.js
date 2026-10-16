export function renderizarProductos(productos, funcionAgregarAlCarrito) {
    const contenedor = document.getElementById('product-grid');
    contenedor.innerHTML = ''; 
  
    if (productos.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron productos.</p>';
      return;
    }
  
    productos.forEach(producto => {
      
      const card = document.createElement('article');
      card.className = 'product-card';
   
      card.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <p>$${producto.price}</p>
        <button class="btn-add" data-id="${producto.id}">Agregar al carrito</button>
      `;
  
      const boton = card.querySelector('.btn-add');
      boton.addEventListener('click', () => {
        funcionAgregarAlCarrito(producto);
      });
  
      contenedor.appendChild(card);
    });
  }
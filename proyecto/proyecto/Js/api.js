export async function obtenerProductosAPI() {
    try {
      const respuesta = await fetch('https://fakestoreapi.com/products');
      
      
      if (!respuesta.ok) {
        throw new Error('Error al conectar con la API');
      }
      
      
      const datos = await respuesta.json();
      return datos;
      
    } catch (error) {
      console.error("Hubo un problema:", error);
      return []; 
    }
  }
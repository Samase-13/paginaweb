const API_URL = 'http://127.0.0.1:5000/api';

/**
 * Obtiene todos los productos desde la API.
 * @returns {Promise<Array>} Lista de productos.
 */
export async function obtenerProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error; // Propagar el error
    }
}

/**
 * Agrega un nuevo producto a la API (opcional para pruebas).
 * @param {Object} producto Datos del producto.
 * @returns {Promise<Object>} Respuesta de la API.
 */
export async function agregarProducto(producto) {
    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });

        if (!response.ok) {
            throw new Error(`Error al agregar producto: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error; // Propagar el error
    }
}

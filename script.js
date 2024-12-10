import { obtenerProductos } from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.querySelector('.product-grid');
    const carritoPanel = document.getElementById('carrito-panel');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para cargar y mostrar los productos
    async function cargarProductos() {
        try {
            const productos = await obtenerProductos();

            // Renderizar los productos en la página
            productos.forEach(producto => {
                const productHTML = `
                    <div class="producto" data-id="${producto.id}">
                        <img src="${producto.img}" alt="${producto.name}">
                        <h3>${producto.name}</h3>
                        <p>S/${producto.price.toFixed(2)}</p>
                        <button class="btn-comprar">Añadir al carrito</button>
                    </div>
                `;
                productContainer.innerHTML += productHTML;
            });

            // Añadir eventos a los botones después de renderizar
            agregarEventosCarrito();
        } catch (error) {
            productContainer.innerHTML = `<p>Error al cargar productos. Intenta nuevamente más tarde.</p>`;
            console.error(error);
        }
    }

    // Función para manejar los eventos "Añadir al carrito"
    function agregarEventosCarrito() {
        const botonesComprar = document.querySelectorAll('.btn-comprar');

        botonesComprar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const productoElemento = e.target.closest('.producto');
                const id = productoElemento.dataset.id;
                const name = productoElemento.querySelector('h3').textContent;
                const price = parseFloat(productoElemento.querySelector('p').textContent.replace('S/', ''));
                const img = productoElemento.querySelector('img').src;

                // Verificar si el producto ya está en el carrito
                const productoExistente = carrito.find(item => item.id === id);

                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({
                        id,
                        name,
                        price,
                        img,
                        cantidad: 1
                    });
                }

                // Guardar el carrito en localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));

                // Actualizar la interfaz del carrito
                mostrarCarrito();
            });
        });
    }

    // Función para mostrar los productos en el carrito
    function mostrarCarrito() {
        carritoItems.innerHTML = ''; // Limpiar el carrito actual

        let total = 0;

        carrito.forEach(producto => {
            const itemHTML = `
                <div class="carrito-item">
                    <img src="${producto.img}" alt="${producto.name}" class="carrito-img">
                    <div>
                        <p>${producto.name}</p>
                        <p>S/${producto.price.toFixed(2)} x ${producto.cantidad}</p>
                        <p>Subtotal: S/${(producto.price * producto.cantidad).toFixed(2)}</p>
                    </div>
                </div>
            `;
            carritoItems.innerHTML += itemHTML;

            // Calcular el total
            total += producto.price * producto.cantidad;
        });

        // Actualizar el total
        carritoTotal.textContent = `S/${total.toFixed(2)}`;
    }

    // Cerrar el carrito
    document.getElementById('cerrar-carrito').addEventListener('click', () => {
        carritoPanel.classList.remove('activo');
    });

    // Mostrar carrito al inicio si hay productos
    mostrarCarrito();

    // Cargar productos al iniciar
    await cargarProductos();
});

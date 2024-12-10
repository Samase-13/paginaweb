document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    const cartCountElement = document.getElementById('cart-count');
    const productos = document.querySelectorAll('.producto .btn-comprar');

    // Estado del carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para guardar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para actualizar el contador del carrito
    function actualizarContador() {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        cartCountElement.textContent = totalItems;
    }

    // Función para calcular y mostrar el total
    function calcularTotal() {
        const total = carrito.reduce((acc, item) => acc + item.cantidad * item.price, 0);
        carritoTotal.textContent = `S/${total.toFixed(2)}`;
    }

    // Función para mostrar los productos en el carrito
    function mostrarCarrito() {
        carritoItems.innerHTML = ''; // Limpiar el carrito

        if (carrito.length === 0) {
            carritoItems.innerHTML = `<p style="text-align: center;">Tu carrito está vacío.</p>`;
            return;
        }

        carrito.forEach((producto) => {
            const item = document.createElement('div');
            item.classList.add('carrito-item');
            item.innerHTML = `
                <img src="${producto.img}" alt="${producto.name}" class="carrito-img">
                <div>
                    <p>${producto.name}</p>
                    <p>Subtotal: S/<span class="subtotal">${(producto.price * producto.cantidad).toFixed(2)}</span></p>
                </div>
                <div class="carrito-item-controls">
                    <button class="decrementar">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="incrementar">+</button>
                    <button class="eliminar">Eliminar</button>
                </div>
            `;

            // Agregar eventos
            const incrementarBtn = item.querySelector('.incrementar');
            const decrementarBtn = item.querySelector('.decrementar');
            const eliminarBtn = item.querySelector('.eliminar');

            incrementarBtn.addEventListener('click', () => incrementarCantidad(producto));
            decrementarBtn.addEventListener('click', () => decrementarCantidad(producto));
            eliminarBtn.addEventListener('click', () => eliminarProducto(producto));

            carritoItems.appendChild(item);
        });

        calcularTotal();
        actualizarContador();
    }

    // Función para incrementar la cantidad de un producto
    function incrementarCantidad(producto) {
        producto.cantidad++;
        guardarCarrito();
        mostrarCarrito();
    }

    // Función para decrementar la cantidad de un producto
    function decrementarCantidad(producto) {
        if (producto.cantidad > 1) {
            producto.cantidad--;
            guardarCarrito();
            mostrarCarrito();
        }
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(producto) {
        carrito = carrito.filter((item) => item.name !== producto.name);
        guardarCarrito();
        mostrarCarrito();
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        const existe = carrito.find((item) => item.name === producto.name);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        guardarCarrito();
        mostrarCarrito();
    }

    // Manejo del evento de añadir al carrito
    productos.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const productoElemento = e.target.closest('.producto');
            const producto = {
                name: productoElemento.querySelector('h3').textContent,
                price: parseFloat(productoElemento.querySelector('p').textContent.replace('S/', '')),
                img: productoElemento.querySelector('img').src,
            };

            agregarAlCarrito(producto);
            carritoPanel.classList.add('active'); // Abrir el carrito
        });
    });

    // Cerrar el carrito
    cerrarCarritoBtn.addEventListener('click', () => {
        carritoPanel.classList.remove('active');
    });

    // Mostrar el carrito inicial
    mostrarCarrito();
});

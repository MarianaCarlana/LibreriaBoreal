const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.getElementById("carrito");

if (carrito.length === 0) {
    contenedor.innerHTML = `
        <h2 class="carrito-vacio">
            ¡Houston, ocurrió un problema! <br>
            Tu carrito de compras está vacío
        </h2>
    `;
}

let total = 0; 

carrito.forEach(producto => {
    
    total += producto.precio * producto.cantidad;
    console.log(producto);
    contenedor.innerHTML += `
        <div class="item-carrito">
            <img src="${producto.imagen}" alt="${producto.titulo}">

            <div class="info-carrito">
                <h3>${producto.titulo}</h3>
                <p>Precio Unitario: $${producto.precio.toLocaleString("es-AR")}</p>

                <div class="cantidad">
                    <p>Cantidad: </p>
                    <button onclick="cambiarCantidad('${producto.titulo}', -1)">➖</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="cambiarCantidad('${producto.titulo}', 1)">➕</button>

                </div>
                <p>Precio Total: $${(producto.precio * producto.cantidad).toLocaleString('es-AR')}</p>
            </div>
        </div>

    `;
});

document.getElementById("total").textContent =
    `Total: $${total.toLocaleString('es-AR')}`;

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    location.reload();
}

function cambiarCantidad(titulo, cambio) {

    const carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find(
        item => item.titulo === titulo
    );

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        const indice = carrito.findIndex(
            item => item.titulo === titulo
        );

        carrito.splice(indice, 1);
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    location.reload();
    
    
}

function actualizarContadorCarrito() {

    const carrito =JSON.parse(localStorage.getItem("carrito")) || [];
    let cantidadTotal = 0;
    carrito.forEach(producto => {cantidadTotal += producto.cantidad;
    });

    document.getElementById("contador-carrito").textContent =cantidadTotal;
}

actualizarContadorCarrito();
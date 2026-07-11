console.log("Script cargado")


async function encontrarLibros() {
    try {
        const response = await fetch("https://openlibrary.org/search.json?q=romance");
        const datos = await response.json();
        console.log(datos);
        const contenedor = document.getElementById("card-libro");
        console.log(contenedor);

        contenedor.innerHTML = "";
        datos.docs.slice(0, 12).forEach(libro => {
            const titulo = libro.title || "Sin título";
            const autor = libro.author_name?.join(", ") || "Autor desconocido";
            const imagen = libro.cover_i
                ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`: "img/Sin_portada.jpg";
            const precio = Math.floor(Math.random() * 25000) + 15000 ;


            contenedor.innerHTML += `
                <div class="card-libro">
                    <img src="${imagen}" alt="${titulo}">
                    <h3>${titulo}</h3>
                    <p>${autor}</p>
                    <span>$${precio.toLocaleString('es-AR')}</span>
                    <button onclick='agregarAlCarrito(
                    ${JSON.stringify(titulo)}, ${precio}, ${JSON.stringify(imagen)})'> Comprar </button>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

encontrarLibros();


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function agregarAlCarrito(titulo,precio,imagen) {
    const producto = {
        titulo, 
        precio, 
        imagen, 
        cantidad: 1
    };
    const existente = carrito.find(item=> item.titulo === titulo);
    if(existente){
        existente.cantidad++ ;}
    else{
        carrito.push(producto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Libro agregado exitosamente!");
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {

    const carrito =JSON.parse(localStorage.getItem("carrito")) || [];
    let cantidadTotal = 0;
    carrito.forEach(producto => {cantidadTotal += producto.cantidad;
    });

    document.getElementById("contador-carrito").textContent =cantidadTotal;
}

encontrarLibros();
actualizarContadorCarrito();

const formulario = document.getElementById("form-contacto");

if (formulario) {

        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoEmail.test(email)) {
            e.preventDefault();
            alert("Ingrese un email válido.");
        }
}
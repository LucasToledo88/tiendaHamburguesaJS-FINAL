let productos = [];
async function leerProductos() {
  const productosResp = await fetch('./productos.json');
  const productosJson = await productosResp.json();
  productos = productosJson;
}


let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(index) {
  var producto = productos[index]
  const productoEnCarrito = carrito.find(p => p.nombre === producto.nombre);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }

  guardarCarrito();
  mostrarCarrito();
  calcularTotal();
}

function mostrarProductos() {
  const hamburguesasDiv = document.getElementById("hamburguesas");
  const papasDiv = document.getElementById("papas");

  productos.forEach((producto, index) => {
    const { nombre, precio, imagen } = producto;
    const img = `<img src="${imagen}" alt="${nombre}" style="width: 100px;">`;
    const btn = `<button onclick="agregarAlCarrito(${index})">Agregar</button>`;
    const productoHTML = `<div class="producto">${img}<p>${nombre} - $${precio}</p>${btn}</div>`;

    if (nombre.includes("Hamburguesa")) {
      hamburguesasDiv.innerHTML += productoHTML;
    } else {
      papasDiv.innerHTML += productoHTML;
    }
  });
}

function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.innerHTML = "";

  carrito.forEach((producto, index) => {
    const { nombre, precio, cantidad } = producto;
    carritoDiv.innerHTML += `<p>${nombre} - $${precio} x ${cantidad} <button onclick="eliminarDelCarrito(${index})">Eliminar</button> <button onclick="cambiarCantidad(${index}, 1)">+</button> <button onclick="cambiarCantidad(${index}, -1)">-</button></p>`;
  });
}

function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito();
  mostrarCarrito();
  calcularTotal();
}

function calcularTotal() {
  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );
  document.getElementById("total").innerText = total;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
  calcularTotal();
}

function comprar() {
  if (carrito.length === 0) {

    const modal = document.getElementById("modalCarritoVacio");
    modal.style.display = "block";


    const span = modal.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
    };


    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    return;
  }


  const modalCompraExitosa = document.getElementById("modalCompraExitosa");
  modalCompraExitosa.style.display = "block";


  const spanCompraExitosa = modalCompraExitosa.getElementsByClassName("close")[0];
  spanCompraExitosa.onclick = function () {
    modalCompraExitosa.style.display = "none";
  };


  window.onclick = function (event) {
    if (event.target == modalCompraExitosa) {
      modalCompraExitosa.style.display = "none";
    }
  };


  setTimeout(() => {
    window.location.href = "formadepago.html";
  }, 2000);
}

mostrarProductos();
mostrarCarrito();
calcularTotal();

async function iniciarPrograma() {
  await leerProductos();

  mostrarProductos();

  comprobarCarrito();
}

iniciarPrograma();
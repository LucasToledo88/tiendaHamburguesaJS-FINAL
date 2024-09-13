let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];




function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarHamburguesa() {
  const form = document.getElementById("formArmarHamburguesa");
  const ingredientesSeleccionados = Array.from(form.elements['ingredientes'])
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  console.log(ingredientesSeleccionados);

  const nombreHamburguesa = `Hamburguesa Personalizada (${ingredientesSeleccionados.join(', ')})`;
  const precioHamburguesa = calcularPrecioPersonalizado();

  const hamburguesaPersonalizada = {
    nombre: nombreHamburguesa,
    precio: precioHamburguesa,
    imagen: "img/personalizada.jpeg",
    cantidad: 1
  };
  carrito.push(hamburguesaPersonalizada);
  guardarCarrito();
  window.location.href = "index.html";
}

function calcularPrecioPersonalizado() {
  const ingredientes = Array.from(document.querySelectorAll('input[name="ingredientes"]:checked'));
  let precio = 3000;

  ingredientes.forEach((ingrediente) => {
    if (ingrediente.value === "Queso") precio += 1000;
    if (ingrediente.value === "Bacon") precio += 1100;
    if (ingrediente.value === "Lechuga") precio += 1200;
    if (ingrediente.value === "Tomate ") precio += 1300;
    if (ingrediente.value === "Cebolla ") precio += 1400;
    if (ingrediente.value === "Salsa Picante") precio += 1400;
    if (ingrediente.value === "Huevo") precio += 1500;


  });

  return precio;

}
const volverCarritoBtn = document.getElementById("volverCarritoBtn");
volverCarritoBtn.addEventListener("click", (e) => {
  window.location.href = "index.html";
});

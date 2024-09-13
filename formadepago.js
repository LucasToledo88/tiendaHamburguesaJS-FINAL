function mostrarModal(mensaje) {
  document.getElementById('modalMensaje').innerText = mensaje;
  document.getElementById('modal').style.display = 'block';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

function realizarCompra() {
  const metodoPagoSeleccionado = document.querySelector('input[name="metodoPago"]:checked').value;
  mostrarModal(`Su compra fue realizada con éxito usando ${metodoPagoSeleccionado}.`);


  setTimeout(() => {
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
  }, 2000);

  return false;
}


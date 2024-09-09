document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const bubble = document.getElementById('bubble');
    const typing = document.getElementById('typing');
    const message = document.getElementById('message');

    // Ocultar los puntos suspensivos y mostrar el mensaje
    typing.style.display = 'none';
    message.style.display = 'block';

    // Expandir la burbuja y moverla a una nueva posición
    bubble.style.maxWidth = '450px';
    bubble.style.top = '40%'; // Nueva posición en la página
    bubble.style.left = '50%';
    bubble.style.transform = 'translate(-15vh, 2vh)';
  }, 2000); // Cambiar después de 3 segundos (3000 ms)

  setTimeout(function () {
    const buttonBubble = document.getElementById('button-bubble');

    // Mostrar la burbuja del botón en una posición debajo de la primera burbuja
    buttonBubble.style.display = 'block';
  }, 2000); // Mostrar el botón después de 5 segundos (5000 ms)
});

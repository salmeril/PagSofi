document.addEventListener("DOMContentLoaded", function () {
    const chatBubble = document.getElementById("chat-bubble");
    const chatOptions = document.getElementById("chat-options");
    const dots = document.createElement("span");

    // Mostrar los puntos suspensivos inicialmente
    dots.classList.add("dots");
    chatBubble.innerHTML = ""; // Limpiar el contenido de la burbuja inicial
    chatBubble.appendChild(dots);

    // Cambiar a burbuja grande después de unos segundos
    setTimeout(() => {
        dots.style.display = "none"; // Ocultar los puntos suspensivos
        chatBubble.innerHTML = "Los personajes son diseñados para imitar comportamientos reales y mejoran con el tiempo gracias a la interacción con los usuarios. 😊";
        
        // Cambiar a la burbuja más grande después de un momento
        setTimeout(() => {
            chatBubble.style.display = "none"; // Ocultar burbuja pequeña
            chatOptions.style.display = "block"; // Mostrar burbuja grande

            // Agregar un botón después de unos segundos
            setTimeout(() => {
                const chatButton = document.createElement("button");
                chatButton.classList.add("chat-button");
                chatButton.innerText = "Continuar";
                chatOptions.appendChild(chatButton);

                // Agregar funcionalidad al botón
                chatButton.addEventListener("click", () => {
                    alert("Continuando con la siguiente burbuja...");
                    // Aquí podrías agregar la lógica para la siguiente burbuja o acción
                });
            }, 2000); // Esperar 2 segundos para mostrar el botón
        }, 2000); // Esperar 2 segundos para mostrar la burbuja grande
    }, 3000); // Esperar 3 segundos para cambiar la burbuja pequeña
});

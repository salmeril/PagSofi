const messagesContainer = document.getElementById('messages');
let messageIndex = 0;
let typingBubble; // Variable global para la burbuja de tipeo
let notificationShown = false; // Variable para controlar si la notificación ya se mostró

// Muestra la burbuja de "escribiendo"
function showTypingBubble() {
    if (typingBubble) {
        messagesContainer.removeChild(typingBubble);
    }
    typingBubble = document.createElement('div');
    typingBubble.className = 'typing-bubble';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        typingIndicator.appendChild(dot);
    }
    
    typingBubble.appendChild(typingIndicator);
    messagesContainer.appendChild(typingBubble);
}

// Añade un mensaje al contenedor
function addMessage(content, isAudio = false, audioSrc = null, audioId = null, images = [], isUser = false) {
    // Elimina la burbuja de tipeo si existe
    if (typingBubble) {
        messagesContainer.removeChild(typingBubble);
        typingBubble = null; // Limpia la variable global
    }

    const message = document.createElement('div');
    message.className = 'message'; // Asegúrate de agregar la clase 'message' para aplicar los estilos necesarios

    if (isUser) {
        message.classList.add('user-message'); // Añadir clase para diferenciar el mensaje del usuario
    }

    if (isAudio) {
        const audioContainer = createAudioPlayer(audioSrc, audioId);
        message.appendChild(audioContainer);
        messagesContainer.appendChild(message);
    } else if (images.length > 0) {
        // Mostrar imágenes con burbuja de "escribiendo" entre ellas
        let imageIndex = 0;
        function showNextImage() {
            if (imageIndex < images.length) {
                showTypingBubble();
                setTimeout(() => {
                    if (typingBubble) {
                        messagesContainer.removeChild(typingBubble); // Elimina la burbuja de tipeo
                        typingBubble = null;
                    }
                    
                    const stickerContainer = document.createElement('div');
                    stickerContainer.className = 'sticker-container'; // Se usará la clase para el fondo de las imágenes
                    message.style.background = 'none'; // Quita el fondo del mensaje porque cada imagen tiene su propio contenedor

                    const img = document.createElement('img');
                    img.src = images[imageIndex];
                    img.className = 'sticker'; // Estilo que ajusta la imagen
                    stickerContainer.appendChild(img);
                    
                    messagesContainer.appendChild(stickerContainer); // Añade cada imagen como una burbuja separada
                    imageIndex++;
                    if (imageIndex < images.length) {
                        setTimeout(showNextImage, 1000); // Espera 1 segundo antes de mostrar la siguiente imagen
                    }
                }, 2000); // Tiempo para mostrar la burbuja de "escribiendo" y luego la imagen
            }
        }
        showNextImage(); // Inicia el proceso de mostrar las imágenes
    } else if (content) {  // Evitar que se muestre "undefined" si no hay contenido
        message.innerHTML = content;
        messagesContainer.appendChild(message);
    }
}

// Función para añadir el reproductor de audio
function createAudioPlayer(audioSrc, audioId) {
    const audioContainer = document.createElement('div');
    audioContainer.className = 'audio-message';

    const audioElement = document.createElement('audio');
    audioElement.src = audioSrc;
    audioElement.id = `audio-${audioId}`;
    audioElement.controls = true;
    audioContainer.appendChild(audioElement);

    return audioContainer;
}

// Función para limpiar el chat
function clearChat() {
    messagesContainer.innerHTML = ''; 
}

// Muestra la notificación clickeable en la parte superior con animación
function showNotification() {
    if (notificationShown) return; // Evita mostrar la notificación más de una vez

    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification';

    // Imagen de avatar
    const avatar = document.createElement('img');
    avatar.src = '/infografia-1/src/icons/chayannenotifi.png'; // Cambia esta ruta a la correcta para la imagen de avatar
    avatar.alt = 'Avatar';

    // Contenedor de texto (título y subtítulo)
    const textContainer = document.createElement('div');
    textContainer.className = 'notification-text';

    const title = document.createElement('div');
    title.className = 'notification-title';
    title.textContent = 'Chayanne'; // Nombre del usuario en la notificación

    const subtitle = document.createElement('div');
    subtitle.className = 'notification-subtitle';
    subtitle.textContent = 'PRO Y CONTRAS DE CHARACTER IA'; // Subtítulo en la notificación

    textContainer.appendChild(title);
    textContainer.appendChild(subtitle);

    // Añadir avatar y texto al contenedor de notificación
    notificationContainer.appendChild(avatar);
    notificationContainer.appendChild(textContainer);

    // Establecer la acción de clic
    notificationContainer.addEventListener('click', () => {
        window.location.href = '/infografia-1/page/chayanne.html'; // Cambia esta URL a la que desees redirigir
    });

    // Agregar la notificación al cuerpo del documento
    document.body.appendChild(notificationContainer);

    // Deslizar la notificación después de agregarla al DOM
    setTimeout(() => {
        notificationContainer.classList.add('show'); // Aplica la clase para deslizar la notificación
    }, 500); // Retraso para darle tiempo a que se inserte en el DOM

    notificationShown = true; // Marca que la notificación ha sido mostrada
}

// Función para mostrar las imágenes, eliminarlas y luego mostrar más mensajes
function showImagesAndReplace(firstImages, secondImages, nextMessages) {
    // Mostrar las primeras imágenes, cada una en su burbuja
    addMessage("", false, null, null, firstImages, false);

    // Después de 10 segundos, eliminar las imágenes y mostrar las segundas
    setTimeout(() => {
        clearChat(); // Elimina las primeras imágenes

        // Mostrar las segundas imágenes, cada una en su burbuja
        addMessage("", false, null, null, secondImages, false);

        // Después de otros 10 segundos, eliminar las segundas imágenes y mostrar más mensajes
        setTimeout(() => {
            clearChat(); // Elimina las segundas imágenes

            // Mostrar más mensajes después de eliminar las segundas imágenes
            showMessages(nextMessages);
        }, 10000); // Tiempo para eliminar las segundas imágenes y mostrar más mensajes
    }, 10000); // Tiempo para eliminar las primeras imágenes y mostrar las segundas
}

// Función para mostrar los mensajes con un retardo
function showMessages(messages, nextFunction, delayAfterLastMessage = 57000) {
    clearChat(); // Borra los mensajes anteriores antes de mostrar los nuevos
    messageIndex = 0;

    function showNextMessage() {
        if (messageIndex < messages.length) {
            if (typingBubble) {
                messagesContainer.removeChild(typingBubble); // Elimina la burbuja de los 3 puntos si existe
                typingBubble = null; // Limpia la variable global
            }

            showTypingBubble(); // Muestra la burbuja con los 3 puntos

            setTimeout(() => {
                if (typingBubble) {
                    messagesContainer.removeChild(typingBubble); // Elimina la burbuja de los 3 puntos
                    typingBubble = null; // Limpia la variable global
                }
                
                const currentMessage = messages[messageIndex];
                if (typeof currentMessage === 'object' && currentMessage.audio) {
                    addMessage("", true, currentMessage.audio, currentMessage.id, [], false);
                } else if (typeof currentMessage === 'object' && currentMessage.images) {
                    addMessage("", false, null, null, currentMessage.images, false);
                } else if (typeof currentMessage === 'string') { // Solo agregar si es string
                    addMessage(currentMessage, false, null, null, [], false);
                }
                
                messageIndex++;

                if (messageIndex < messages.length) {
                    setTimeout(showNextMessage, 1000); // Reducido a 1 segundo para mostrar el siguiente mensaje más rápido
                } else if (nextFunction) {
                    setTimeout(nextFunction, delayAfterLastMessage);
                } else {
                    // Cuando se llega al último mensaje, muestra la notificación
                    showNotification();
                }
            }, 3000); // Espera 3 segundos antes de mostrar el mensaje para dar tiempo a la burbuja de "escribiendo"
        }
    }

    showNextMessage();
}

// Definir los flujos de mensajes e imágenes
const firstImages = [
    '/infografia-1/src/img/anime.png',
    '/infografia-1/src/img/psicologo.png'
];

const secondImages = [
    '/infografia-1/src/img/politicos.png',
    '/infografia-1/src/img/religion.png'
];

const nextMessages = [
    "Eh, te dejo que me tengo que ir a entrenar.",
    "Aunque creo que hay más gente que quiere hablar con vos."
];

// Iniciar el flujo de imágenes y mensajes
showImagesAndReplace(firstImages, secondImages, nextMessages);

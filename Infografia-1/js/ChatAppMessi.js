const messagesContainer = document.getElementById('messages');

let messageIndex = 0;
let typingBubble; // Variable global para la burbuja de tipeo

// Funciones agrupadas para crear burbujas de mensajes y mensajes

// Muestra la burbuja de tipeo
function showTypingBubble() {
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
function addMessage(content, isAudio = false, audioSrc = null, audioId = null, images = [], showLink = false, linkText = '', linkHref = '', isUser = false) {
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
    } else if (images.length > 0) {
        const stickerContainer = document.createElement('div');
        stickerContainer.className = 'sticker-container'; 
        message.appendChild(stickerContainer);
        message.style.background = 'none'; 

        let imageIndex = 0;
        function addNextImage() {
            if (imageIndex < images.length) {
                const img = document.createElement('img');
                img.src = images[imageIndex];
                img.className = 'sticker'; 
                stickerContainer.appendChild(img);
                imageIndex++;
                setTimeout(addNextImage, 3000); 
            }
        }
        addNextImage();
    } else {
        message.innerHTML = content;

        if (showLink) {
            const link = document.createElement('a');
            link.href = ''; // Evitar redirección inmediata
            link.className = 'link-text'; 
            link.textContent = linkText;
            message.appendChild(link); 

            // Añadir el evento de clic al enlace
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir la redirección inmediata

                // Muestra el mensaje de respuesta del usuario
                const userReply = "USOS PRINCIPALES";
                addMessage(userReply, false, null, null, [], false, '', '', true); // Enviar como mensaje del usuario

                // Después de 5 segundos, redirige a la nueva página
                setTimeout(function() {
                    window.location.href = linkHref;
                }, 5000);
            });
        }
    }

    messagesContainer.appendChild(message);
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
                } else if (typeof currentMessage === 'object' && currentMessage.showLink) {
                    addMessage(currentMessage.content, false, null, null, [], true, currentMessage.linkText, currentMessage.linkHref);
                } else {
                    addMessage(currentMessage, false, null, null, [], false);
                }
                
                messageIndex++;

                if (messageIndex < messages.length && !currentMessage.showLink) {
                    setTimeout(showNextMessage, 1000); // Reducido a 1 segundo para mostrar el siguiente mensaje más rápido
                } else if (nextFunction) {
                    setTimeout(nextFunction, delayAfterLastMessage);
                }
            }, 1000); // Reducido a 1 segundo para que los 3 puntos desaparezcan más rápido
        }
    }

    showNextMessage();
}

// Definir los flujos de mensajes
const firstMessages = [
    { audio: '/infografia-1/src/audio/audiomessi1.mp3', id: 1 },
    "Pensabas que solo sabía jugar al fútbol no? también puedo mostrarte para qué son buenos los personajes de character IA",
    {
        content: " ",
        showLink: true,
        linkText: "USOS PRINCIPALES",
        linkHref: "/infografia-1/page/messichat2.html"
    }
];

// Iniciar el primer flujo de mensajes
showMessages(firstMessages);

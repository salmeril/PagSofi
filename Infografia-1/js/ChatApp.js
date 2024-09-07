const messagesContainer = document.getElementById('messages');
let messageIndex = 0;

function showTypingBubble() {
    const typingBubble = document.createElement('div');
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

    return typingBubble; // Retorna la burbuja para poder eliminarla después
}

function addMessage(content, isAudio = false, audioSrc = null, audioId = null) {
    const message = document.createElement('div');
    message.className = 'message';
    if (isAudio) {
        const audioContainer = createAudioPlayer(audioSrc, audioId);
        message.appendChild(audioContainer);
    } else {
        message.innerHTML = content;
    }
    messagesContainer.appendChild(message);
}

function clearChat() {
    messagesContainer.innerHTML = ''; // Elimina todos los mensajes anteriores
}

function showMessages(messages, nextFunction, delayAfterLastMessage = 57000) {
    clearChat(); // Borra los mensajes anteriores antes de mostrar los nuevos
    messageIndex = 0;

    function showNextMessage() {
        if (messageIndex < messages.length) {
            const typingBubble = showTypingBubble(); // Muestra la burbuja con los 3 puntos
            setTimeout(() => {
                messagesContainer.removeChild(typingBubble); // Elimina la burbuja de los 3 puntos
                const currentMessage = messages[messageIndex];
                if (typeof currentMessage === 'object' && currentMessage.audio) {
                    addMessage("", true, currentMessage.audio, currentMessage.id);
                } else {
                    addMessage(currentMessage);
                }
                messageIndex++;

                if (messageIndex < messages.length) {
                    setTimeout(showNextMessage, 2000);
                } else if (nextFunction) {
                    setTimeout(nextFunction, delayAfterLastMessage);
                }
            }, 2000); // Tiempo que se muestra la burbuja con los 3 puntos
        }
    }

    showNextMessage();
}

// Definir los flujos de mensajes
const firstMessages = [
    "¡Hola!, ¿cómo andas? Soy Character IA y en el siguiente audio te cuento un poco sobre mí 😊",
    { audio: '/infografia-1/src/audio/CaracterAiTodoJunto.mp3', id: 1 },
    "Los personajes son diseñados para imitar comportamientos reales y mejoran con el tiempo gracias a la interacción con los usuarios."
];

const secondMessages = [
    "¿Sabías que la IA puede ayudarte en tus tareas diarias?",
    "En el siguiente audio te explico cómo.",
    { audio: '/infografia-1/src/audio/CaracterAiTodoJunto2.mp3', id: 2 }
];

const thirdMessages = [
    "¡Eso es todo por ahora!",
    "Recuerda que puedes interactuar conmigo para aprender más.",
    "¡Hasta la próxima!"
];

// Iniciar el primer flujo de mensajes y encadenar los siguientes
showMessages(firstMessages, () => showMessages(secondMessages, () => showMessages(thirdMessages, null, 0), 10000), 10000);

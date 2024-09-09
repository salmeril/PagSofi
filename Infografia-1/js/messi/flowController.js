import { showTypingBubble } from './typingBubble.js';
import { addMessage, addContinueButton, addUserResponse, clearChat } from './messages.js';
import { createPercentageSelectors } from './selectors.js';

const messagesContainer = document.getElementById('messages');

let messageIndex = 0;
let typingBubble;

const firstMessages = [
    "¡Hola!, ¿cómo andas? Soy Character IA y en el siguiente audio te cuento un poco sobre mí 😊",
    { audio: '/infografia-1/src/audio/CaracterAiTodoJunto.mp3', id: 1 },
    "Los personajes son diseñados para imitar comportamientos reales y mejoran con el tiempo gracias a la interacción con los usuarios."
];

// Función para mostrar los mensajes
function showMessages(messages, nextFunction, delayAfterLastMessage = 15000) {
    clearChat(messagesContainer); // Borra los mensajes anteriores antes de mostrar los nuevos
    messageIndex = 0;

    function showNextMessage() {
        if (messageIndex < messages.length) {
            if (typingBubble) {
                messagesContainer.removeChild(typingBubble);
                typingBubble = null;
            }

            typingBubble = showTypingBubble(messagesContainer); // Muestra la burbuja con los 3 puntos

            setTimeout(() => {
                if (typingBubble) {
                    messagesContainer.removeChild(typingBubble);
                    typingBubble = null;
                }
                
                const currentMessage = messages[messageIndex];
                if (typeof currentMessage === 'object' && currentMessage.audio) {
                    addMessage(messagesContainer, typingBubble, "", true, currentMessage.audio, currentMessage.id, [], false);
                } else if (typeof currentMessage === 'object' && currentMessage.images) {
                    addMessage(messagesContainer, typingBubble, "", false, null, null, currentMessage.images, false);
                } else {
                    addMessage(messagesContainer, typingBubble, currentMessage, false, null, null, [], false);
                }
                
                messageIndex++;

                if (messageIndex < messages.length) {
                    setTimeout(showNextMessage, 1000);
                } else if (nextFunction) {
                    setTimeout(nextFunction, delayAfterLastMessage);
                }
            }, 1000);
        }
    }

    showNextMessage();
}

showMessages(firstMessages);

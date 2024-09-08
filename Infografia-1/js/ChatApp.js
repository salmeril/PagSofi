const messagesContainer = document.getElementById('messages');

let messageIndex = 0;
let typingBubble; // Variable global para la burbuja de tipeo

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
function addMessage(content, isAudio = false, audioSrc = null, audioId = null, images = []) {
    // Elimina la burbuja de tipeo si existe
    if (typingBubble) {
        messagesContainer.removeChild(typingBubble);
        typingBubble = null; // Limpia la variable global
    }

    const message = document.createElement('div');
    message.className = 'message'; // Asegúrate de agregar la clase 'message' para aplicar los estilos necesarios

    if (isAudio) {
        const audioContainer = createAudioPlayer(audioSrc, audioId);
        message.appendChild(audioContainer);
    } else if (typeof content === 'object' && content.isSelector) {
        const selectorContainer = createPercentageSelectors(content.options, content.title);
        message.appendChild(selectorContainer);
    } else if (images.length > 0) {
        const stickerContainer = document.createElement('div');
        stickerContainer.className = 'sticker-container'; // Cambiar la clase a 'sticker-container'

        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'sticker'; 
            stickerContainer.appendChild(img);
        });

        message.appendChild(stickerContainer);
    } else {
        message.innerHTML = content;
    }

    messagesContainer.appendChild(message);
}

// Limpia el chat
function clearChat() {
    messagesContainer.innerHTML = ''; // Elimina todos los mensajes anteriores
}

// Muestra los mensajes con un retardo
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
                    addMessage("", true, currentMessage.audio, currentMessage.id);
                } else if (typeof currentMessage === 'object' && currentMessage.images) {
                    addMessage("", false, null, null, currentMessage.images);
                } else {
                    addMessage(currentMessage);
                }
                
                messageIndex++;

                if (messageIndex < messages.length) {
                    setTimeout(showNextMessage, 1000); // Reducido a 1 segundo para mostrar el siguiente mensaje más rápido
                } else if (nextFunction) {
                    setTimeout(nextFunction, delayAfterLastMessage);
                }
            }, 1000); // Reducido a 1 segundo para que los 3 puntos desaparezcan más rápido
        }
    }

    showNextMessage();
}

// Crea los selectores con las barras de porcentaje
function createPercentageSelectors(options, title) {
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'selector-container';

    // Agrega el título si se proporciona
    if (title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'selector-title';
        titleElement.textContent = title;
        selectorContainer.appendChild(titleElement);
    }

    // Agrega el subtítulo
    const subtitleElement = document.createElement('div');
    subtitleElement.className = 'selector-subtitle';
    subtitleElement.textContent = 'Elija una opción';
    selectorContainer.appendChild(subtitleElement);

    options.forEach((option) => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'option-container';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio'; // Cambiado a 'radio' para permitir solo una selección
        radioButton.name = 'percentageSelector'; // Asegura que solo un radio button pueda estar activo a la vez
        radioButton.id = option.label + 'Check';
        radioButton.className = option.label.toLowerCase(); // Agrega la clase para aplicar el color al hacer clic
        radioButton.addEventListener('change', () => updatePercentageBar(option.label, option.percentage));

        const label = document.createElement('label');
        label.htmlFor = radioButton.id;
        label.textContent = option.label;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar-container';
        
        const percentageBar = document.createElement('div');
        percentageBar.className = 'percentage-bar';
        percentageBar.id = option.label + 'Bar';

        const percentageValue = document.createElement('div');
        percentageValue.className = 'percentage-value';
        percentageValue.id = option.label + 'Percentage';

        progressBar.appendChild(percentageBar);
        progressBar.appendChild(percentageValue);

        optionContainer.appendChild(radioButton);
        optionContainer.appendChild(label);
        optionContainer.appendChild(progressBar);
        selectorContainer.appendChild(optionContainer);
    });

    return selectorContainer;
}

// Actualiza las barras de porcentaje
function updatePercentageBar(label, percentage) {
    document.querySelectorAll('.percentage-bar').forEach(bar => bar.style.width = '0%');
    document.querySelectorAll('.percentage-value').forEach(value => value.textContent = '0%');

    const percentageBar = document.getElementById(label + 'Bar');
    const percentageValue = document.getElementById(label + 'Percentage');

    if (percentageBar) {
        percentageBar.style.width = percentage + '%';
        percentageValue.textContent = percentage + '%';
    }
}

// Definir los flujos de mensajes
const firstMessages = [
    "¡Hola!, ¿cómo andas? Soy Character IA y en el siguiente audio te cuento un poco sobre mí 😊",
    { audio: '/infografia-1/src/audio/CaracterAiTodoJunto.mp3', id: 1 },
    
    "Los personajes son diseñados para imitar comportamientos reales y mejoran con el tiempo gracias a la interacción con los usuarios."
];

const secondMessages = [
    "Los personajes son diseñados para imitar comportamientos reales y mejoran con el tiempo gracias a la interacción con los usuarios",
    { 
        title: "Dispositivos en los que más se utiliza", // Agrega el título aquí
        isSelector: true, 
        options: [
            { label: 'Móvil', percentage: 72.66 },
            { label: 'Otros', percentage: 27.44 }
        ]
    }
];

const thirdMessages = [
    "Dentro de los personajes podemos encontrar:",
    { images: ['/infografia-1/src/icons/sticker1.png', '/infografia-1/src/icons/sticker2.png'] },
    { images: ['/infografia-1/src/icons/sticker3.png', '/infografia-1/src/icons/sticker4.png'] },
];

// Iniciar el primer flujo de mensajes y encadenar los siguientes
showMessages(firstMessages, () => showMessages(secondMessages, () => showMessages(thirdMessages, null, 0), 15000), 15000);
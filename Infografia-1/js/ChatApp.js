document.addEventListener('DOMContentLoaded', function() {
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

    // Elimina la burbuja de tipeo si existe
    function clearTypingBubble() {
        if (typingBubble) {
            messagesContainer.removeChild(typingBubble);
            typingBubble = null; // Limpia la variable global
        }
    }

// Añade el mensaje
function addMessage(content, isAudio = false, audioSrc = null, audioId = null, images = [], action = null, isUserMessage = false) {
    clearTypingBubble();

    // Si el mensaje contiene stickers, no aplicamos la clase 'message'
    if (images.length > 0) {
        const stickerContainer = document.createElement('div');
        stickerContainer.className = 'sticker-container'; // Sin la clase 'message'
        
        // Añadimos los stickers con un retraso de 2 segundos entre cada uno
        images.forEach((imageUrl, index) => {
            setTimeout(() => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.className = 'sticker'; // Sin clase 'message'
                stickerContainer.appendChild(img);
            }, index * 2000); // Retraso de 2 segundos entre stickers
        });

        messagesContainer.appendChild(stickerContainer);
        return; // Finaliza aquí si es un sticker, no aplica burbuja
    }

    // Si es un mensaje de texto o cualquier otro tipo de mensaje
    const message = document.createElement('div');

    // Si es un mensaje del usuario
    if (isUserMessage) {
        message.className = 'user-message'; // Aplica la clase 'user-message' solo a los mensajes del usuario
    } else {
        message.className = 'message'; // Aplica la clase 'message' para mensajes regulares
    }

    if (isAudio) {
        const audioContainer = createAudioPlayer(audioSrc, audioId);
        message.appendChild(audioContainer);
    } else if (typeof content === 'object' && content.isSelector) {
        const selectorContainer = createPercentageSelectors(content.options, content.title);
        message.appendChild(selectorContainer);
    } else if (typeof content === 'object' && content.type === 'link') {
        const link = document.createElement('a');
        link.className = 'action-link';
        link.textContent = content.text;
        link.href = '#';
        link.onclick = (e) => {
            e.preventDefault();
            content.action();
        };
        message.appendChild(link);
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
    function showMessages(messages, nextFunction, delayAfterLastMessage = 57000, clearBefore = false) {
        if (clearBefore) {
            clearChat(); // Borra los mensajes anteriores antes de mostrar los nuevos si se especifica
        }
        
        messageIndex = 0;

        function showNextMessage() {
            if (messageIndex < messages.length) {
                const currentMessage = messages[messageIndex];
                // Mostrar la burbuja de tipeo
                showTypingBubble();

                setTimeout(() => {
                    clearTypingBubble();

                    if (typeof currentMessage === 'object' && currentMessage.audio) {
                        addMessage("", true, currentMessage.audio, currentMessage.id);
                    } else if (typeof currentMessage === 'object' && currentMessage.images) {
                        addMessage("", false, null, null, currentMessage.images);
                    } else {
                        addMessage(currentMessage);
                    }

                    messageIndex++;

                    if (messageIndex < messages.length) {
                        setTimeout(showNextMessage, 2000);
                    } else if (nextFunction) {
                        setTimeout(nextFunction, delayAfterLastMessage);
                    }
                }, 2000); // Retardo de 2 segundos para simular tipeo antes de mostrar el mensaje
            }
        }

        showNextMessage();
    }

    // Crea los selectores con las barras de porcentaje
    function createPercentageSelectors(options, title) {
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'message selector-container'; // Asegurarse de que tenga la clase 'message' para el estilo de burbuja

        if (title) {
            const titleElement = document.createElement('div');
            titleElement.className = 'selector-title';
            titleElement.textContent = title;
            selectorContainer.appendChild(titleElement);
        }

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

            if (label === 'Móvil') {
                percentageBar.style.backgroundColor = '#00FFF0';
            } else if (label === 'Otros') {
                percentageBar.style.backgroundColor = '#9747FF';
            }
        }
    }

    // Definir los flujos de mensajes
    const firstMessages = [
        "¡Hola!, ¿cómo andas? Soy Character IA y en el siguiente audio te cuento un poco sobre mí 😊",
        { audio: '/infografia-1/src/audio/CaracterAiTodoJunto.mp3', id: 1 },
        "Los personajes son diseñados para imitar comportamientos reales y mejoran con el tiempo gracias a la interacción con los usuarios."
    ];

    const secondMessages = [
        "Los personajes son diseñados para imitar comportamientos reales y mejoran con el tiempo gracias a la interacción con los usuarios 🕵️",
        { 
            title: "Dispositivos en los que más se utiliza", 
            isSelector: true, 
            options: [
                { label: 'Móvil', percentage: 72.66 },
                { label: 'Otros', percentage: 27.44 }
            ]
        }
    ];

    const thirdMessages = [
        "Dentro de los personajes podemos encontrar:",
        { images: ['/infografia-1/src/icons/sticker1.png', '/infografia-1/src/icons/sticker2.png', '/infografia-1/src/icons/sticker3.png', '/infografia-1/src/icons/sticker4.png'] },
    ];

    // En el cuarto grupo de mensajes, cuando el usuario hace clic en 'CONTINUAR', la respuesta será agregada como un mensaje de usuario
    const fourthMessages = [
        "Espero tengas ganas de continuar",
        { 
            type: 'link', 
            text: 'CONTINUAR', 
            action: () => {
                addMessage("Continuar", false, null, null, [], null, true); // `true` indica que es un mensaje del usuario

                setTimeout(() => {
                    window.location.href = "/infografia-1/page/messi.html"; // Cambia por la URL a la que deseas redirigir
                }, 5000); // 5 segundos
            }
        }
    ];

    // Iniciar el flujo de mensajes
    showMessages(firstMessages, () => {
        showMessages(secondMessages, () => showMessages(thirdMessages, () => showMessages(fourthMessages, null, 0, true), 12000, true), 10000, true);
    }, 10000, true);
});

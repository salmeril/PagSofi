import { createAudioPlayer } from './audioPlayer.js';
import { createPercentageSelectors } from './selectors.js';
import { showTypingBubble } from './typingBubble.js';

export function addMessage(messagesContainer, typingBubble, content, isAudio = false, audioSrc = null, audioId = null, images = [], showContinueButton = false) {
    // Elimina la burbuja de tipeo si existe
    if (typingBubble) {
        messagesContainer.removeChild(typingBubble);
        typingBubble = null;
    }

    const message = document.createElement('div');
    message.className = 'message';

    if (isAudio) {
        const audioContainer = createAudioPlayer(audioSrc, audioId);
        message.appendChild(audioContainer);
    } else if (typeof content === 'object' && content.isSelector) {
        const selectorContainer = createPercentageSelectors(content.options, content.title);
        message.appendChild(selectorContainer);
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
    }

    messagesContainer.appendChild(message);

    if (showContinueButton) {
        addContinueButton(messagesContainer);
    }
}

export function addContinueButton(messagesContainer) {
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Continuar';
    continueButton.className = 'continue-button';
    continueButton.addEventListener('click', () => {
        addUserResponse(messagesContainer, 'Continuar');
        setTimeout(() => {
            window.location.href = 'https://www.ejemplo.com';
        }, 500);
    });
    messagesContainer.appendChild(continueButton);
}

export function addUserResponse(messagesContainer, responseText) {
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = responseText;
    messagesContainer.appendChild(userMessage);

    setTimeout(() => {
        messageIndex++;
        showNextMessage(messagesContainer);
    }, 1000);
}

export function clearChat(messagesContainer) {
    messagesContainer.innerHTML = '';
}

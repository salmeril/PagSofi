export function showTypingBubble(messagesContainer) {
    let typingBubble = document.createElement('div');
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

    return typingBubble; // Devuelve la burbuja para que pueda ser eliminada
}
